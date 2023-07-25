// Import required modules and packages
import express from "express";
import cors from "cors";
import connect from "./src/connect/connect.js";
import router from "./src/routes/routes.js";
import dotenv from "dotenv";
import { fileURLToPath } from 'url';
import path from 'path';

// Load environment variables from a .env file
dotenv.config();

// Create an instance of the Express application
const app = express();

// Enable CORS with specific configurations for handling cross-origin requests
app.use(cors({ credentials: true, origin: "http://localhost:3000" }));

// Parse incoming request bodies with JSON payloads
app.use(express.json());

// Define the current file's name and directory path
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Serve static files from the 'uploads' directory
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

const PORT = process.env.PORT || 8000;

// Use the defined routes for handling incoming requests
app.use("/", router);
app.listen(PORT, () => {
  // Call the 'connect' function to establish a connection to the database
  connect();
  console.log(`Server running on ${PORT}`);
});
