const express = require("express");
const expressGraphQL = require("express-graphql").graphqlHTTP;

const app = express();

//Add middleware
app.use(
  "/graphql",
  expressGraphQL({
    graphiql: true,
  })
);

app.listen(4000, () => {
  console.log("Listening on 4000");
});
