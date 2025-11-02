import { useState } from "react";
import { activityTypeArr} from "../Data";
import type { Option } from "../Data";

function activityType() {

    const [activityType, setActivityType] = useState<Option>(activityTypeArr[0]);
    return(
        <>
        <label htmlFor="activityType"> פעילות הפרט:</label> 
            <select
                id="activityType"
                value={activityType.value}
                onChange={(e) => setActivityType({value: e.target.value, label: e.target.value})}>

                {activityTypeArr.map((item, index) =>(
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

export default activityType;
