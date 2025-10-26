import { useState } from "react";


function weather () {
    const weatherArr = [
        { value: "", label: "בחר/י" },
        { value: "heatwave", label: "שרב / עומס חום" },
        { value: "snow", label: "שלג" },
        { value: "sandstorm", label: "סופת חול" },
        { value: "rain", label: "גשם" },
        { value: "fog", label: "ערפל" },
        { value: "ice", label: "התקרחות" },
        { value: "hail", label: "ברד" },
        { value: "clear", label: "נאה" },
        { value: "wind", label: "רוח" },
        { value: "rough_sea", label: "ים סוער" },
        { value: "calm_water", label: "מים שקטים" }
        ];


    const [weather, setWeather] = useState(weatherArr[0].value);

    return(
        <label>
            תנאים סביבתיים:
            
            <select
            value={weather}
            onChange={(e) => setWeather(e.target.value)}>

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