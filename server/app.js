const express = require("express");
const { graphqlHTTP } = require("express-graphql");
const cors = require("cors");
const schema = require("./schema/schema");
const { mongoose } = require("mongoose");

const app = express();
const PORT = 3005;

mongoose.connect(
  "mongodb+srv://allxunder:London2020@cluster0.vkzpwy7.mongodb.net/test"
);

app.use(cors());
app.use("/graphql", graphqlHTTP({ schema, graphiql: true }));

const dbConnection = mongoose.connection;
dbConnection.on("error", (err) => console.log("Error", err));
dbConnection.once("open", () => console.log("Connected to DB"));

app.listen(PORT, (err) => {
  err ? console.log(err) : console.log("Server started");
});
