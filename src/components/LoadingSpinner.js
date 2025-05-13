import React from "react";
import { CircularProgress, Box } from "@mui/material";
import { useSelector } from "react-redux";

export default function LoadingSpinner() {
  const darkMode = useSelector((state) => state.theme.darkMode);

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
        backgroundColor: darkMode ? "#121212" : "#f5f5f5", // Dark mode background
      }}
    >
      <CircularProgress
        sx={{
          color: darkMode ? "#1db954" : "#1976d2", // Change color based on theme
        }}
      />
    </Box>
  );
}
