import "./App.css"; 
import Navbar from "./components/Navber";
import EventForm from "./components/EventForm";

function App() {
  
  return (
    <>
    <Navbar/>
      <div dir="rtl" className="from-container">
        <EventForm />
      </div>
    </>
  );
}
export default App

