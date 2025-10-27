import { useState } from "react";
import { categoryArr} from "../Data";
import type { Option } from "../Data";

function category () {
    
    const [category, setCategory] = useState<Option>(categoryArr[0]);

    return (
        <>
        <label htmlFor="category"> מאפיין תחומי:</label>
        <select
            id = "category"
            value = {category.value}
            onChange ={(e) => setCategory({value: e.target.value, label: e.target.value})}>
          
            {categoryArr.map((item, index) =>(
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
        </>
    );
}

export default category;