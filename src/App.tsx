import "./App.css"; 
import Navbar from "./components/NavbarComponents/Navber";
import EventForm from "./components/EventForm";
import NewPage from "./components/Page1/NewPage";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";

function App() {
  return (
    <Router>
      <AppContent/>
    </Router>
  );
}


function AppContent() {
  const location = useLocation();
  const isSecondPage = location.pathname === "/page1";
  
  return (
    <div dir="rtl" className="from-container">
      <Navbar showButton = {!isSecondPage} />
          <Routes>
            <Route path="/" element= {<EventForm/>} />
            <Route path="/page1" element= {<NewPage/>} />
          </Routes>
    </div>
  );
}
export default App

