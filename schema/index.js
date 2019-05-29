import { schemaComposer } from 'graphql-compose';
global.schemaComposer = schemaComposer;

//模型:
require('./User')
require('./Homework')

//自定义模型
require('./custom_gql')

//关系:
require('./user-homework-relations');
console.log("in graphqlSchema index");
const graphqlSchema = global.schemaComposer.buildSchema();
export default graphqlSchema;


// export default graphqlSchema