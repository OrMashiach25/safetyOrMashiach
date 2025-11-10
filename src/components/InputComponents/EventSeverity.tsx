import { eventSeverityArr} from "../../Data";
import type { Option } from "../../Data";

type Props = {
  value: Option; 
  onChange: (v: Option) => void 
};

function EventSeverity({value, onChange}: Props) {

    return(
        <>
        <label htmlFor="eventSeverity"> חומרת האירוע:</label>
        <select
            id="eventSeverity"
            value = {value.value}
            onChange ={(e) => {
                const selected = eventSeverityArr.find(it => it.value === e.target.value);
                if (selected) onChange(selected);
            }}
        >
            {eventSeverityArr.map((item, index) =>(
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
        </>
    );
}

export default EventSeverity;