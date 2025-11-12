import { resultsArr, injuriesLevelArr} from "../../Data";
import type { Option } from "../../Data";
import { RESULTS_LABEL, INJURY_LEVEL_LABEL} from "../../labels";

type Props = {
  value: Option;                    
  onChange: (v: Option) => void;    
  injuryLevel: Option;             
  onChangeInjury: (v: Option) => void; 
};

function Results({ value, onChange, injuryLevel, onChangeInjury }: Props) {
    return(
        <>
          <div className="field results-cell">
            <label htmlFor="results"> {RESULTS_LABEL} :</label>  
            <select
              id="results"
              value = {value.value}
              onChange ={(e) => {
              const selected = resultsArr.find(it => it.value === e.target.value);
              if (selected) onChange(selected);
            }}
          >
            {resultsArr.map((item, index) =>(
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
          </div>

        
        {value.value.includes("with_injury") &&  (

          <div className="field severity-cell">
            <label htmlFor="injuryLevel"> {INJURY_LEVEL_LABEL} :</label>
              <select
              id="injuryLevel"
                value={injuryLevel.value}
                onChange={(e) => {
                  const selected = injuriesLevelArr.find(it => it.value === e.target.value);
                  if (selected) onChangeInjury(selected);
                }}
              >
                {injuriesLevelArr.map((item, index) => (
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
          </div>
      )}
      </>
    );
}

export default Results;