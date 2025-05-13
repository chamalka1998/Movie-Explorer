import * as React from "react";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import "../assets/CSS/SearchBox.css"; // Import external CSS

export default function SearchBox() {
  const [movies, setMovies] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  const [query, setQuery] = React.useState("");
  const navigate = useNavigate();
  const darkMode = useSelector((state) => state.theme.darkMode); // Redux theme

  const fetchMovies = async (searchTerm) => {
    setLoading(true);
    const API_KEY = process.env.REACT_APP_TMDB_API_KEY;
    try {
      const response = await axios.get(
        `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${searchTerm}`
      );
      setMovies(response.data.results);
    } catch (error) {
      console.error("Error fetching movie data", error);
    } finally {
      setLoading(false);
    }
  };

  React.useEffect(() => {
    const lastQuery = localStorage.getItem("lastSearch");
    if (lastQuery) {
      setQuery(lastQuery);
      fetchMovies(lastQuery);
    }
  }, []);

  React.useEffect(() => {
    if (query.length >= 3) {
      fetchMovies(query);
    }
  }, [query]);

  return (
    <div className={`search-box-wrapper ${darkMode ? "dark" : "light"}`}>
      <Autocomplete
        disablePortal
        options={movies}
        getOptionLabel={(option) => option.title || option.name}
        loading={loading}
        onInputChange={(event, newInputValue) => {
          setQuery(newInputValue);
          localStorage.setItem("lastSearch", newInputValue);
        }}
        onChange={(event, selectedMovie) => {
          if (selectedMovie) {
            localStorage.setItem("lastSearchMovieId", selectedMovie.id);
            navigate(`/movie/${selectedMovie.id}`);
          }
        }}
        renderInput={(params) => (
          <TextField {...params} label="Search Movie" variant="outlined" />
        )}
        className="search-box"
      />
    </div>
  );
}
