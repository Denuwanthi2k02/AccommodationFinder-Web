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




//  Search Accommodations
export const searchAccommodations = async (req, res) => {
  try {
    const { distance, monthlyRent, numStudents } = req.query;

    let query = { isAvaliable: true };

    // Capacity filter
    if (numStudents) {
      if (numStudents === "Above 4") {
        query.capacity = { $gte: 4 };
      } else {
        query.capacity = Number(numStudents);
      }
    }

    // Rent filter
    if (monthlyRent) {
      switch (monthlyRent) {
        case "< 5000":
          query.rentPerMonth = { $lte: 5000 };
          break;
        case "5000-10000":
          query.rentPerMonth = { $gte: 5000, $lte: 10000 };
          break;
        case "10000-15000":
          query.rentPerMonth = { $gte: 10000, $lte: 15000 };
          break;
        case "Above 15000":
          query.rentPerMonth = { $gte: 15000 };
          break;
      }
    }

    // Distance filter (assumes you save it in a field like `distanceFromCampus`)
    if (distance) {
      switch (distance) {
        case "< 1 km":
          query.distanceFromCampus = { $lte: 1 };
          break;
        case "1-3 km":
          query.distanceFromCampus = { $gte: 1, $lte: 3 };
          break;
        case "3-5 km":
          query.distanceFromCampus = { $gte: 3, $lte: 5 };
          break;
        case "Above 5 km":
          query.distanceFromCampus = { $gte: 5 };
          break;
      }
    }

    const results = await Accommodation.find(query);

    res.json({ success: true, results });
  } catch (error) {
    console.log(error.message);
    res.json({ success: false, message: error.message });
  }
};
