import { categoryArr} from "../../Data";
import type { Option } from "../../Data";
import { CATEGORY_OPTION_LABEL } from "../../labels";

type Props = {
  value: Option; 
  onChange: (v: Option) => void 
};

function category ({value, onChange}: Props) {
    
    return (
        <>
        <label htmlFor="category"> {CATEGORY_OPTION_LABEL} :</label>
        <select
            id = "category"
            value = {value.value}
            onChange ={(e) => {
                    const selected = categoryArr.find(it => it.value === e.target.value);
                    if (selected) onChange(selected);
                }}
            >  
            {categoryArr.map((item, index) =>(
                <option 
                    key={index} 
                    value={item.value}
                    disabled={item.isDefault === true}
                    hidden={item.isDefault === true}
                >
                {item.label}
                </option>
            ))}
          </select>
        </>
    );
}

export default category;