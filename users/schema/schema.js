const graphql = require("graphql");
const _ = require("lodash");

const { GraphQLObjectType, GraphQLString, GraphQLInt, GraphQLSchema } = graphql;

//hardcoded data with 2 users
const users = [
  { id: "23", firstName: "Bill", age: 20 },
  { id: "47", firstName: "Samantha", age: 21 },
];

//Below is a "Type" of data called UserType
const UserType = new GraphQLObjectType({
  name: "User",
  fields: {
    id: { type: GraphQLString },
    firstName: { type: GraphQLString },
    age: { type: GraphQLInt },
  },
});

//Below, "Type" of data called RootQuery
const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    user: {
      type: UserType,
      args: { id: { type: GraphQLString } },
      resolve(parentValue, args) {
        //this is the function that goes into the backend, and gets the data
        return _.find(users, { id: args.id });
      },
    },
  },
});

//GraphQLSchema takes a root query, and returns a GraphQL schema instance
module.exports = new GraphQLSchema({
  query: RootQuery,
});
