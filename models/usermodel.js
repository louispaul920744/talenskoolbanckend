const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
  username: {
    type: String,
  required:false,
    unique: true,
    default:"",
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password:{
type:String,
required:true
  },
  phone: {
    type: String,
    default:"",
    unique: true,
  },
  otp: {
    type: String,
    default:"",
    unique: true,
  },
  dateOfBirth: {
    type: Date,
   
  },
  talents: {
    type: [String], // Array of strings
    default: [],   // Default value is an empty array
  },
});
userSchema.pre('save', async function (next) {
    try {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(this.password, salt);
      this.password = hashedPassword;
      next();
    } catch (error) {
      next(error);
    }
  });
  
const User = mongoose.model('User', userSchema);

module.exports = User;
