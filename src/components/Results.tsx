import { useState } from "react";
import { resultsArr} from "../Data";
import { injuriesLevelArr} from "../Data";
import type { Option } from "../Data";


function results() {

    const [results, setResults] = useState<Option>(resultsArr[0]);

    return(
        <>
         <label htmlFor="results"> תוצאות האירוע:</label>  
          <select
          id="results"
          value = {results.value}
          onChange ={(e) => setResults({value: e.target.value, label: e.target.value})}>
          
          {resultsArr.map((item, index) =>(
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
        
        
        <br /><br />
        {results.value.includes("with_injury") &&  (
          <>
          <label htmlFor="activityType"> חומרת הפציעה:</label>
            <select>
              {injuriesLevelArr.map((item, index) => (
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
      )}
      </>
    );
}

export default results;