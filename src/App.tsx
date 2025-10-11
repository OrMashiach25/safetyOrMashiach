import { useState } from "react";

const unitActivityTypeArr = [ "בחר/י", 'תע"ם' , "אימונים", "הכשרה" , "רגיעה / מנהלה", "מלחמה/מבצע צבאי נרחב"];
const activityTypeArr = [ "בחר/י", "פעילות מבצעית/לחימה", "אימון", "הכשרה", "שגרה", "פנאי", "חופשה" ];
const categoryArr = [
,"בחר/י", "נשק ומקלעים ","דרכים","תחמושת",`ירי דו" צ`,"מזג-אוויר",`רק"מ וצמ"ה קרביים`,`שת"פ אוויר`,"עבודה"
,"אוויר","בטיחות ימי","ספורט ואקסטרים","נפילות/חבלות","חריגות ירי או תנועה של כוחות בשטחי אימונים",`חומ"ס`
,`(אמל"ח ) לא נשק /מקלעים`,"אש",`טג"ח קרבי`,`שת"פ ים `,"ייעודי עורף /חילוץ והצלה","אמצעי רום קרוב לקרקע"
,"כושר גופני/ קרבי"];
const locationArr= ["בחר/י", "בסיס", " שטח אזרחי", " שטח אש", "רציף"];
const eventSeverityArr = ["בחר/י" , "קל", "בינוני", " חמור"];
const resultsArr = ["בחר/י",` (א.נ.א.נ )אין נפגעים , אין נזק`,` (א.נ.י.נ )אין נפגעים , יש נזק`
,` (י.נ.א.נ )יש נפגעים, אין נזק`,` (י.נ.י.נ )יש נפגעים, יש נזק`];
const injuriesLevelArr = ["בחר/י","ללא פגיעה","(פגוע קל )ללא אשפוז","(פגוע קל )שאושפז","פגוע בינוני "
,"פגוע קשה/אנוש","חלל"];
const weatherArr = ["בחר/ י", "שרב/ עומס חום", "שלג", "סופת חול" , "גשם" , "ערפל", "התקרחות", "ברד"
, "נאה" , "רוח" , "ים סוער", "מים שקטים"]


function App() {
const [unitActivity, setUnitActivity] = useState(unitActivityTypeArr[0]);
const [activityType, setActivityType] = useState(activityTypeArr[0]);
const [category, setCategory] = useState(categoryArr[0]);
const [location, setLocation] = useState(locationArr[0]);
const [eventSeverity, setEventSeverity] = useState(eventSeverityArr[0]);
const [results, setResults] = useState(resultsArr[0]);
const [weather, setWeather] = useState(weatherArr[0]);


  return (
    <div dir="rtl">
      <h1>טופס הזנת אירוע</h1>
      <form>
        <label>
          יחידות משנה:
          <input type="text" placeholder="טקסט חופשי" />
        </label>
        <br /><br />
        <label>
          תאריך ושעה:
          <input type="datetime-local" />
        </label>
        <br /><br />
        <label>
          תיאור האירוע:
          <textarea rows={5} placeholder="עד 800 תווים"></textarea>
        </label>
        <br /><br />
     
        <label> 
          פעילות היחידה: 
          <select
            value = {unitActivity}
            onChange = {(e) => setUnitActivity(e.target.value)}>
        
            {unitActivityTypeArr.map((level, index) => (
              <option key={index} value={level}>
                {level}
              </option>
            ))}
          </select>
        </label>
        <br /><br />

        <label>
          פעילות הפרט:
          <select
          value={activityType}
          onChange={(e) => setActivityType(e.target.value)}>

          {activityTypeArr.map((level, index) =>(
            <option key={index} value={level}>
              {level}
            </option>
          ))}
          </select>
        </label>
        <br /><br />

        <label>
          מאפיין תחומי: 
          <select
          value = {category}
          onChange ={(e) => setCategory(e.target.value)}>
          
          {categoryArr.map((level, index) =>(
            <option key={index} value={level}>
              {level}
            </option>
          ))}
          </select>
        </label>
        <br /><br />

         <label>
          מקום האירוע:  
          <select
          value = {location}
          onChange ={(e) => setLocation(e.target.value)}>
          
          {locationArr.map((level, index) =>(
            <option key={index} value={level}>
              {level}
            </option>
          ))}
          </select>
        </label>
        <br /><br />
        
         <label>
          חומרת האירוע:  
          <select
          value = {eventSeverity}
          onChange ={(e) => setEventSeverity(e.target.value)}>
          
          {eventSeverityArr.map((level, index) =>(
            <option key={index} value={level}>
              {level}
            </option>
          ))}
          </select>
        </label>
        <br /><br />

         <label>
          תוצאות האירוע:  
          <select
          value = {results}
          onChange ={(e) => setResults(e.target.value)}>
          
          {resultsArr.map((level, index) =>(
            <option key={index} value={level}>
              {level}
            </option>
          ))}
          </select>
        </label>
        <br /><br />
        {results.includes("יש נפגעים") &&  (
          <label>
            חומרת הפציעה:
            <select>
              {injuriesLevelArr.map((level, index) => (
                <option key={index} value={level}>
                  {level}
                </option>
              ))}
            </select>
        </label>
      )}

      <label>
          תנאים סביבתיים: 
          <select
          value={weather}
          onChange={(e) => setWeather(e.target.value)}>

          {weatherArr.map((level, index) =>(
            <option key={index} value={level}>
              {level}
            </option>
          ))}
          </select>
        </label>
        <br /><br />
        <br /><br />
        <button type="submit">שליחה</button>




      </form>
    </div>
  )
}
export default App
