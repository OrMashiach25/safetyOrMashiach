import { activityTypeArr} from "../Data";
import type { Option } from "../Data";

type Props = {
  value: Option; 
  onChange: (v: Option) => void 
};


function ActivityType({value, onChange}: Props) {

    return(
        <>
        <label htmlFor="activityType"> פעילות הפרט:</label> 
            <select
                id="activityType"
                value={value.value}
                onChange={(e) => {
                    const selected = activityTypeArr.find(it => it.value === e.target.value);
                    if (selected) onChange(selected);
                }}
            >
                {activityTypeArr.map((item, index) =>(
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
    );
}

export default ActivityType;
