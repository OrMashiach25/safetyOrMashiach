import { unitActivityTypeArr} from "../../Data";
import type { Option } from "../../Data";

type Props = {
  value: Option; 
  onChange: (v: Option) => void 
};

function unitActivityType({value , onChange}: Props) {

    return (
      <>
      <label htmlFor="unitActivityType"> פעילות היחידה:</label>
        <select
          id= "unitActivityType"
          value = {value.value}
          onChange ={(e) => {
                  const selected = unitActivityTypeArr.find(it => it.value === e.target.value);
                  if (selected) onChange(selected);
              }}
        >
          {unitActivityTypeArr.map((item, index) => (
            <option 
              key={index} 
              value={item.value}
              disabled={item.isDefault == true}
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



