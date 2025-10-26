import { useState } from "react";

function location () {
    const locationArr = [
      { value: "", label: "בחר/י" },
      { value: "base", label: "בסיס" },
      { value: "civilian_area", label: "שטח אזרחי" },
      { value: "firing_zone", label: "שטח אש" },
      { value: "dock", label: "רציף" }
    ];

    const [location, setLocation] = useState(locationArr[0].value);

    return(
      <label>
        מקום האירוע:
      
        <select
          value = {location}
          onChange ={(e) => setLocation(e.target.value)}>
          
          {locationArr.map((item, index) =>(
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

export default location;