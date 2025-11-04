
import type { Option } from "../Data";

type FormData = {
  typeActivity: Option;
  categoryoption: Option;
  eventDescription: string;
  eventSeverity: Option;
  location: Option;
  results: Option;
  injuryLevel: Option;
  subSubUnitInput: string;
  timeDate: string;
  weather: Option;
  typeUnitActivity: Option;
};

type Props = { allEvents: FormData[] };

function ObjectTable({ allEvents }: Props) {
  if (allEvents.length === 0) return <p>אין נתונים להצגה עדיין</p>;

  return (
    <table className="events-table" dir="rtl">
      <thead>
        <tr>
          <th>#</th>
          <th>תאריך ושעה</th>
          <th>מיקום</th>
          <th>פעילות הפרט</th>
          <th>קטגוריה</th>
          <th>חומרת האירוע</th>
          <th>פעילות היחידה</th>
          <th>מזג אוויר</th>
          <th>תיאור האירוע</th>
          <th>יחידות משנה</th>
          <th>תוצאות</th>
          <th>חומרת פגיעה</th>
        </tr>
      </thead>
      <tbody>
        {allEvents.map((event, i) => (
          <tr key={i}>
            <td style={{textAlign : "center"}}>
              {i + 1}</td>
            <td>{event.timeDate}</td>
            <td>{event.location?.label}</td>
            <td>{event.typeActivity?.label}</td>
            <td>{event.categoryoption?.label}</td>
            <td>{event.eventSeverity?.label}</td>
            <td>{event.typeUnitActivity?.label}</td>
            <td>{event.weather?.label}</td>
            <td>{event.eventDescription}</td>
            <td>{event.subSubUnitInput}</td>
            <td>{event.results?.label}</td>
            <td style={{ textAlign: event.injuryLevel?.label !== "בחר/י" ? "right" : "center" }}>
              {event.injuryLevel?.label && event.injuryLevel.label !== "בחר/י"
                ? event.injuryLevel.label
                : "-"}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default ObjectTable;
