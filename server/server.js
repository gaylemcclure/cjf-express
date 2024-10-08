require("dotenv").config();
const path = require("path");
const express = require("express");
const routes = require("./routes/api/index.js");

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "http://localhost:5173"); // update to match the domain you will make the request from
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
// app.use(express.static(path.join(__dirname, "public")));
app.use(express.static(path.join(__dirname, "../client/dist")));

// app.get("*", (req, res) => {
//   res.sendFile(path.join(__dirname, "../client/dist/index.html"));
// });

// Routes
// app.use(routes);
app.use("/api", routes);
// app.use("/signup", signupRoutes);

// Sync database + start server
app.listen(PORT, () => console.log(`Now listening on port ${PORT}`));
