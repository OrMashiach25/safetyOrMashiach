import { useState, useMemo, useEffect } from "react";
import { createTheme } from "@mui/material";

export function useColorMode() {
  const [mode, setMode] = useState<"light" | "dark">(
    (localStorage.getItem("mode") as "light" | "dark") || "light"
  );

  useEffect(() => {
    localStorage.setItem("mode", mode);
  }, [mode]);

  const theme = useMemo(
    () =>
      createTheme({
        direction: "rtl",
        palette:
          mode === "light"
            ? { mode: "light" }
            : {
                mode: "dark",
                background: { default: "#2b2c2d", paper: "#2b2c2d" },
                text: { primary: "#fff", secondary: "#ddd" }
              }
      }),
    [mode]
  );

  const toggleMode = () => {
    setMode(prev => (prev === "light" ? "dark" : "light"))     ;;
  };

  return { mode, theme, toggleMode };
}
