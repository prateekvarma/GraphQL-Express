const graphql = require("graphql");
const axios = require("axios");

const { GraphQLObjectType, GraphQLString, GraphQLInt, GraphQLSchema } = graphql;

//Below, new GraphQL type of data - CompanyType
const CompanyType = new GraphQLObjectType({
  name: "Company",
  fields: {
    id: { type: GraphQLString },
    name: { type: GraphQLString },
    description: { type: GraphQLString },
  },
});

//Below is a "Type" of data called UserType
const UserType = new GraphQLObjectType({
  name: "User",
  fields: {
    id: { type: GraphQLString },
    firstName: { type: GraphQLString },
    age: { type: GraphQLInt },
    company: {
      type: CompanyType,
      resolve(parentValue, args) {
        //This resolve function will return the company_id, since it's job is to resolve the schema CompanyType into actual DB/API source field data.
        return axios
          .get(`http://localhost:3000/companies/${parentValue.companyId}`)
          .then((res) => res.data);
        //above, we're not just returning "parentValue.companyId" because we need access to the entire data object, and not just the ID.
      },
    },
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
        return axios
          .get(`http://localhost:3000/users/${args.id}`)
          .then((response) => response.data);
      },
    },
    company: {
      type: CompanyType,
      args: { id: { type: GraphQLString } },
      resolve(parentValue, args) {
        return axios
          .get(`http://localhost:3000/companies/${args.id}`)
          .then((resp) => resp.data);
      },
    },
  },
});

//GraphQLSchema takes a root query, and returns a GraphQL schema instance
module.exports = new GraphQLSchema({
  query: RootQuery,
});
