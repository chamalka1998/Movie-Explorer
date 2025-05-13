# 🎬 Movie Explorer App

A responsive React.js web application that allows users to browse, filter, and explore movies using data from The Movie Database (TMDb) API. Users can filter movies by genre, year, and rating, as well as manage a list of favorite movies. Built with Material UI, Redux, Firebase, and YouTube API.

---

## 🚀 Features Implemented

- 🔍 **Movie Browsing**

  - Browse movies with pagination and dynamic loading
  - "Load More" button for fetching more results

- 🎯 **Filter Options**

  - Filter movies by:
    - Genre
    - Release Year
    - Average Rating

- 💡 **Favorites Feature**

  - Authenticated users can add/remove movies to/from favorites
  - Favorites are stored in Firebase Firestore
  - View and manage favorites from a separate page

- 🔒 **Authentication**

  - Firebase Authentication using email & password
  - Conditional rendering based on user login state

- 🌗 **Dark Mode Support**

  - Global light/dark theme toggle using Redux

- 🧭 **Routing**

  - React Router for navigation between Home, Favorites, Login, and Sign Up

- 🎥 **YouTube Trailer Videos**
  - Integrated YouTube API to fetch and display trailer videos for each movie

---

## 🔧 Tech Stack

- **Frontend**: React.js, Material UI
- **State Management**: Redux Toolkit
- **Backend**: Firebase (Firestore + Authentication)
- **API**: [TMDb (The Movie Database)](https://www.themoviedb.org/), [YouTube API](https://developers.google.com/youtube/v3)
- **Routing**: React Router DOM
- **Other Libraries**: Axios, UUID, etc.

---

## 🛠️ Project Setup

### 1. Clone the Repository

To clone this repository, run the following command:

```bash
git clone https://github.com/chamalka1998/Movie-Explorer.git
cd movie-explorer
```

### 2. Once you have cloned the repository, run the following command to install the required dependencies:

```bash
npm install
```

### 3. Create a .env file in the project root by copying the .env.example file

```bash
cp .env.example .env
```

### 4. Then, open the .env file and replace the placeholder values with your actual API keys:

```bash
REACT_APP_TMDB_API_KEY=your_tmdb_api_key
REACT_APP_YT_API_KEY=your_youtube_api_key

REACT_APP_FIREBASE_AUTH_DOMAIN=your_project_id.firebaseapp.com
REACT_APP_FIREBASE_PROJECT_ID=your_project_id
REACT_APP_FIREBASE_STORAGE_BUCKET=your_project_id.firebasestorage.app
REACT_APP_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
REACT_APP_FIREBASE_API_KEY=your_firebase_api_key
REACT_APP_FIREBASE_APP_ID=your_firebase_app_id
```

### 5. To run the app locally, use the following command:

```bash
npm start
```
