import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "./MovieDetails.css";
import { useSelector } from "react-redux";

function MovieDetails() {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [cast, setCast] = useState([]);
  const [trailerId, setTrailerId] = useState(null);
  const [loading, setLoading] = useState(true);

  const TMDB_API_KEY = process.env.REACT_APP_TMDB_API_KEY;
  const YT_API_KEY = process.env.REACT_APP_YT_API_KEY;

  const darkMode = useSelector((state) => state.theme.darkMode);

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const movieRes = await axios.get(
          `https://api.themoviedb.org/3/movie/${id}?api_key=${TMDB_API_KEY}&language=en-US`
        );
        const movieData = movieRes.data;
        setMovie(movieData);

        const creditsRes = await axios.get(
          `https://api.themoviedb.org/3/movie/${id}/credits?api_key=${TMDB_API_KEY}`
        );
        setCast(creditsRes.data.cast.slice(0, 5));

        const ytRes = await axios.get(
          `https://www.googleapis.com/youtube/v3/search`,
          {
            params: {
              part: "snippet",
              q: `${movieData.title} official trailer`,
              key: YT_API_KEY,
              maxResults: 1,
              type: "video",
              videoEmbeddable: "true",
            },
          }
        );
        const trailerVideo = ytRes.data.items[0];
        if (trailerVideo) {
          setTrailerId(trailerVideo.id.videoId);
        }
      } catch (error) {
        console.error("Error fetching movie data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDetails();
  }, [id, TMDB_API_KEY, YT_API_KEY]);

  if (loading) return <div className="movie-details-container">Loading...</div>;
  if (!movie)
    return <div className="movie-details-container">Movie not found.</div>;

  return (
    <div
      className={`movie-details-container ${darkMode ? "dark-mode" : "light-mode"}`}
    >
      <div className="movie-header">
        <img
          src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
          alt={movie.title}
          className="movie-poster"
        />
        <div className="movie-details">
          <h1>{movie.title}</h1>
          <div className="movie-info">
            <p>
              <strong>Release Date:</strong> {movie.release_date}
            </p>
            <p>
              <strong>Rating:</strong> {movie.vote_average}/10
            </p>
            <p>
              <strong>Genres:</strong>{" "}
              {movie.genres.map((g) => g.name).join(", ")}
            </p>
            <p>
              <strong>Overview:</strong> {movie.overview}
            </p>
          </div>
          <div>
            <strong>Top Cast:</strong>
            <ul className="cast-list">
              {cast.map((actor) => (
                <li key={actor.id}>
                  {actor.name} as {actor.character}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {trailerId && (
        <div className="trailer-container">
          <h3>Watch Trailer</h3>
          <div className="trailer-video">
            <iframe
              src={`https://www.youtube.com/embed/${trailerId}`}
              allow="autoplay; encrypted-media"
              allowFullScreen
              title="Trailer"
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default MovieDetails;
