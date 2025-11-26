import "./App.css"; 
import Navbar from "./components/Navbar/Navber";
import EventForm from "./components/EventForm";
import NewPage from "./components/TablePage/TablePage";
import { BrowserRouter as Router, Routes, Route} from "react-router-dom";
import { ThemeProvider, CssBaseline } from "@mui/material";
import { useColorMode } from "./hooks/useColorMode";


function App() {
  const { mode, theme, toggleMode } = useColorMode();
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
        <Route path="/events" element={<NewPage />} />
      </Routes>
    </div>
  );
}

export default App;
