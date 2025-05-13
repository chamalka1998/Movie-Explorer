import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { fetchMoviesByPage, fetchGenres } from "../api/tmdb";
import MovieCard from "../components/MovieCard";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import MovieFilters from "../components/MovieFilters";
import LoadingSpinner from "../components/LoadingSpinner";

function Home() {
  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);

  // Filters
  const [selectedGenre, setSelectedGenre] = useState("All");
  const [selectedYear, setSelectedYear] = useState("All");
  const [selectedRating, setSelectedRating] = useState("All");

  const darkMode = useSelector((state) => state.theme.darkMode);

  const [genres, setGenres] = useState([]);
  const [years, setYears] = useState([]);
  const [ratings] = useState([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);

  useEffect(() => {
    loadMovies(1, true);
  }, [selectedGenre, selectedYear, selectedRating]);

  useEffect(() => {
    const getGenres = async () => {
      const genreData = await fetchGenres();
      setGenres([{ id: "All", name: "All" }, ...genreData]);
    };
    getGenres();
  }, []);

  useEffect(() => {
    const getYears = async () => {
      const data = await fetchMoviesByPage(1);
      const yearsList = Array.from(
        new Set(data.results.map((movie) => movie.release_date.split("-")[0]))
      );
      setYears(["All", ...yearsList.sort((a, b) => b - a)]);
    };
    getYears();
  }, []);

  const loadMovies = async (pageToLoad, isFirstLoad = false) => {
    setLoading(true);

    const filterParams = {
      genre: selectedGenre === "All" ? "" : selectedGenre,
      year: selectedYear === "All" ? "" : selectedYear,
      rating: selectedRating === "All" ? "" : selectedRating,
    };

    const data = await fetchMoviesByPage(pageToLoad, filterParams);
    if (!data) return;

    setMovies((prev) =>
      isFirstLoad ? data.results : [...prev, ...data.results]
    );
    setTotalPages(data.total_pages || 1);
    setPage(pageToLoad);
    setLoading(false);
  };

  const handleLoadMore = () => {
    if (page < totalPages) {
      loadMovies(page + 1);
    }
  };

  const handleFilterChange = (newFilters) => {
    setSelectedGenre(newFilters.genre);
    setSelectedYear(newFilters.year);
    setSelectedRating(newFilters.rating);
    loadMovies(1, true);
  };

  return (
    <div className={`home-container ${darkMode ? "dark-mode" : "light-mode"}`}>
      <MovieFilters
        genres={genres}
        years={years}
        ratings={ratings}
        onFilterChange={handleFilterChange}
        selectedGenre={selectedGenre}
        selectedYear={selectedYear}
        selectedRating={selectedRating}
      />

      <Grid container spacing={2} justifyContent="center">
        {movies.map((movie) => (
          <Grid item key={movie.id} xs={12} sm={6} md={4} lg={3} xl={2}>
            <MovieCard movie={movie} />
          </Grid>
        ))}
      </Grid>

      {loading && (
        <div style={{ margin: "20px auto", textAlign: "center" }}>
          <LoadingSpinner />
        </div>
      )}

      {page < totalPages && !loading && (
        <div style={{ textAlign: "center", marginTop: 20 }}>
          <Button variant="contained" onClick={handleLoadMore}>
            Load More
          </Button>
        </div>
      )}

      {page >= totalPages && !loading && (
        <div style={{ textAlign: "center", marginTop: 20 }}>
          <p>No more results</p>
        </div>
      )}
    </div>
  );
}

export default Home;
