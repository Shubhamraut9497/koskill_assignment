import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import fs from "fs";
import CustomerDetails from "../models/customerDetails.js";
import multer from "multer";
import UserModel from "../models/user.js";
dotenv.config();

const SECRET_KEY = process.env.SECRET_KEY;
const uploads = multer({
  limits: {
    fieldSize: 10 * 1024 * 1024, // 10MB
  },
});

// Controller function to register a new user
export const registerUser = async (req, res) => {
  try {
    console.log(req.body);
    const salt = bcrypt.genSaltSync(10);
    const { name, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, salt); // Hash the password and create a new user in the database
    const user = await UserModel.create({
      name,
      email,
      password: hashedPassword,
    });
    res.status(200).json(user); // Return the created user as JSON response
  } catch (err) {
    res.status(400).json(err);
    console.log(err);
  }
};

// Controller function to log in a user
export const LoginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const userDoc = await UserModel.findOne({ email }); // Find the user with the provided email
    const passOk = bcrypt.compareSync(password, userDoc.password); // Compare the password with the hashed password in the database
    const options = {
      expiresIn: "30d",
    };
    // If the password is correct, create a JWT token and set it in the cookie
    if (passOk) {
      jwt.sign(
        { email, id: userDoc._id },
        SECRET_KEY,
        {},
        (err, token) => {
          if (err) {
            throw err;
          }
          res.cookie("token", token).json({
            id: userDoc._id,
            email, 
          });
        },
        options
      );
    }
    // If the password is incorrect, return an error response
    else {
      res.status(400).json("wrong credentials");
    }
  } catch (err) {
    // Handle errors and return error response as JSON
    res.status(400).json(err);
    console.log(err);
  }
};

// Controller function to get the user profile using the JWT token in the cookie
export const userProfile = async (req, res) => {
  const { token } = req.cookies;
  try {
    // Verify the JWT token and return the decoded information as JSON response
    jwt.verify(token, SECRET_KEY, {}, (err, info) => {
      if (err) {
        throw err;
      }
      res.json(info);
    });
  } catch (err) {
    console.log(err);
  }
};

// Controller function to log out the user by clearing the token in the cookie
export const logout = async (req, res) => {
  // Clear the token in the cookie and return "ok" as JSON response
  res.cookie("token", "").json("ok");
};

// Controller function to create a new user with details and image upload
export const createNewUser = async (req, res) => {
  try {
    // Handle image upload using multer middleware
    const { originalname, path } = req.file;
    const parts = originalname?.split(".");
    const ext = parts.length > 1 ? parts[parts.length - 1] : "";
    const newPath = path + "." + ext;
    fs.renameSync(path, newPath);

    const { token } = req.cookies;
    // Verify the JWT token and extract user ID from it
    jwt.verify(token, SECRET_KEY, {}, async (err, info) => {
      if (err) {
        throw err;
      }
      const { name, age, occupation, address, phoneNo } = req.body;
      // Create a new customer record in the database with user ID and other details
      const postDoc = await CustomerDetails.create({
        name,
        age,
        address,
        occupation,
        phoneNo,
        cover: newPath,
        author: info.id,
      });
      // Return the created customer record as JSON response
      res.json(postDoc);
    });
  } catch (err) {
    res.status(500).json({ error: "Failed to create new user." });
  }
};

// Controller function to get customer data with pagination and search
export const getCustomerData = async (req, res) => {
  try {
    // Parse query parameters for pagination and search
    const searchQuery = req.query.search;
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 5;
    let query = {};

    if (searchQuery) {
      query.name = { $regex: searchQuery, $options: "i" }; 
    }
    const count = await CustomerDetails.countDocuments(query);
    const totalPages = Math.ceil(count / limit);
    const skip = page * limit - limit;
    // Query the database with search parameters and calculate total pages
    let customers = await CustomerDetails.find(query)
      .populate("author", ["email"])
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);
      
    res.json({ customers, totalPages });
  } catch (error) {
    console.error("Error fetching customer data:", error);
    res.status(500).json({ error: "Failed to fetch customer data" });
  }
};

// Controller function to get a single customer data by ID
export const getSingleCustomerData = async (req, res) => {
  const { id } = req.params;
  const postDoc = await CustomerDetails.findById(id).populate("author", [
    "email",
  ]);
  res.json(postDoc);
};

// Controller function to update customer data by ID
export const UpdateCustomer = async (req, res) => {
  let newPath = null;
  if (req.file) {
    // Handle image upload using multer middleware
    const { originalname, path } = req.file;
    const parts = originalname?.split(".");
    const ext = parts.length > 1 ? parts[parts.length - 1] : "";
    newPath = path + "." + ext;
    fs.renameSync(path, newPath);
  }
  const { token } = req.cookies;

  // Verify the JWT token and extract user ID from it
  jwt.verify(token, SECRET_KEY, {}, async (err, info) => {
    if (err) {
      throw err;
    }
    const { id, name, age, occupation, phoneNo, address } = req.body;
    // Find and update the customer record with the new details and image path
    const postDoc = await CustomerDetails.findOneAndUpdate(
      { _id: id, author: info.id },
      {
        name,
        age,
        phoneNo,
        occupation,
        address,
        cover: newPath ? newPath : null, // Set null if newPath is falsy
      },
      { new: true }
    );

    if (!postDoc) {
      return res.status(400).send("You are not the author of this post.");
    }
    // Return the updated customer record as JSON response
    res.json(postDoc);
  });
};

// Controller function to delete a customer by ID
export const deleteCustomer = async (req, res) => {
  const { id } = req.params;
  try {
    // Find and delete a customer record by ID
    await CustomerDetails.findByIdAndDelete(id);
    res.json({ message: "Customer deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete customer" });
  }
};
