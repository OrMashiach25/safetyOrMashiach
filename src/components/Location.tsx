import { useState } from "react";
import { locationArr} from "../Data";
import type { Option } from "../Data";

function location () {

    const [location, setLocation] = useState<Option>(locationArr[0]);

    return(
      <>
      <label htmlFor="location"> מקום האירוע:</label>
      <select
          id="location"
          value = {location.value}
          onChange ={(e) => setLocation({value: e.target.value, label: e.target.value})}>
          
          {locationArr.map((item, index) =>(
            <option 
              key={index} 
              value={item.value}
              disabled={index==0}
              hidden={item.isDefault == true}
              >
              {item.label}
            </option>
          ))}
          </select>
      </>
    );
}

export default location;