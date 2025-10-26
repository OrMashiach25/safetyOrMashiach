import { useState } from "react";

function location () {
    const locationArr= ["בחר/י", "בסיס", " שטח אזרחי", " שטח אש", "רציף"];

    const [location, setLocation] = useState(locationArr[0]);

    return(
      <label>
        מקום האירוע:
      
        <select
          value = {location}
          onChange ={(e) => setLocation(e.target.value)}>
          
          {locationArr.map((level, index) =>(
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

export default location;