require("dotenv").config({ path: "./.env" });
// const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const express = require("express");
const cors = require("cors");
const path = require("path");
const routes = require("./routes/api/index");
const postRoutes = require("./routes/postRoutes/index");
const multer = require("multer");

const { ApolloServer } = require("@apollo/server");
const { expressMiddleware } = require("@apollo/server/express4");
const { authMiddleware } = require("./utils/auth");

const { typeDefs, resolvers } = require("./schemas");
const db = require("./config/connection");

const PORT = process.env.PORT || 3001;
const app = express();

const server = new ApolloServer({
  typeDefs,
  resolvers,
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

  const imgconfig = multer.diskStorage({
    destination: (req, file, callback) => {
      callback(null, "uploads");
    },
    filename: (req, file, callback) => {
      callback(null, `image.${file.originalname}`);
    },
  });

  let upload = multer({ storage: imgconfig });
  app.post("/imageupload", upload.single("image"), function (req, res, next) {
    const file = req.file;
    if (!file) {
      const error = new Error("No File");
      error.httpStatusCode = 400;
      return next(error);
    }
    res.send(file);
  });

  app.use("/uploads", express.static(path.join(__dirname, "../client/public")));
  app.use("/uploads", express.static("./uploads"));

  if (process.env.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname, "../client/dist")));

    app.use("/uploads", express.static(path.join(__dirname, "../client/public")));

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
