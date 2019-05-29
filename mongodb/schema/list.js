import mongoose from 'mongoose';
const { Schema } = mongoose
const ListSchema = new Schema({
  title: String,
  desc: String,
  date: String,
  id: String,
  checked: Boolean,
  meta: {
    createAt: {
      type: Date,
      default: Date.now()
    },
    updateAt: {
      type: Date,
      default: Date.now()
    }
  }
})

//类似于触发器的功能:
//当执行保存操作时,触发
ListSchema.pre('save', function (next) {
  console.log("this==>", this,this.isNew);

  if (this.isNew) {
    this.meta.createAt = this.meta.updateAt = Date.now();
  } else {
    this.meta.updateAt = Date.now()
  }
  next();
})

mongoose.model('list', ListSchema);