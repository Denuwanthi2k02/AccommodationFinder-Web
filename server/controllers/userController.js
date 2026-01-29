import User from "../model/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import Accommodation from '../model/Accommodation.js';

// Generate JWT Token
const generateToken = (userId) => {
  return jwt.sign({ id: userId }, process.env.JWT_SECRET);
};

// Register User
export const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password || password.length < 8) {
      return res.json({ success: false, message: "Fill all the fields" });
    }

    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.json({ success: false, message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({ name, email, password: hashedPassword });

    const token = generateToken(user._id.toString());
    res.json({ success: true, token });
  } catch (error) {
    console.log(error.message);
    res.json({ success: false, message: error.message });
  }
};

// Login User
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.json({ success: false, message: "User not found" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.json({ success: false, message: "Invalid Credentials" });
    }

    const token = generateToken(user._id.toString());
    res.json({ success: true, token });
  } catch (error) {
    console.log(error.message);
    res.json({ success: false, message: error.message });
  }
};

// Get User data using Token (JWT)
export const getUserData = async (req, res) => {
  try {
    const { user } = req;
    res.json({ success: true, user });
  } catch (error) {
    console.log(error.message);
    res.json({ success: false, message: error.message });
  }
};

//Get All accommodation for the Frontend
export const getAnnexs = async (req, res) => {
  try {
    const annexs = await Accommodation.find({isAvaliable:true})
     res.json({ success: true, annexs });
  } catch (error) {
    console.log(error.message);
    res.json({ success: false, message: error.message });
  }
};




export const searchAccommodations = async (req, res) => {
  try {
    let { distance, monthlyRent, numStudents } = req.query;

    // Convert strings to numbers
    distance = distance ? parseFloat(distance) : null;
    monthlyRent = monthlyRent ? parseInt(monthlyRent) : null;
    numStudents = numStudents ? parseInt(numStudents) : null;

    let query = { isAvaliable: true };

    if (distance !== null) {
      query.location = { $lte: distance };  // using `location` as distance
    }

    if (monthlyRent !== null) {
      query.rentPerMonth = { $lte: monthlyRent };
    }

    if (numStudents !== null) {
      query.capacity = { $eq: numStudents }; // exact match
      // OR use $gte if you want min capacity
      // query.capacity = { $gte: numStudents };
    }

    const results = await Accommodation.find(query);

    res.json({ success: true, results });
  } catch (error) {
    console.log(error.message);
    res.json({ success: false, message: error.message });
  }
};





// Get accommodation details with owner & increment views
export const getAnnexById = async (req, res) => {
  try {
    const { id } = req.params;

    // Find annex and increment views atomically
    const annex = await Accommodation.findByIdAndUpdate(
      id,
      { $inc: { views: 1 } },
      { new: true }
    ).populate("owner", "name email phone availableTime address image");

    if (!annex) {
      return res.json({ success: false, message: "Accommodation not found" });
    }

    res.json({ success: true, annex });
  } catch (error) {
    console.log(error.message);
    res.json({ success: false, message: error.message });
  }
};
