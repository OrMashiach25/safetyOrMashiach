import { useState } from "react";
import { eventSeverityArr} from "../Data";
import type { Option } from "../Data";


function eventSeverity() {

    const [eventSeverity, setEventSeverity] = useState<Option>(eventSeverityArr[0]);

    return(
        <label>
            חומרת האירוע: 
            <select
            value = {eventSeverity.value}
            onChange ={(e) => setEventSeverity({value: e.target.value, label: e.target.value})}>
            
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