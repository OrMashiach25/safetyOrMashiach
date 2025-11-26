import { TextField } from "@mui/material";
import { EVENT_DESCRIPTION_LABEL } from "../../labels";
type Props = {
  value: string; 
  onChange: (v: string) => void 
};

function DescriptionEvent ({value, onChange}: Props) {
    function handleChange(e: React.ChangeEvent<HTMLTextAreaElement>) {
        const newValue = e.target.value;
        const regex = /^[א-תa-zA-Z0-9\s.,!?'"()-]*$/;
        if (regex.test(newValue) && newValue.length <= 800) {
        onChange(newValue);
        }
    }
    return(
        <div className="fieldfield--wide">
            <TextField
                label= {EVENT_DESCRIPTION_LABEL}
                variant = "outlined"
                multiline
                rows = {2}
                placeholder="עד 800 תווים" 
                value={value}
                onChange={handleChange}
                sx={{ width: "100%"}}
                slotProps={{
                    input: { dir: "rtl", style: { textAlign: "right" } },
                }}
            />
        </div>
    );
}
export default DescriptionEvent;