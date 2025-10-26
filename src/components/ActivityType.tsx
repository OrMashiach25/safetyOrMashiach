import { useState } from "react";

function activityType() {

    const activityTypeArr = [ "בחר/י", "פעילות מבצעית/לחימה", "אימון", "הכשרה", "שגרה", "פנאי", "חופשה" ];

    const [activityType, setActivityType] = useState(activityTypeArr[0]);

    return(
        <label>
        פעילות הפרט: 
        
        <select
            value={activityType}
            onChange={(e) => setActivityType(e.target.value)}>

            {activityTypeArr.map((level, index) =>(
             <option 
                key={index}
                value={level}
                disabled={index==0}
                hidden={index==0}
                >
              {level}
          </option>
          ))}
        </select>

        </label>
    );
}

export default activityType;
