require("dotenv").config();
const path = require("path");
const express = require("express");
const routes = require("./routes/index.js");
const db = require("./config/connection");
const app = express();
const axios = require("axios");
const cors = require("cors");

const PORT = process.env.PORT || 3001;
const cwd = process.cwd();

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static(path.join(__dirname, "../client/dist")));
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "..client/dist/index.html"));
});

// app.use(function (req, res, next) {
//   res.header(`Access-Control-Allow-Origin", ${process.env.BACKEND_URL}`); // update to match the domain you will make the request from
//   res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//   next();
// });

// app.use(
//   express.static("dist", {
//     setHeaders: (res, path) => {
//       if (path.endsWith(".js")) {
//         res.setHeader("Content-Type", "application/javascript");
//       }
//     },
//   })
// );

// // Serve static files from the dist directory
// app.use(express.static(path.join(__dirname, 'dist')));

// // Handle all other routes by serving the index.html file
// app.get('*', (req, res) => {
//   res.sendFile(path.join(__dirname, 'dist', 'index.html'));
// });

app.use(routes);

db.once("open", () => {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}!`);
  });
});

// const PORT = process.env.PORT || 3000;
// app.listen(PORT, () => {
//   console.log(`Server is running on port ${PORT}`);
// });

// // Middleware
// app.use(function(req, res, next) {
//   res.header("Access-Control-Allow-Origin", "http://localhost:5173"); // update to match the domain you will make the request from
//   res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//   next();
// });
// app.use(express.json());
// app.use(express.urlencoded({ extended: false }));
// app.use(express.static(path.join(__dirname, "public")));

// // Routes
// app.use(routes);

// // Sync database + start server
//     app.listen(PORT, () => console.log(`Now listening on port ${PORT}`));
