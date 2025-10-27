import { useState } from "react";
import { activityTypeArr} from "../Data";
import type { Option } from "../Data";

function activityType() {

    const [activityType, setActivityType] = useState<Option>(activityTypeArr[0]);

    return(
        <label>
        פעילות הפרט: 
        <select
            value={activityType.value}
            onChange={(e) => setActivityType({value: e.target.value, label: e.target.value})}>

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
