import { useState } from "react";

function unitActivityType() {
    
const unitActivityTypeArr = [
  { value: "", label: "בחר/י" },
  { value: "taam", label: "תע\"ם" },
  { value: "training", label: "אימונים" },
  { value: "course", label: "הכשרה" },
  { value: "rest_admin", label: "רגיעה / מנהלה" },
  { value: "war_operation", label: "מלחמה / מבצע צבאי נרחב" }
];

    const [unitActivity, setUnitActivity] = useState(unitActivityTypeArr[0].value);

    return (
      <label>
        פעילות היחידה:
      
        <select
          value = {unitActivity}
          onChange = {(e) => setUnitActivity(e.target.value)}>
        
          {unitActivityTypeArr.map((item, index) => (
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
export default unitActivityType;



