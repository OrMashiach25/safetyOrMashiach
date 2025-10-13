import { useState } from "react";

function eventSeverity() {
    const eventSeverityArr = ["בחר/י" , "קל", "בינוני", " חמור"];

    const [eventSeverity, setEventSeverity] = useState(eventSeverityArr[0]);

    return(
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
    );
}

export default eventSeverity;