import { useState } from "react";

function unitActivityType() {
    
    const unitActivityTypeArr = [ "בחר/י", 'תע"ם' , "אימונים", "הכשרה" , "רגיעה / מנהלה", "מלחמה/מבצע צבאי נרחב"];

    const [unitActivity, setUnitActivity] = useState(unitActivityTypeArr[0]);

    return (
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
    );

}
export default unitActivityType;



