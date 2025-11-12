import { TIME_DATE_LABEL } from "../../labels"
type Props = {
  value: string;
  onChange: (v: string) => void;
};

function TimeAndDate({value, onChange}: Props) {
    return(
      <>
          <label> {TIME_DATE_LABEL} :</label>
        <input 
        type="datetime-local" 
        value={value}
        max={new Date().toISOString().slice(0,16)}
        onChange={(e) => onChange(e.target.value)}
        />
      </>
    );
}
export default TimeAndDate;