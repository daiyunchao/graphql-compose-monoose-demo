const {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLBoolean
} = require('graphql');

let customGQL = {
  sayHello: {
    type: GraphQLString,
    resolve: () => {
      return "hello"
    }
  },
  asyHi: {
    type: GraphQLString,
    resolve: () => {
      return "hi"
    }
  }
}

global.schemaComposer.Query.addFields(customGQL);