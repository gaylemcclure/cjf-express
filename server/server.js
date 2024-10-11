// require("dotenv").config();
// const path = require("path");
// const express = require("express");
// const routes = require("./routes/index.js");

// const app = express();
// const PORT = process.env.PORT || 3001;

// // Middleware
// app.use(function (req, res, next) {
//   res.header("Access-Control-Allow-Origin", "http://localhost:5173"); // update to match the domain you will make the request from
//   res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//   next();
// });
// app.use(express.json());
// app.use(express.urlencoded({ extended: false }));
// // app.use(express.static(path.join(__dirname, "public")));
// app.use(express.static(path.join(__dirname, "../client/dist")));

// app.get("/*", function (req, res) {
//   res.sendFile(path.join(__dirname, "../client/dist/index.html"), function (err) {
//     if (err) {
//       res.status(500).send(err);
//     }
//   });
// });

// // app.get("*", (req, res) => {
// //   res.sendFile(path.join(__dirname, "../client/dist/index.html"));
// // });

// // Routes
// app.use(routes);
// // app.use("/api", routes);
// // app.use("/signup", signupRoutes);

// // Sync database + start server
// app.listen(PORT, () => console.log(`Now listening on port ${PORT}`));

require("dotenv").config({ path: "./.env" });
// const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const express = require("express");
const cors = require("cors");
const path = require("path");
const routes = require("./routes/api/index");

const { ApolloServer } = require("@apollo/server");
const { expressMiddleware } = require("@apollo/server/express4");
const { authMiddleware } = require("./utils/auth");

const { typeDefs, resolvers } = require("./schemas");
const db = require("./config/connection");

const PORT = process.env.PORT || 5001;
const app = express();

//Create custom Date scalar
const { GraphQLScalarType } = require("graphql");
const { Kind } = require("graphql/language");
const resolverMap = {
  Date: new GraphQLScalarType({
    name: "Date",
    description: "Date custom scalar type",
    parseValue(value) {
      return new Date(value); // value from the client
    },
    serialize(value) {
      return value.getTime(); // value sent to the client
    },
    parseLiteral(ast) {
      if (ast.kind === Kind.INT) {
        return parseInt(ast.value, 10); // ast value is always in string format
      }
      return null;
    },
  }),
};
const server = new ApolloServer({
  typeDefs,
  resolvers: {
    Date: resolverMap,
    ...resolvers,
  },
});

// Create a new Apollo server instance with GraphQL
const startApolloServer = async () => {
  await server.start();

  app.use(cors());
  app.use(express.urlencoded({ extended: false }));
  app.use(express.json());

  app.use("/api", routes);

  app.use(
    "/graphql",
    expressMiddleware(server, {
      context: authMiddleware,
    })
  );

  // app.use(function (req, res, next) {
  //   res.header("Access-Control-Allow-Origin", "http://localhost:5001"); // update to match the domain you will make the request from
  //   res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  //   next();
  // });

  if (process.env.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname, "../client/dist")));

    app.get("*", (req, res) => {
      res.sendFile(path.join(__dirname, "../client/dist/index.html"));
    });
  }

  db.once("open", () => {
    app.listen(PORT, () => {
      console.log(`Apollo server running on ${PORT}`);
    });
  });
};

// Call the function to start the server
startApolloServer();
