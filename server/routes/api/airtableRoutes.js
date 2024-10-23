const router = require("express").Router();
const Airtable = require("airtable");
const base = new Airtable({ apiKey: process.env.AIRTABLE_API_KEY }).base("appIBABROx6vy2Cgy");

router.post("/band-application", async (req, res) => {
  const band = req.body;
  try {
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
        });
        //Once get successful band record, go to musicians table
        //Map through each band member
        //Check if already existing in db for current year (check process re: bands - maybe not playing in same bands every year)
        //If existing, add band record ID to linked band link array
        //If not, add band record ID to linked band list

        //Fix link for upload
        //About and bio fields
        //Year playing
      }
    );
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
