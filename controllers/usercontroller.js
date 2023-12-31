// userController.js
const User = require('../models/usermodel');
const bcrypt = require('bcrypt');
const otpGenerator = require('otp-generator');
const { sendOtpToUser } = require('../utils/sendotp');
// Controller functions
exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getUserById = async (req, res) => {
  const userId = req.params.id;
  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
exports.registerUser = async (req, res) => {
    const { email, password } = req.body;
   console.log(req.body);
    try {
      // Check if the user already exists
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.status(400).json({ message: 'User already exists' });
      }
  
      // Create a new user
      const newUser = new User({ email, password });
      await newUser.save();
  
      res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  exports.updatePhoneNumber = async (req, res) => {
    const { username, phone,email } = req.body;
  
    try {
      // Check if the user exists
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      // Update the user's phone number
      user.phone = phone;
  
      // Generate and save OTP
      const otp = otpGenerator.generate(6, { upperCase: false, specialChars: false, alphabets: false });
      user.otp = otp;
  
      await user.save();
  
      // Send OTP to the user
      sendOtpToUser(user.phone, otp);
  
      res.status(200).json({ message: 'Phone number updated successfully' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
exports.verifyotp=async (req,res)=>{
  const { phoneNumber, userEnteredOTP } = req.body;

    try {
        const user = await User.findOne({ phoneNumber });

        if (!user) {
            return res.send({ success: false, message: 'User not found' });
        }

        if (user.otp === userEnteredOTP) {
            return res.send({ success: true, message: 'OTP verified successfully' });
        } else {
            return res.send({ success: false, message: 'Incorrect OTP' });
        }
    } catch (error) {
        res.status(500).send({ success: false, message: 'Error verifying OTP' });
    }
}
// ... other controller functions
