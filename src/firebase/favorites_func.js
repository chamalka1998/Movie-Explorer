import { doc, setDoc, deleteDoc, serverTimestamp } from "firebase/firestore";
import { db } from "./firebase";
import { auth } from "./firebase";

// Add a movie to favorites
export const addFavorite = async (movie) => {
  const user = auth.currentUser;
  if (!user) throw new Error("Not authenticated");
  const movieRef = doc(
    db,
    "favorites",
    user.uid,
    "movies",
    movie.id.toString()
  );

  await setDoc(movieRef, {
    ...movie,
    addedAt: serverTimestamp(),
  });
};

// Remove a movie from favorites
export const removeFavorite = async (movieId) => {
  const user = auth.currentUser;
  if (!user) throw new Error("Not authenticated");
  const movieRef = doc(db, "favorites", user.uid, "movies", movieId.toString());
  await deleteDoc(movieRef);
};

// Retrieve all favorite movies
export const getFavorites = async () => {
  const user = auth.currentUser;
  if (!user) throw new Error("Not authenticated");
  // Retrieve the favorite movies from Firestore (you can implement your own query here)
};
