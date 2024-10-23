const router = require("express").Router();
const client = require("../../client");
const path = require("path");
const Airtable = require("airtable");
const base = new Airtable({ apiKey: process.env.AIRTABLE_API_KEY }).base("appIBABROx6vy2Cgy");

//EG get call for airtable
// router.get("/schedule", async (req, res) => {
//   try {
//     base("Schedule").find("recTI3CnpXw4SiQ2V", function (err, record) {
//       res.json(record);
//     });
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// });

//EG Front end call
// useEffect(() => {
//   const getData = async () => {
//     try {
//       // const something = await fetchDog();
//       // console.log(something);
//       const res = await axios.get("/api/airtable/schedule", {
//         headers: "application/json",
//       });
//       // const data = res;
//       console.log(res);
//     } catch (error) {
//       console.error(error);
//     }
//   };
//   getData();
// }, []);

router.post("/band-application", async (req, res) => {
  const band = req.body;
  try {
    // console.log(bandLink);
    // console.log(aboutBand);
    // console.log(numberMembers);
    // console.log(musicianArr);
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

// var Airtable = require('airtable');
// var base = new Airtable({apiKey: 'YOUR_SECRET_API_TOKEN'}).base('appIBABROx6vy2Cgy');

// // const base = require('airtable').base('appIBABROx6vy2Cgy');
// // Example using custom configuration
// // var Airtable = require('airtable');
// // Airtable.configure({
// //     endpointUrl: 'https://api.airtable.com',
// //     apiKey: 'YOUR_SECRET_API_TOKEN'
// // });
// // var base = Airtable.base('appIBABROx6vy2Cgy');

// base('Schedule').create([
//   {
//     "fields": {
//       "Session": "Session 1",
//       "Venue": [
//         "rec8EVv2cwJY5dc4V"
//       ],
//       "Band": [
//         "recHsJZsk8EJIolcZ"
//       ],
//       "Day": "Saturday",
//       "Set Length": 3600,
//       "Event Starts": "2024-06-08T12:00:00.000Z",
//       "CONTRACT LINK": [
//         "recJMR1XQRpVzmDhi"
//       ]
//     }
//   },
//   {
//     "fields": {
//       "Session": "Session 1",
//       "Venue": [
//         "recClSskpZoPYWmGp"
//       ],
//       "Day": "Friday",
//       "Set Length": 3600,
//       "Event Starts": "2024-06-07T19:00:00.000Z"
//     }
//   }
// ], function(err, records) {
//   if (err) {
//     console.error(err);
//     return;
//   }
//   records.forEach(function (record) {
//     console.log(record.getId());
//   });
// });
// Output
// recTI3CnpXw4SiQ2V
// recPElHy2YPpknbrx

module.exports = router;
