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


function App() {
  return (
    <div dir="rtl" className="from-container">
      <h1>טופס הזנת אירוע</h1>
      <form className="event-form">
        <SubSubUnitInput/>
        <br /><br />
        <TimeAndDate/>
        <br /><br />
        <DescriptionEvent/>
        <br /><br />
        <UnitActivityType/>
        <br /><br />
        <ActivityType/>
        <br /><br />
        <Category/>
        <br /><br />
        <Location/>
        <br /><br />       
        <EventSeverity/>
        <br /><br />
        <Results/>
        <br /><br />
        <Weather/>
        <br /><br />
          
        <button type="submit">שליחה</button>
      </form>
    </div>
  );
}
export default App
