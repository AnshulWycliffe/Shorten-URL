// Load environment variables
require('dotenv').config();

// Import necessary modules
const express = require('express');
const cors = require('cors');
const { initializeApp } = require('firebase/app');
const { getFirestore, collection, addDoc, getDocs, query, where, getDoc, doc } = require('firebase/firestore');

// Create Express app
const app = express();
const port = 3000;

// Middleware
app.use(express.json());
app.use(cors()); // Allow cross-origin requests
app.use(express.static('public')); // Serve static files

// Initialize Firebase
const firebaseConfig = {
  apiKey: process.env.API_KEY,
  authDomain: process.env.AUTH_DOMAIN,
  projectId: process.env.PROJECT_ID,
  databaseURL: process.env.DATABASE_URL,
  storageBucket: process.env.STORAGE_BUCKET,
  messagingSenderId: process.env.MESSAGING_SENDER_ID,
  appId: process.env.APP_ID,
  measurementId: process.env.MEASUREMENT_ID,
};

let db;
try {
  const firebaseApp = initializeApp(firebaseConfig);
  db = getFirestore(firebaseApp);
  console.log("Firebase initialized");
} catch (error) {
  console.error("Firebase initialization failed:", error);
}

// Helper function to validate URLs
function isValidURL(url) {
  try {
    new URL(url);
    return true;
  } catch (_) {
    return false;
  }
}

// Function to generate a short code (random string of 6 characters)
function generateShortCode() {
  return Math.random().toString(36).substring(2, 8);
}

// Store the original URL and its corresponding short code in Firestore
async function createShortURL(originalURL) {
  const shortCode = generateShortCode();

  // Check if the short code already exists
  const shortCodeExists = await checkShortCode(shortCode);
  if (shortCodeExists) {
    return createShortURL(originalURL); // Regenerate if it exists
  }

  try {
    await addDoc(collection(db, 'shortenedURLs'), {
      originalURL,
      shortCode,
    });
    return shortCode;
  } catch (error) {
    console.error("Error adding document:", error);
    throw new Error("Failed to create short URL");
  }
}

// Check if the generated short code already exists
async function checkShortCode(shortCode) {
  try {
    const shortCodeQuery = query(
      collection(db, 'shortenedURLs'),
      where('shortCode', '==', shortCode)
    );
    const querySnapshot = await getDocs(shortCodeQuery);
    return !querySnapshot.empty;
  } catch (error) {
    console.error("Error checking short code:", error);
    throw new Error("Failed to check short code");
  }
}

// Retrieve original URL by short code
async function getOriginalURL(shortCode) {
  try {
    const shortCodeQuery = query(
      collection(db, 'shortenedURLs'),
      where('shortCode', '==', shortCode)
    );
    const querySnapshot = await getDocs(shortCodeQuery);

    if (!querySnapshot.empty) {
      const doc = querySnapshot.docs[0];
      return doc.data().originalURL;
    }
    return null; // Short code not found
  } catch (error) {
    console.error("Error retrieving original URL:", error);
    throw new Error("Failed to retrieve original URL");
  }
}

// POST endpoint to shorten URL
app.post('/shorten', async (req, res) => {
  const { originalURL } = req.body;

  // Validate the URL
  if (!originalURL || !isValidURL(originalURL)) {
    return res
      .status(400)
      .json({ success: false, message: 'A valid URL is required' });
  }

  try {
    // Create a shortened URL
    const shortCode = await createShortURL(originalURL);

    // Respond with the short code
    res.json({ success: true, shortCode });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: 'Failed to shorten URL' });
  }
});

// Redirect user based on the short code
app.get('/:shortCode', async (req, res) => {
  const shortCode = req.params.shortCode;

  try {
    const originalURL = await getOriginalURL(shortCode);

    if (originalURL) {
      res.redirect(originalURL); // Redirect to the original URL
    } else {
      res.status(404).send('URL not found');
    }
  } catch (error) {
    res.status(500).send('Failed to retrieve the URL');
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
