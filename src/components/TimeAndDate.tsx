
function timeAndDate() {
    return(
      <label>
        תאריך ושעה:
        <input type="datetime-local" 
        max={new Date().toISOString().slice(0,16)}
        />
      </label>
    );
}
export default timeAndDate;