import { composeWithMongoose } from 'graphql-compose-mongoose/node8';
import mongoose from 'mongoose';


const LanguagesSchema = new mongoose.Schema({
  language: String,
  skill: {
    type: String,
    enum: ['basic', 'fluent', 'native'],
  },
});


const UserSchema = new mongoose.Schema({
  name: String, // standard types
  age: {
    type: Number,
    index: true,
  },
  hid: String,
  languages: {
    type: [LanguagesSchema], // you may include other schemas (here included as array of embedded documents)
    default: [],
  },
  contacts: { // another mongoose way for providing embedded documents
    email: String,
    phones: [String], // array of strings
  },
  gender: { // enum field with values
    type: String,
    enum: ['male', 'female', 'ladyboy'],
  },
  someMixed: {
    type: mongoose.Schema.Types.Mixed,
    description: 'Can be any mixed type, that will be treated as JSON GraphQL Scalar Type',
  },
});
const User = mongoose.model('User', UserSchema);

const customizationOptions = {
  resolvers: {
    findOne: {
      filter: false
    }
  }
}; // left it empty for simplicity, described below
const UserTC = composeWithMongoose(User, customizationOptions);


//对_id字段的单独控制
//如果是管理员才能访问该字段
UserTC.extendField('_id',{
  resolve: (source, args, context) => (context.isAdmin ? source._id : null)
});


let schemaComposer = global.schemaComposer;
console.log("schemaComposer==>", schemaComposer);

function adminAccess(resolvers) {
  Object.keys(resolvers).forEach(k => {
    resolvers[k] = resolvers[k].wrapResolve(next => rp => {
      // rp = resolveParams = { source, args, context, info }
      // console.log("rp.context==>",rp);

      if (!rp.context.isAdmin) {
        throw new Error('You should be admin, to have access to this action.');
      }
      return next(rp);
    });
  });
  return resolvers;
}

schemaComposer.Query.addFields({
  userById: UserTC.getResolver('findById'),
  userByIds: UserTC.getResolver('findByIds'),
  userOne: UserTC.getResolver('findOne'),
  userMany: UserTC.getResolver('findMany'),
  userCount: UserTC.getResolver('count'),
  userConnection: UserTC.getResolver('connection'),
  ...adminAccess({
    userPagination: UserTC.getResolver('pagination'),
  }),
});

schemaComposer.Mutation.addFields({
  userCreateOne: UserTC.getResolver('createOne'),
  userCreateMany: UserTC.getResolver('createMany'),
  userUpdateById: UserTC.getResolver('updateById'),
  userUpdateOne: UserTC.getResolver('updateOne'),
  userUpdateMany: UserTC.getResolver('updateMany'),
  userRemoveById: UserTC.getResolver('removeById'),
  userRemoveOne: UserTC.getResolver('removeOne'),
  userRemoveMany: UserTC.getResolver('removeMany'),
});



module.exports = {
  User, UserTC
}