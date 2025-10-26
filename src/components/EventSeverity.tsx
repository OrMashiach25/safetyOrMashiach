import { useState } from "react";

function eventSeverity() {
    const eventSeverityArr = [
        {value:"", label:"בחר/י"},
        {value:"low", label:"קל"},
        {value:"medium", label:"בינוני"},
        {value:"high", label:" חמור"}
        ];

    const [eventSeverity, setEventSeverity] = useState(eventSeverityArr[0].value);

    return(
        <label>
            חומרת האירוע: 
            
            <select
            value = {eventSeverity}
            onChange ={(e) => setEventSeverity(e.target.value)}>
            
            {eventSeverityArr.map((item, index) =>(
                <option
                    key={index} 
                    value={item.value}
                    disabled={index==0}
                    hidden={index==0}
                    >
                {item.label}
                </option>
            ))}
            </select>
        </label>
    );
}

export default eventSeverity;