import "./App.css"; 
import Navbar from "./components/NavbarComponents/Navber";
import EventForm from "./components/EventForm";
import NewPage from "./components/Page1/NewPage";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";


function App() {
  return (
    <Router>
      <Navbar/>
        <div dir="rtl" className="from-container">
          <Routes>
            <Route path="/" element= {<EventForm/>} />
            <Route path="/page1" element= {<NewPage/>} />
          </Routes>
        </div>
    </Router>
  );
}
export default App

