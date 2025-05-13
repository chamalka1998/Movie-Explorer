import React, { useState } from "react";
import { Navigate, Link } from "react-router-dom";
import {
  doSignInWithEmailAndPassword,
  doSignInWithGoogle,
} from "../../../firebase/auth";
import { useAuth } from "../../../contexts/authContext";

import {
  CssBaseline,
  Stack,
  Typography,
  TextField,
  Button,
  Paper,
  Divider,
  Box,
} from "@mui/material";

const Login = () => {
  const { userLoggedIn } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSigningIn, setIsSigningIn] = useState(false);
  const [errorMessage] = useState("");

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!isSigningIn) {
      setIsSigningIn(true);
      await doSignInWithEmailAndPassword(email, password);
    }
  };

  const onGoogleSignIn = (e) => {
    e.preventDefault();
    if (!isSigningIn) {
      setIsSigningIn(true);
      doSignInWithGoogle().catch(() => {
        setIsSigningIn(false);
      });
    }
  };

  return (
    <>
      {userLoggedIn && <Navigate to="/home" replace />}
      <CssBaseline />
      <Stack
        direction="column"
        alignItems="center"
        justifyContent="center"
        sx={{
          height: "100vh",
          background: "radial-gradient(ellipse at center, #f0f4ff, #ffffff)",
        }}
      >
        <Paper elevation={6} sx={{ p: 4, width: 400 }}>
          <Typography variant="h5" fontWeight="bold" textAlign="center" mb={2}>
            Welcome Back
          </Typography>
          <form onSubmit={onSubmit}>
            <TextField
              label="Email"
              type="email"
              required
              value={email}
              fullWidth
              onChange={(e) => setEmail(e.target.value)}
              margin="normal"
            />
            <TextField
              label="Password"
              type="password"
              required
              value={password}
              fullWidth
              onChange={(e) => setPassword(e.target.value)}
              margin="normal"
            />
            {errorMessage && (
              <Typography color="error" variant="body2" fontWeight="bold">
                {errorMessage}
              </Typography>
            )}
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 2 }}
              disabled={isSigningIn}
            >
              {isSigningIn ? "Signing In..." : "Sign In"}
            </Button>
          </form>

          <Typography textAlign="center" mt={2} variant="body2">
            Don't have an account?{" "}
            <Link to="/register" style={{ fontWeight: "bold" }}>
              Sign up
            </Link>
          </Typography>

          <Box display="flex" alignItems="center" my={2}>
            <Divider sx={{ flex: 1 }} />
            <Typography variant="caption" mx={1}>
              OR
            </Typography>
            <Divider sx={{ flex: 1 }} />
          </Box>

          <Button
            fullWidth
            onClick={onGoogleSignIn}
            disabled={isSigningIn}
            variant="outlined"
            startIcon={
              <img
                src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg"
                alt="Google"
                width={20}
              />
            }
          >
            {isSigningIn ? "Signing In..." : "Continue with Google"}
          </Button>
        </Paper>
      </Stack>
    </>
  );
};

export default Login;
