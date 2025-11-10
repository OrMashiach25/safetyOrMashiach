import { useState, useMemo } from "react";
import { createTheme } from "@mui/material";

export function useColorMode() {
  const [mode, setMode] = useState<"light" | "dark">(
    (localStorage.getItem("mode") as "light" | "dark") || "light"
  );

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
    const next = mode === "light" ? "dark" : "light";
    setMode(next);
    localStorage.setItem("mode", next);
  };

  return { mode, theme, toggleMode };
}
