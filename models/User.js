const { Schema, model } = require("mongoose");


const userSchema = new Schema({
  username: {
    type: String,
    unique: true
  },
  password: String,
  firstname: String,
  lastname: String,
  email: { 
    type: String,
    unique: true,
    trim: true,
    lowercase: true
  },
  holdings: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Position'
    }
  ],
  balance: {
    type: Number,
    default: 1000
  }
});

const User = model("User", userSchema);

module.exports = User;
