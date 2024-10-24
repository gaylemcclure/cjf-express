const router = require("express").Router();
const contentful = require("contentful-management");

const plainClient = contentful.createClient(
  {
    accessToken: process.env.CONTENTFUL_API,
  },
  { type: "plain" }
);

const client = contentful.createClient({
  accessToken: process.env.CMA_TOKEN,
});

router.post("/image-upload-ctf", async (req, res) => {
  console.log(req);
  try {
    client
      .getSpace(process.env.SPACE_ID)
      .then((space) => space.getEnvironment("master-2024-08-15"))
      .then((environment) =>
        environment.createAsset({
          fields: {
            title: {
              "en-US": "BandName",
            },
            description: {
              "en-US": "Streamliner description",
            },
            file: {
              "en-US": {
                contentType: "image/png",
                fileName: "image.cjf_logo_120px.png",
                upload: "http://localhost:5001/uploads/image.cjf_logo_120px.png",
              },
            },
          },
        })
      )
      .then((asset) => console.log(asset))
      .then((asset) => asset.processForAllLocales())
      .catch(console.error);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
