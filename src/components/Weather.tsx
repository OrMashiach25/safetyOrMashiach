import { useState } from "react";
import { weatherArr} from "../Data";
import type { Option } from "../Data";


function weather () {

    const [weather, setWeather] = useState<Option>(weatherArr[0]);

    return(
        <>
        <label htmlFor="weather"> תנאים סבבתיים:</label> 
            <select
                id="weather"
                value={weather.value}
                onChange={(e) => setWeather({value: e.target.value, label: e.target.value})}>

            {weatherArr.map((item, index) =>(
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

export default weather;