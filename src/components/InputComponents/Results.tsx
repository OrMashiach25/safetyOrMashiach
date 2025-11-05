import { resultsArr, injuriesLevelArr} from "../../Data";
import type { Option } from "../../Data";

type Props = {
  value: Option;                    
  onChange: (v: Option) => void;    
  injuryLevel: Option;             
  onChangeInjury: (v: Option) => void; 
};

function Results({ value, onChange, injuryLevel, onChangeInjury }: Props) {
    return(
        <>
        <label htmlFor="results"> תוצאות האירוע:</label>  
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
              hidden={item.isDefault == true}
              >
              {item.label}
            </option>
          ))}
          </select>
        
        {value.value.includes("with_injury") &&  (
          <>
          <br /><br />
          <label htmlFor="injuryLevel"> חומרת הפגיעה:</label>
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
                  disabled={item.isDefault == true}
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

export default Results;