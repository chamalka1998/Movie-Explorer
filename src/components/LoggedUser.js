import * as React from "react";
import { AppProvider } from "@toolpad/core/AppProvider";
import { Account } from "@toolpad/core/Account";
import { doSignOut } from "../firebase/auth";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/authContext";
import { useSelector } from "react-redux";

import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";

export default function LoggedUser() {
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  const darkMode = useSelector((state) => state.theme.darkMode); // get theme state from Redux

  const [session, setSession] = React.useState(null);

  React.useEffect(() => {
    if (currentUser) {
      setSession({
        user: {
          name: currentUser.displayName || "User",
          email: currentUser.email || "No Email",
          image:
            currentUser.photoURL ||
            "https://avatars.githubusercontent.com/u/19550456",
        },
      });
    } else {
      navigate("/login");
    }
  }, [currentUser, navigate]);

  const authentication = React.useMemo(() => {
    return {
      signIn: () => {
        setSession(null);
      },
      signOut: () => {
        setSession(null);
        doSignOut().then(() => {
          navigate("/login");
        });
      },
    };
  }, [navigate]);

  // Define light and dark themes
  const theme = React.useMemo(
    () =>
      createTheme({
        palette: {
          mode: darkMode ? "dark" : "light",
        },
      }),
    [darkMode]
  );

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AppProvider authentication={authentication} session={session}>
        <Account />
      </AppProvider>
    </ThemeProvider>
  );
}
