import "./App.css";
import { Routes, Route } from "react-router-dom";
import Layout from "./layout/Layout";
import Home from "./pages/Home";
import Favorites from "./pages/Favorites";
import Login from "./components/auth/login";
import { Toaster } from "react-hot-toast";
import { AuthProvider } from "./contexts/authContext";
import Register from "./components/auth/register";
import MovieDetails from "./pages/MovieDetails";

function App() {
  return (
    <AuthProvider>
      <Toaster position="bottom-center" />
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="favorites" element={<Favorites />} />
          <Route path="home" element={<Home />} />
          <Route path="/movie/:id" element={<MovieDetails />} />
        </Route>
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route path="/" element={<Login />} />
        <Route path="*" element={<Login />} />
      </Routes>
    </AuthProvider>
  );
}

export default App;
