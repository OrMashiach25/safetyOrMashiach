import { useState } from "react";


function weather () {
    const weatherArr = ["בחר/ י", "שרב/ עומס חום", "שלג", "סופת חול" , "גשם" , "ערפל", "התקרחות", "ברד"
    , "נאה" , "רוח" , "ים סוער", "מים שקטים"]

    const [weather, setWeather] = useState(weatherArr[0]);

    return(
        <label>
            תנאים סביבתיים:
            
            <select
            value={weather}
            onChange={(e) => setWeather(e.target.value)}>

            {weatherArr.map((level, index) =>(
                <option 
                    key={index}
                    value={level}
                    disabled={index==0}
                    hidden={index==0}
                    >
                {level}
                </option>
            ))}
            </select>
        </label>

    );
}

export default weather;