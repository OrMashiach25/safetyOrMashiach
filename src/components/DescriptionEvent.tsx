import { useState } from "react";

function descriptionEvent () {
    const [description, setDescription] = useState("");
    function handleChange(e: React.ChangeEvent<HTMLTextAreaElement>) {
        const value = e.target.value;
        const regex = /^[א-תa-zA-Z0-9\s.,!?'"()-]*$/;
        if (regex.test(value) && value.length <= 800) {
        setDescription(value);
    }
}

    return(
        <label>
            תיאור האירוע:
            <textarea rows={3} placeholder="עד 800 תווים" value={description} onChange={handleChange}>
            </textarea>
        </label>

    );
}

export default descriptionEvent;