import { useState } from "react";

function results() {
    const resultsArr = ["בחר/י",` (א.נ.א.נ )אין נפגעים , אין נזק`,` (א.נ.י.נ )אין נפגעים , יש נזק`
    ,` (י.נ.א.נ )יש נפגעים, אין נזק`,` (י.נ.י.נ )יש נפגעים, יש נזק`];
    const injuriesLevelArr = ["בחר/י","ללא פגיעה","(פגוע קל )ללא אשפוז","(פגוע קל )שאושפז","פגוע בינוני "
    ,"פגוע קשה/אנוש","חלל"];

    const [results, setResults] = useState(resultsArr[0]);

    return(
        <>
         <label>
          תוצאות האירוע:  
          <select
          value = {results}
          onChange ={(e) => setResults(e.target.value)}>
          
          {resultsArr.map((level, index) =>(
            <option key={index} value={level}>
              {level}
            </option>
          ))}
          </select>
        </label>

        
        <br /><br />
        {results.includes("יש נפגעים") &&  (
          <label>
            חומרת הפציעה:
            <select>
              {injuriesLevelArr.map((level, index) => (
                <option key={index} value={level}>
                  {level}
                </option>
              ))}
            </select>
        </label>
      )}
      </>
    );
}

export default results;