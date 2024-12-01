// Load environment variables
require('dotenv').config();

// Import necessary Firebase modules
const { initializeApp } = require('firebase/app');
const { getFirestore, collection, addDoc, getDocs } = require('firebase/firestore');
const express = require('express');
const app = express();
const port = 3000;

// Middleware to parse JSON requests
app.use(express.json());

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

const firebaseApp = initializeApp(firebaseConfig);
const db = getFirestore(firebaseApp);

// Serve the frontend files (static)
app.use(express.static('public'));

// Function to generate a short code (random string of 6 characters)
function generateShortCode() {
  return Math.random().toString(36).substring(2, 8);
}

// Store the original URL and its corresponding short code in Firestore
async function createShortURL(originalURL) {
  const shortCode = generateShortCode();
  
  // Check if the short code already exists
  const existingShortCode = await checkShortCode(shortCode);
  if (existingShortCode) {
    return createShortURL(originalURL);  // Regenerate if it exists
  }

  const docRef = await addDoc(collection(db, 'shortenedURLs'), {
    originalURL,
    shortCode,
  });

  return shortCode;
}

// Check if the generated short code already exists
async function checkShortCode(shortCode) {
  const querySnapshot = await getDocs(collection(db, 'shortenedURLs'));
  return querySnapshot.docs.some(doc => doc.data().shortCode === shortCode);
}

// Retrieve original URL by short code
async function getOriginalURL(shortCode) {
  const querySnapshot = await getDocs(collection(db, 'shortenedURLs'));
  const found = querySnapshot.docs.find(doc => doc.data().shortCode === shortCode);

  if (found) {
    return found.data().originalURL;
  } else {
    return null;  // Short code not found
  }
}

// POST endpoint to shorten URL
app.post('/shorten', async (req, res) => {
  const { originalURL } = req.body;
  if (!originalURL) {
    return res.status(400).json({ success: false, message: 'URL is required' });
  }

  // Create a shortened URL
  const shortCode = await createShortURL(originalURL);

  // Respond with the short code
  res.json({ success: true, shortCode });
});

// Redirect user based on the short code
app.get('/:shortCode', async (req, res) => {
  const shortCode = req.params.shortCode;
  const originalURL = await getOriginalURL(shortCode);
  
  if (originalURL) {
    res.redirect(originalURL);  // Redirect to the original URL
  } else {
    res.status(404).send('URL not found');
  }
});

// Start the Express server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
