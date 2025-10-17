import mongoose from "mongoose";
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

// Get the current file's directory
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Try multiple possible locations for the .env file
const envPaths = [
  path.resolve(__dirname, '../../.env'),  // Root directory
  path.resolve(process.cwd(), '.env'),    // Current working directory
  path.resolve(__dirname, '.env')         // Server directory
];

// Try each path until one works
let envLoaded = false;
for (const envPath of envPaths) {
  try {
    const result = dotenv.config({ path: envPath });
    if (!result.error) {
      console.log('Loaded environment variables from:', envPath);
      envLoaded = true;
      break;
    }
  } catch (e) {
    console.log(`Failed to load .env from ${envPath}:`, e.message);
  }
}

if (!envLoaded) {
  console.warn('Warning: No .env file found. Using system environment variables.');
}

// Now try to get the MONGODB_URI
const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  console.error('MONGODB_URI is not defined in environment variables');
  console.log('Current working directory:', process.cwd());
  console.log('Tried .env paths:', envPaths);
  console.log('Environment variables:', Object.keys(process.env).join(', '));
  throw new Error("MONGODB_URI environment variable is not defined. Please make sure it's set in your .env file.");
}

let isConnected = false;

export async function connectDB() {
  if (isConnected) {
    return;
  }

  try {
    await mongoose.connect(MONGODB_URI!);
    isConnected = true;
    console.log("✅ Connected to MongoDB Atlas");
  } catch (error) {
    console.error("❌ MongoDB connection error:", error);
    throw error;
  }
}

mongoose.connection.on("disconnected", () => {
  isConnected = false;
  console.log("MongoDB disconnected");
});

mongoose.connection.on("error", (error) => {
  console.error("MongoDB error:", error);
});
