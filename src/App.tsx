import "./App.css"; 
import Navbar from "./components/NavbarComponents/Navber";
import EventForm from "./components/EventForm";
import NewPage from "./components/Page1/NewPage";
import { BrowserRouter as Router, Routes, Route} from "react-router-dom";

function App() {
  return (
    <Router>
      <AppContent/>
    </Router>
  );
}


function AppContent() {
  
  return (
    <div dir="rtl" className="from-container">
      <Navbar/>
          <Routes>
            <Route path="/" element= {<EventForm/>} />
            <Route path="/page1" element= {<NewPage/>} />
          </Routes>
    </div>
  );
}
export default App

