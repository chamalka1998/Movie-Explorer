import React from "react";
import {
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  Grid,
  Typography,
  Box,
} from "@mui/material";
import { useSelector } from "react-redux";
import "../assets/CSS/MovieFilters.css"; // Import external CSS

function MovieFilters({
  genres,
  years,
  ratings,
  onFilterChange,
  selectedGenre,
  selectedYear,
  selectedRating,
}) {
  const darkMode = useSelector((state) => state.theme.darkMode);

  const handleGenreChange = (e) => {
    onFilterChange({
      genre: e.target.value,
      year: selectedYear,
      rating: selectedRating,
    });
  };

  const handleYearChange = (e) => {
    onFilterChange({
      genre: selectedGenre,
      year: e.target.value,
      rating: selectedRating,
    });
  };

  const handleRatingChange = (e) => {
    onFilterChange({
      genre: selectedGenre,
      year: selectedYear,
      rating: e.target.value,
    });
  };

  return (
    <Box className={`movie-filters-container ${darkMode ? "dark" : ""}`}>
      <Typography
        variant="h6"
        className={`movie-filters-title ${darkMode ? "dark" : ""}`}
      >
        Filter Movies
      </Typography>
      <Grid container spacing={2} justifyContent="center">
        <Grid item xs={12} sm={4}>
          <FormControl fullWidth>
            <InputLabel>Genre</InputLabel>
            <Select
              value={selectedGenre}
              onChange={handleGenreChange}
              label="Genre"
              className={`custom-select ${darkMode ? "dark" : ""}`}
            >
              <MenuItem value="All">All</MenuItem>
              {Array.isArray(genres) &&
                genres.map((genre) => (
                  <MenuItem key={genre.id} value={genre.id}>
                    {genre.name}
                  </MenuItem>
                ))}
            </Select>
          </FormControl>
        </Grid>

        <Grid item xs={12} sm={4}>
          <FormControl fullWidth>
            <InputLabel>Year</InputLabel>
            <Select
              value={selectedYear}
              onChange={handleYearChange}
              label="Year"
              className={`custom-select ${darkMode ? "dark" : ""}`}
            >
              <MenuItem value="All">All</MenuItem>
              {Array.isArray(years) &&
                years.map((year) => (
                  <MenuItem key={year} value={year}>
                    {year}
                  </MenuItem>
                ))}
            </Select>
          </FormControl>
        </Grid>

        <Grid item xs={12} sm={4}>
          <FormControl fullWidth>
            <InputLabel>Rating</InputLabel>
            <Select
              value={selectedRating}
              onChange={handleRatingChange}
              label="Rating"
              className={`custom-select ${darkMode ? "dark" : ""}`}
            >
              <MenuItem value="All">All</MenuItem>
              {Array.isArray(ratings) &&
                ratings.map((rating) => (
                  <MenuItem key={rating} value={rating}>
                    {rating}
                  </MenuItem>
                ))}
            </Select>
          </FormControl>
        </Grid>
      </Grid>
    </Box>
  );
}

export default MovieFilters;
