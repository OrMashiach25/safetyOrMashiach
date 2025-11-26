import { weatherArr} from "../../Data";
import type { Option } from "../../Data";
import { WEATHER_LABEL } from "../../labels";

type Props = {
  value: Option; 
  onChange: (v: Option) => void 
};

function Weather ({value, onChange}: Props) {

    return(
        <>
        <label htmlFor="weather"> {WEATHER_LABEL} :</label> 
            <select
                id="weather"
                value={value.value}
                onChange={(e) => {
                    const selected = weatherArr.find(it => it.value === e.target.value);
                    if (selected) onChange(selected);
                }}
        >
            {weatherArr.map((item, index) =>(
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

export default Weather;