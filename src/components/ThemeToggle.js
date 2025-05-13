import * as React from "react";
import Switch from "@mui/material/Switch";
import { styled } from "@mui/material/styles";
import { useDispatch, useSelector } from "react-redux";
import { toggleMode } from "../redux/theme/themeSlice";

const MaterialUISwitch = styled(Switch)(({ theme }) => {
  const isDark = theme.palette.mode === "dark";

  return {
    width: 62,
    height: 34,
    padding: 7,
    "& .MuiSwitch-switchBase": {
      margin: 1,
      padding: 0,
      transform: "translateX(6px)",
      "&.Mui-checked": {
        color: theme.palette.common.white,
        transform: "translateX(22px)",
        "& .MuiSwitch-thumb:before": {
          backgroundImage: `url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' height='20' width='20' viewBox='0 0 20 20'><path fill='${encodeURIComponent(
            theme.palette.common.white
          )}' d='M4.2 2.5l-.7 1.8-1.8.7 1.8.7.7 1.8.6-1.8L6.7 5l-1.9-.7-.6-1.8zm15 8.3a6.7 6.7 0 11-6.6-6.6 5.8 5.8 0 006.6 6.6z'/></svg>")`,
        },
        "& + .MuiSwitch-track": {
          opacity: 1,
          backgroundColor: isDark
            ? theme.palette.grey[700]
            : theme.palette.grey[400],
        },
      },
    },
    "& .MuiSwitch-thumb": {
      backgroundColor: isDark
        ? theme.palette.grey[900]
        : theme.palette.primary.main,
      width: 32,
      height: 32,
      "&::before": {
        content: "''",
        position: "absolute",
        width: "100%",
        height: "100%",
        left: 0,
        top: 0,
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        backgroundImage: `url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' height='20' width='20' viewBox='0 0 20 20'><path fill='${encodeURIComponent(
          theme.palette.common.white
        )}' d='M9.305 1.667V3.75h1.389V1.667h-1.39zM4.6 4.45L3.62 5.43l1.47 1.47.98-.98L4.6 4.45zm10.8 0l-.98.98 1.47 1.47.98-.98-1.47-1.47zM10 5.14a4.87 4.87 0 100 9.72 4.87 4.87 0 000-9.72zm0 1.39a3.46 3.46 0 110 6.92 3.46 3.46 0 010-6.92zM1.67 9.3v1.4h2.08V9.3H1.67zm14.58 0v1.4h2.08V9.3h-2.08zM5.1 13.93L3.62 15.4l.98.98 1.47-1.47-.98-.98zm9.82 0l-.98.98 1.47 1.47.98-.98-1.47-1.47zM9.3 16.25v2.08h1.39V16.25H9.3z'/></svg>")`,
      },
    },
    "& .MuiSwitch-track": {
      opacity: 1,
      backgroundColor: isDark
        ? theme.palette.grey[600]
        : theme.palette.grey[300],
      borderRadius: 20 / 2,
    },
  };
});

export default function ThemeToggle() {
  const darkMode = useSelector((state) => state.theme.darkMode);
  const dispatch = useDispatch();

  const handleChange = () => {
    dispatch(toggleMode());
  };

  return (
    <MaterialUISwitch
      checked={darkMode}
      onChange={handleChange}
      inputProps={{ "aria-label": "theme toggle" }}
    />
  );
}
