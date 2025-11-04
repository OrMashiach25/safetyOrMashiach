import { TextField } from "@mui/material";

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
        <TextField
            label= "תיאור האירוע:"
            variant = "outlined"
            multiline
            rows = {3}
            placeholder="עד 800 תווים" 
            value={value}
            onChange={handleChange}
            fullWidth
            sx={{ display: "block",mt: 2,maxWidth: 250}}
            slotProps={{
                input: { dir: "rtl", style: { textAlign: "right" } },
            }}
          
        />
    );
}
export default DescriptionEvent;