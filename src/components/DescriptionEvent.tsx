
type Props = {
  value: string; 
  onChange: (v: string) => void 
};

function descriptionEvent ({value, onChange}: Props) {
    function handleChange(e: React.ChangeEvent<HTMLTextAreaElement>) {
        const newValue = e.target.value;
        const regex = /^[א-תa-zA-Z0-9\s.,!?'"()-]*$/;
        if (regex.test(newValue) && newValue.length <= 800) {
        onChange(newValue);
        }
    }
    return(
        <label>
            תיאור האירוע:
            <textarea 
            rows={3} 
            placeholder="עד 800 תווים" 
            value={value}
            onChange={handleChange}>
            </textarea>
        </label>
    );
}
export default descriptionEvent;