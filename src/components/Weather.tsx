import { useState } from "react";
import { weatherArr} from "../Data";
import type { Option } from "../Data";


function weather () {

    const [weather, setWeather] = useState<Option>(weatherArr[0]);

    return(
        <label>
            תנאים סביבתיים:
            
            <select
            value={weather.value}
            onChange={(e) => setWeather({value: e.target.value, label: e.target.value})}>

            {weatherArr.map((item, index) =>(
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

export default weather;