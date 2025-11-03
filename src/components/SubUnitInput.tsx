import { useState } from "react";
type Props = {
  value: string; 
  onChange: (v: string) => void 
};

function subSubUnitInput ({value, onChange}: Props) {
    const [error, setError] = useState("");

    function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
        const neweValue= e.target.value;
        const regex = /^[א-תa-zA-Z\s-]*$/;

        if (regex.test(neweValue)){
            onChange(neweValue);
            setError("");
        } else {
            setError ("ערך לא תקין");
        }
    }

    return(
        <label>
            יחידות משנה:
            <input 
            type="text" 
            placeholder="טקסט חופשי"
            value={value}
            onChange={handleChange}
            />
            {error && <p style={{color:"red"}}>{error}</p>}
        </label>
    );
}

export default subSubUnitInput;