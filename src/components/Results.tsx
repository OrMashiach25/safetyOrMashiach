import { useState } from "react";

function results() {
  const resultsArr = [
    { value: "", label: "בחר/י" },
    { value: "no_injury_no_damage", label: "(א.נ.א.נ) אין נפגעים, אין נזק" },
    { value: "no_injury_with_damage", label: "(א.נ.י.נ) אין נפגעים, יש נזק" },
    { value: "with_injury_no_damage", label: "(י.נ.א.נ) יש נפגעים, אין נזק" },
    { value: "with_injury_with_damage", label: "(י.נ.י.נ) יש נפגעים, יש נזק" }
  ];

  const injuriesLevelArr = [
    { value: "", label: "בחר/י" },
    { value: "none", label: "ללא פגיעה" },
    { value: "minor_no_hospital", label: "(פגוע קל) ללא אשפוז" },
    { value: "minor_hospitalized", label: "(פגוע קל) שאושפז" },
    { value: "moderate", label: "פגוע בינוני" },
    { value: "severe", label: "פגוע קשה/אנוש" },
    { value: "fatal", label: "חלל" }
  ];

    const [results, setResults] = useState(resultsArr[0].value);

    return(
        <>
         <label>
          תוצאות האירוע:  
          <select
          value = {results}
          onChange ={(e) => setResults(e.target.value)}>
          
          {resultsArr.map((item, index) =>(
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

        
        <br /><br />
        {results.includes("with_injury") &&  (
          <label>
            חומרת הפציעה:
            <select>
              {injuriesLevelArr.map((item, index) => (
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
      )}
      </>
    );
}

export default results;