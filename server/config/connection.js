// const Sequelize = require("sequelize");
// require("dotenv").config();

// const sequelize = process.env.DB_URL
//     ? new Sequelize(process.env.DB_URL)
//     : new Sequelize(
//           process.env.DB_NAME,
//           process.env.DB_USER,
//           process.env.DB_PASSWORD,
//           {
//               host: "localhost",
//               dialect: "postgres",
//           }
//       );

// module.exports = sequelize;

const mongoose = require("mongoose");

mongoose.connect(process.env.ATLAS_URI);

module.exports = mongoose.connection;
