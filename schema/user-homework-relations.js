import { UserTC } from './User';
import { HomeWorkTC } from './Homework';
UserTC.addRelation('homework', {
  resolver: () => {
    return HomeWorkTC.getResolver('findOne')
  },
  prepareArgs: {
    filter: source => {
      return {
        h_id: source.hid
      }
    }
  },
  projection: {
    hid: true
  }
})