import * as React from "react";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardActions from "@mui/material/CardActions";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { red } from "@mui/material/colors";
import { addFavorite, removeFavorite } from "../firebase/favorites_func";
import { getFirestore, doc, getDoc } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import "../assets/CSS/MovieCard.css";

export default function MovieCard({ movie }) {
  const [isFavorited, setIsFavorited] = React.useState(false);
  const navigate = useNavigate();
  const darkMode = useSelector((state) => state.theme.darkMode);

  const handleFavoriteClick = async (e) => {
    e.stopPropagation(); // Prevent navigation
    if (isFavorited) {
      await removeFavorite(movie.id);
      setIsFavorited(false);
    } else {
      await addFavorite(movie);
      setIsFavorited(true);
    }
  };

  React.useEffect(() => {
    const checkIfFavorited = async () => {
      const auth = getAuth();
      const user = auth.currentUser;
      if (!user) return;

      const db = getFirestore();
      const favoriteDocRef = doc(
        db,
        "favorites",
        user.uid,
        "movies",
        movie.id.toString()
      );

      try {
        const docSnap = await getDoc(favoriteDocRef);
        setIsFavorited(docSnap.exists());
      } catch (error) {
        console.error("Error checking favorite status:", error);
      }
    };

    checkIfFavorited();
  }, [movie.id]);

  const { title, release_date, poster_path } = movie;
  const posterUrl = `https://image.tmdb.org/t/p/w500${poster_path}`;

  return (
    <Card
      className={`movie-card ${darkMode ? "dark-mode" : "light-mode"}`}
      onClick={() => navigate(`/movie/${movie.id}`)}
    >
      <CardHeader
        avatar={
          <Typography sx={{ color: red[500], fontWeight: "bold" }}>
            {release_date?.split("-")[0]}
          </Typography>
        }
        title={
          <Typography className="movie-title" title={title}>
            {title}
          </Typography>
        }
        subheader={
          <Typography className="movie-subtext" sx={{ fontSize: "0.7rem" }}>
            {" "}
            {/* Adjust font size here */}
            {`Release Date: ${release_date}`}
          </Typography>
        }
      />

      <CardMedia
        component="img"
        height="300"
        image={posterUrl}
        alt={title}
        className="card-media"
      />
      <CardActions disableSpacing className="card-actions">
        <IconButton
          aria-label="add to favorites"
          onClick={handleFavoriteClick}
          sx={{ color: isFavorited ? red[500] : "inherit" }}
        >
          <FavoriteIcon />
        </IconButton>
      </CardActions>
    </Card>
  );
}
