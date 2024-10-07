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

const { connect, connection } = require("mongoose");

connect("mongodb+srv://perfectstormdesign:lTYzCkpiaBxMOxIo@cluster0.ambbp.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0");

module.exports = connection;
