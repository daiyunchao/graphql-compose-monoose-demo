import { composeWithMongoose } from 'graphql-compose-mongoose/node8';
import mongoose from 'mongoose';

const HomeWorkSchema = new mongoose.Schema({
  h_id: String,
  name: String, // standard types
});
const HomeWork = mongoose.model('HomeWork', HomeWorkSchema);



const customizationOptions = {}; // left it empty for simplicity, described below
const HomeWorkTC = composeWithMongoose(HomeWork, customizationOptions);
let schemaComposer = global.schemaComposer;
schemaComposer.Query.addFields({
  homeworkById: HomeWorkTC.getResolver('findById'),
  homeworkByIds: HomeWorkTC.getResolver('findByIds'),
  homeworkOne: HomeWorkTC.getResolver('findOne'),
  homeworkMany: HomeWorkTC.getResolver('findMany'),
  homeworkCount: HomeWorkTC.getResolver('count'),
  homeworkConnection: HomeWorkTC.getResolver('connection'),
  homeworkPagination: HomeWorkTC.getResolver('pagination'),
});

schemaComposer.Mutation.addFields({
  homeworkCreateOne: HomeWorkTC.getResolver('createOne'),
  homeworkCreateMany: HomeWorkTC.getResolver('createMany'),
  homeworkUpdateById: HomeWorkTC.getResolver('updateById'),
  homeworkUpdateOne: HomeWorkTC.getResolver('updateOne'),
  homeworkUpdateMany: HomeWorkTC.getResolver('updateMany'),
  homeworkRemoveById: HomeWorkTC.getResolver('removeById'),
  homeworkRemoveOne: HomeWorkTC.getResolver('removeOne'),
  homeworkRemoveMany: HomeWorkTC.getResolver('removeMany'),
});

module.exports = {
  HomeWork, HomeWorkTC
}