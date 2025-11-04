import { useMemo, useState } from "react";
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
  timeDate: string; // ISO
  weather: Option;
  typeUnitActivity: Option;
};

type Props = { allEvents: FormData[] };

type ColKey =
  | "timeDate"
  | "location"
  | "typeActivity"
  | "categoryoption"
  | "eventSeverity"
  | "typeUnitActivity"
  | "weather"
  | "eventDescription"
  | "subSubUnitInput"
  | "results"
  | "injuryLevel";

function ObjectTable({ allEvents }: Props) {
  
  type SortDir = "asc" | "desc";
  const [sortKey, setSortKey] = useState<ColKey | null>(null);
  const [sortDir, setSortDir] = useState<SortDir>("asc");

  // להוציא מחרוזת להשוואה (כולל Option עם label/value)
  function getVal(row: FormData, key: ColKey): string {
    const v: any = row[key as keyof FormData];
    if (v == null) return "";
    if (typeof v === "object" && ("label" in v || "value" in v)) {
      return String(v.label ?? v.value ?? "");
    }
    return String(v);
  }

  function sortBy(key: ColKey, dir: SortDir) {
    setSortKey(key);
    setSortDir(dir);
  }

  const displayedRows = useMemo(() => {
    if (!sortKey) return allEvents;

    return [...allEvents].sort((a, b) => {
      const va = getVal(a, sortKey);
      const vb = getVal(b, sortKey);

      // תאריך/שעה
      if (sortKey === "timeDate") {
        const da = Date.parse(va);
        const db = Date.parse(vb);
        return sortDir === "asc" ? da - db : db - da;
      }

      // טקסט (כולל עברית)
      const cmp = va.localeCompare(vb, "he");
      return sortDir === "asc" ? cmp : -cmp;
    });
  }, [allEvents, sortKey, sortDir]);

  // קומפוננטה קטנה לכותרת עם חצים
  const TH = ({
    label,
    col,
  }: {
    label: string;
    col: ColKey;
  }) => (
    <th>
      <span style={{ display: "inline-flex", gap: 3, alignItems: "center" }}>
        {label}
        <span style={{ display: "inline-flex", flexDirection: "row", gap: 6, alignItems: "center" }}>

          <button
            type="button"
            onClick={() => sortBy(col, "asc")}
            title="מיין ↑"
            style={{
              border: "none",
              background: "transparent",
              padding: 0,
              cursor: "pointer",
              fontSize: 12,
              fontWeight: sortKey === col && sortDir === "asc" ? 700 : 400,
            }}
          >
            ↑
          </button>
          <button
            type="button"
            onClick={() => sortBy(col, "desc")}
            title="מיין ↓"
            style={{
              border: "none",
              background: "transparent",
              padding: 0,
              cursor: "pointer",
              fontSize: 12,
              fontWeight: sortKey === col && sortDir === "desc" ? 700 : 400,
            }}
          >
            ↓
          </button>
        </span>
      </span>
    </th>
  );

  return (
    <table className="events-table" dir="rtl">
      <thead>
        <tr>
          <th>#</th>
          <TH label="תאריך ושעה" col="timeDate" />
          <TH label="מיקום" col="location" />
          <TH label="פעילות הפרט" col="typeActivity" />
          <TH label="קטגוריה" col="categoryoption" />
          <TH label="חומרת האירוע" col="eventSeverity" />
          <TH label="פעילות היחידה" col="typeUnitActivity" />
          <TH label="מזג אוויר" col="weather" />
          <th>תיאור האירוע</th>
          <th>יחידות משנה</th>
          <TH label="תוצאות" col="results" />
          <TH label="חומרת הפגיעה" col="injuryLevel" />
        </tr>
      </thead>

      <tbody>
        {displayedRows.map((event, i) => (
          <tr key={i}>
            <td style={{ textAlign: "center" }}>{i + 1}</td>
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
            <td
              style={{
                textAlign:
                  event.injuryLevel?.label !== "בחר/י" ? "right" : "center",
              }}
            >
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
