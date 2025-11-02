import "./App.css"; 
import UnitActivityType from "./components/UnitActivityType";
import ActivityType from "./components/ActivityType";
import Category from "./components/Category";
import Location from "./components/Location"; 
import EventSeverity from "./components/EventSeverity";
import Results from "./components/Results";
import Weather from "./components/Weather";
import SubSubUnitInput from "./components/SubUnitInput";
import TimeAndDate from "./components/TimeAndDate";
import DescriptionEvent from "./components/DescriptionEvent";
import Navbar from "./components/Navber";


function App() {
  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
  }

  return (
    <>
    <Navbar/>
      <div dir="rtl" className="from-container">
        <form className="event-form" onSubmit={handleSubmit}>
          <TimeAndDate/>
          <SubSubUnitInput/>
          <DescriptionEvent/>
          <UnitActivityType/>
          <ActivityType/>
          <Category/>
          <Location/>
          <EventSeverity/>
          <Results/>
          <Weather/>
          <button type="submit" >שליחה</button>
        </form>
      </div>
    </>
  );
}
export default App
