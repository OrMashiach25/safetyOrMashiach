
import { locationArr} from "../../Data";
import type { Option } from "../../Data";
import { LOCATION_LABEL } from "../../labels";
type Props = {
  value: Option; 
  onChange: (v: Option) => void 
};

function LocationSelect ({value, onChange}: Props) {
  return(
    <>
      <label htmlFor="location"> {LOCATION_LABEL} :</label>
      <select
          id="location"
          value = {value.value}
          onChange ={(e) => {
              const selected = locationArr.find((item) => item.value === e.target.value);
              if (selected) onChange(selected);
            }}
      >
        {locationArr.map((item, index) =>(
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

export default LocationSelect;