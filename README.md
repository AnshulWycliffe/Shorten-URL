
# Shorten-URL App 🌐🔗

Welcome to the **Shorten-URL** app! This is a simple, fast, and user-friendly tool that allows you to shorten long URLs into small, shareable links. Built with **Node.js**, **Firebase**, **HTML**, **CSS**, and **JavaScript**, this app is deployed on **Vercel** for seamless access from anywhere.

## Features ✨

- **URL Shortening**: Shorten long URLs and create easily shareable links. 🔗
- **Firebase Integration**: Firebase Firestore is used to store and manage URL data. 🔥
- **Responsive Design**: Built with HTML, CSS, and JavaScript for a smooth and interactive user experience. 📱💻
- **Live Deployment**: Hosted on **Vercel**, making the app accessible globally. 🌍

## Tech Stack ⚙️

- **Node.js**: Backend logic to handle URL shortening requests and interact with Firebase. 🖥️
- **Firebase**: Stores the original URLs and their shortened counterparts in Firestore. 🔒
- **HTML, CSS, JavaScript**: Used for frontend design and functionality. 🎨
- **Vercel**: Hosting and continuous deployment platform for the live app. 🚀

## Prerequisites 🛠️

Before running the app locally, ensure that you have the following:

- [Node.js](https://nodejs.org/en/) (version 14 or higher) 🧑‍💻
- [Firebase](https://firebase.google.com/) 🔥
- [Vercel](https://vercel.com/) 🌍

## Installation 🚧

### 1. Clone the repository

```bash
git clone https://github.com/AnshulWycliffe/Shorten-URL.git
cd Shorten-URL
```

### 2. Install dependencies

```bash
npm install
```

### 3. Firebase Setup

- Go to the [Firebase Console](https://console.firebase.google.com/).
- Create a Firebase project and set up **Firestore Database**.
- Add your Firebase configuration to the `.env` file.

### 4. Run the app locally

```bash
npm start
```

The app will run locally at `http://localhost:3000`. Open this URL in your browser to test the app. 🖥️

## Deployment 🌍

The app is deployed live on **Vercel**. You can access it at:

[Live App Link - Shorten-URL](https://shorten-url-iota.vercel.app) 🚀

## How It Works ⚡

1. **Frontend**: Users submit URLs via the form. JavaScript handles the form data, sending it to the backend.
2. **Backend (Node.js)**: The backend processes the URL, generates a unique short version, and stores the mapping in Firebase Firestore.
3. **Firebase**: Firestore stores both the original and shortened URLs.
4. **Vercel**: The app is hosted on Vercel for instant, global access.

## Contributing 🤝

Feel free to fork this repository, submit pull requests, or open issues to improve the project. Contributions are welcome! 🙌

## License 📜

This project is licensed under the **MIT License**.
MIT License

Copyright (c) [2024] [Anshul Wycliffe]

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.

