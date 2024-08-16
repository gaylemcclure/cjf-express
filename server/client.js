const contentful = require('contentful');

//Set up the Conteful client to fetch data
const client = contentful.createClient({
  space: process.env.SPACE_ID,
  accessToken: process.env.CONTENTFUL_API,
})

module.exports = client;