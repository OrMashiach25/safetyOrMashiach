import { useState } from "react";

function activityType() {

    const activityTypeArr = [
        { value: "", label: "בחר/י" },
        { value: "combat", label: "פעילות מבצעית/לחימה" },
        { value: "training", label: "אימון" },
        { value: "course", label: "הכשרה" },
        { value: "routine", label: "שגרה" },
        { value: "leisure", label: "פנאי" },
        { value: "vacation", label: "חופשה" }
        ];

    const [activityType, setActivityType] = useState(activityTypeArr[0].value);

    return(
        <label>
        פעילות הפרט: 
        
        <select
            value={activityType}
            onChange={(e) => setActivityType(e.target.value)}>

            {activityTypeArr.map((item, index) =>(
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

export default activityType;
