import { useState } from "react";


function subSubUnitInput () {
    const [unit, setUnit ]= useState("");
    const [error, setError] = useState("");

    function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
        const value= e.target.value;
        const regex = /^[א-תa-zA-Z\s-]*$/;

        if (regex.test(value)){
            setUnit(value);
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
            value={unit}
            onChange={handleChange}
            />
            {error && <p style={{color:"red"}}>{error}</p>}
        </label>
    );
}

export default subSubUnitInput;