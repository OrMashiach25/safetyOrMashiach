import "./App.css"; 
import Navbar from "./components/NavbarComponents/Navber";
import EventForm from "./components/EventForm";
import NewPage from "./components/TablePageComponents/TablePage";
import { BrowserRouter as Router, Routes, Route} from "react-router-dom";
import { useState, useMemo } from "react";
import { ThemeProvider, createTheme, CssBaseline } from "@mui/material";

function App() {
  const [mode, setMode] = useState<"light" | "dark">("light");

  const theme = useMemo(
    () =>
      createTheme({
        direction: "rtl",
        palette: mode === 'light' ? {mode} : {mode: 'dark', background : {default: '#2b2c2d'}},
      }),
    [mode]
  );

  const toggleMode = () => {
    const next = mode === "light" ? "dark" : "light";
    setMode(next);
    localStorage.setItem("mode", next);
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <AppContent mode={mode} toggleMode={toggleMode} />
      </Router>
    </ThemeProvider>
  );
}

function AppContent({ mode, toggleMode }: { mode: "light" | "dark"; toggleMode: () => void }) {
  return (
    
    <div dir="rtl" className={`HomePage ${mode === "dark" ? "dark" : "light"}`}>
      
      <Navbar mode={mode} toggleMode={toggleMode} />        
      <Routes>
        <Route path="/" element={<EventForm />} />
        <Route path="/page1" element={<NewPage />} />
      </Routes>
    </div>
  );
}

export default App;
