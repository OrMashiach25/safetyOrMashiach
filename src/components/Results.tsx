import { useState } from "react";
import { resultsArr} from "../Data";
import { injuriesLevelArr} from "../Data";
import type { Option } from "../Data";


function results() {

    const [results, setResults] = useState<Option>(resultsArr[0]);

    return(
        <>
         <label>
          תוצאות האירוע:  
          <select
          value = {results.value}
          onChange ={(e) => setResults({value: e.target.value, label: e.target.value})}>
          
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
        {results.value.includes("with_injury") &&  (
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