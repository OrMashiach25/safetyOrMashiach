import { useState } from "react";
import { unitActivityTypeArr} from "../Data";
import type { Option } from "../Data";

function unitActivityType() {

    const [unitActivity, setUnitActivity] = useState<Option>(unitActivityTypeArr[0]);

    return (
      <>
      <label htmlFor="unitActivityType"> פעילות היחידה:</label>
        <select
          id= "unitActivityType"
          value = {unitActivity.value}
          onChange = {(e) => setUnitActivity({value: e.target.value, label: e.target.value})}>
        
          {unitActivityTypeArr.map((item, index) => (
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
export default unitActivityType;



