const router = require("express").Router();
const Airtable = require("airtable");
const base = new Airtable({ apiKey: process.env.AIRTABLE_API_KEY }).base("appIBABROx6vy2Cgy");
const memberBase = new Airtable({ apiKey: process.env.AIRTABLE_API_KEY }).base("appmxEzSc4n92hbA5");

router.post("/band-application", async (req, res) => {
  const band = req.body;
  const musicianArr = [];
  try {
    base("Musicians")
      .select({
        // Selecting the first 3 records in All People:
        view: band.yearPlaying,
        fields: ["Name", "Record ID", "Band"],
      })
      .eachPage(
        function page(records, fetchNextPage) {
          records.forEach(function (record) {
            musicianArr.push({
              name: record.get("Name"),
              id: record.get("Record ID"),
              existingBand: record.get("Band"),
            });
          });
          fetchNextPage();
        },
        function done(err) {
          if (err) {
            console.error(err);
            return;
          }
        }
      );

    base("Bands").create(
      [
        {
          fields: {
            "Band Name": band.bandName,
            Band_Leader_Name: band.leaderName,
            Jazz_Style: band.bandStyle,
            "First Fee": band.firstFee,
            Availability: band.availability,
            Band_Website: band.websiteUrl,
            Other_Info: band.otherInfo,
            "Year Playing": band.yearPlaying,
            Band_Leader_Email: band.leaderEmail,
            Band_Leader_Phone: band.leaderPhone,
            "Second Fee": band.secondFee,
            Image_Link: band.upload,
            Bio: band.bio,
            "Music Link": band.bandLink,
            Marketing_image: [
              {
                url: `${band.upload}`,
              },
            ],
          },
        },
      ],
      function (err, records) {
        if (err) {
          console.error(err);
          return;
        }
        res.json(records);
        band.musicians.map((bnd) => {
          const musicianFilter = musicianArr.filter((muso) => {
            return muso.name === bnd.musician;
          });
          if (musicianFilter.length === 1) {
            musicianFilter.map((mus) => {
              base("Musicians").update(
                [
                  {
                    id: mus.id,
                    fields: {
                      Band: [mus.existingBand[0], records[0].id],
                    },
                  },
                ],
                function (err, records) {
                  if (err) {
                    console.error(err);
                    return;
                  }
                }
              );
            });
            //If existing, add band record ID to linked band link array
          } else if (musicianFilter.length === 2) {
            musicianFilter.map((mus) => {
              base("Musicians").update(
                [
                  {
                    id: mus.id,
                    fields: {
                      Band: [mus.existingBand[0], mus.existingBand[1], records[0].id],
                    },
                  },
                ],
                function (err, records) {
                  if (err) {
                    console.error(err);
                    return;
                  }
                }
              );
            });
          } else if (musicianFilter.length === 3) {
            musicianFilter.map((mus) => {
              base("Musicians").update(
                [
                  {
                    id: mus.id,
                    fields: {
                      Band: [mus.existingBand[0], mus.existingBand[1], mus.existingBand[2], records[0].id],
                    },
                  },
                ],
                function (err, records) {
                  if (err) {
                    console.error(err);
                    return;
                  }
                }
              );
            });
          } else {
            base("Musicians").create(
              [
                {
                  fields: {
                    Name: bnd.musician,
                    Instrument: bnd.instrument,
                    Band: [records[0].id],
                    "Year Playing": band.yearPlaying,
                  },
                },
              ],
              function (err, records) {
                if (err) {
                  console.error(err);
                  return;
                }
              }
            );
          }
        });

        //Fix link for upload
      }
    );
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post("/new-member", async (req, res) => {
  const member = req.body;
  const memberArr = [];
  try {
    memberBase("Members").create(
      [
        {
          fields: {
            "First Name": member.firstName,
            "Last Name": member.lastName,
            Email: member.email,
            "Phone Number": member.phone,
            Address: member.address,
            City: member.city,
            Postcode: member.postcode,
            Paid: member.paid,
          },
        },
      ],
      function (err, records) {
        if (err) {
          console.error(err);
          return;
        }
        res.json(records);
      }
    );
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get("/get-bands", async (req, res) => {
  try {
    const bands = base("Bands")
      .select({
        maxRecords: 60,
        view: "2025 Shortlist",
        fields: [
          "Band Name",
          "Jazz_Style",
          "Musicians",
          "Scheduled Playing Times",
          "Music Link",
          "Other_Info",
          "Band_Website",
          "Bio",
          "Image_Link",
          "NameNoSpace",
          "Schedule_Text",
        ],
      })
      .eachPage(function page(records, fetchNextPage) {
        res.json(records);
      });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post("/volunteer-application", async (req, res) => {
  const vol = req.body;

  try {
    base("Volunteers").create(
      [
        {
          fields: {
            Name: vol.name,
            Address: vol.address,
            Email: vol.email,
            Phone: vol.phone,
            "Emergency Contact Name": vol.ecName,
            "Emergency Contact Phone": vol.ecPhone,
            Age: vol.age,
            Roles: vol.roles,
            Year: vol.year,
            Drivers_Licence: vol.licence,
            RSA: vol.rsa,
            Lifting: vol.lifting,
            "Emergency Contact Relationship": vol.ecR,
            "First Name": vol.firstName,
            "Last Name": vol.lastName,
          },
        },
      ],
      function (err, records) {
        if (err) {
          console.error(err);
          return;
        }
        res.json(records);
      }
    );
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// router.get("/get-schedule", async (req, res) => {
//   try {
//     const bands = base("Bands")
//       .select({
//         maxRecords: 60,
//         view: "2025 Shortlist",
//         fields: [
//           "Band Name",
//           "Jazz_Style",
//           "Musicians",
//           "Scheduled Playing Times",
//           "Music Link",
//           "Other_Info",
//           "Band_Website",
//           "Bio",
//           "Image_Link",
//           "NameNoSpace",
//           "Programmed_Shows",
//         ],
//       })
//       .eachPage(function page(records, fetchNextPage) {
//         res.json(records);
//       });
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// });
module.exports = router;
