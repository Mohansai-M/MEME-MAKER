const mongoose =  require('mongoose')

const imageSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    role:{
      type:Number,
      default: 0
    },
    liked:
    {
      type:String,
      default:null
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Users", imageSchema);