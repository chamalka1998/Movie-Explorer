import axios from "axios";
import { toast } from "react-hot-toast";

const API_KEY = process.env.REACT_APP_TMDB_API_KEY;
const BASE_URL = "https://api.themoviedb.org/3";

// Fetch many movies across multiple pages
export const fetchManyMovies = async (totalPages = 10) => {
  const allMovies = [];

  for (let page = 1; page <= totalPages; page++) {
    try {
      const response = await axios.get(`${BASE_URL}/discover/movie`, {
        params: {
          api_key: API_KEY,
          sort_by: "popularity.desc",
          page,
        },
      });

      if (response.data && response.data.results) {
        allMovies.push(...response.data.results);
      }
    } catch (error) {
      console.error(`Error fetching movies on page ${page}:`, error);
      toast.error(`Failed to load movies (page ${page})`);
    }
  }

  return allMovies;
};

// Fetch movies by a single page
// In api/tmdb.js
export const fetchMoviesByPage = async (page, filters = {}) => {
  try {
    const { genre, year, rating } = filters;
    const response = await axios.get(`${BASE_URL}/discover/movie`, {
      params: {
        api_key: API_KEY,
        language: "en-US",
        page,
        with_genres: genre || undefined, // Pass genre if available
        year: year || undefined, // Pass year if available
        vote_average: rating || undefined, // Pass rating if available
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching movies:", error);
    return null;
  }
};

// Fetch trending movies
export const fetchTrendingMovies = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/trending/movie/week`, {
      params: {
        api_key: API_KEY,
      },
    });
    return response.data.results;
  } catch (error) {
    console.error("Error fetching trending movies:", error);
    toast.error("Failed to load trending movies.");
    return [];
  }
};

// Search movies
export const searchMovies = async (query, page = 1) => {
  try {
    const response = await axios.get(`${BASE_URL}/search/movie`, {
      params: {
        api_key: API_KEY,
        query,
        page,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error searching movies:", error);
    toast.error("Movie search failed. Try again.");
    return { results: [] };
  }
};

// Get movie details by ID
export const getMovieDetails = async (id) => {
  try {
    const response = await axios.get(`${BASE_URL}/movie/${id}`, {
      params: {
        api_key: API_KEY,
        append_to_response: "videos,credits",
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching movie details:", error);
    toast.error("Failed to fetch movie details.");
    return null;
  }
};
// Fetch genres from TMDB API
export const fetchGenres = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/genre/movie/list`, {
      params: {
        api_key: API_KEY,
        language: "en-US",
      },
    });
    return response.data.genres || [];
  } catch (error) {
    console.error("Error fetching genres:", error);
    return [];
  }
};
