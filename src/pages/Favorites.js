import React, { useState, useEffect } from "react";
import {
  getFirestore,
  collection,
  getDocs,
  query,
  orderBy,
} from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { useSelector } from "react-redux";
import MovieCard from "../../src/components/MovieCard";
import "./Favorites.css";
import { Grid } from "@mui/material";
import LoadingSpinner from "../components/LoadingSpinner";

const Favorites = () => {
  const [favoriteMovies, setFavoriteMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const darkMode = useSelector((state) => state.theme.darkMode);

  useEffect(() => {
    const fetchFavoriteMovies = async () => {
      const auth = getAuth();
      const db = getFirestore();
      const user = auth.currentUser;

      if (user) {
        try {
          const favoriteMoviesRef = collection(
            db,
            "favorites",
            user.uid,
            "movies"
          );
          const q = query(favoriteMoviesRef, orderBy("addedAt", "desc"));
          const querySnapshot = await getDocs(q);
          const movies = querySnapshot.docs.map((doc) => doc.data());
          setFavoriteMovies(movies);
        } catch (error) {
          console.error("Error fetching favorite movies: ", error);
        }
      }
      setLoading(false);
    };

    fetchFavoriteMovies();
  }, []);

  if (loading) {
    return (
      <div
        className={`favorites-container ${darkMode ? "dark-mode" : "light-mode"}`}
      >
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <div
      className={`favorites-container ${darkMode ? "dark-mode" : "light-mode"}`}
    >
      <h1>Your Favorite Movies</h1>

      <Grid container spacing={2} justifyContent="center">
        {favoriteMovies.map((movie, index) => (
          <Grid item key={index} xs={12} sm={6} md={4} lg={3} xl={2}>
            <MovieCard movie={movie} />
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default Favorites;
