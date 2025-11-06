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

type SortDir = "asc" | "desc";
type Column = {
  header: string;
  key?: ColKey;        
  sortable?: boolean;  
  isIndex?: boolean;  
};

const COLUMNS: Column[] = [
  { header: 'מס"ד', isIndex: true },
  { header: "תאריך ושעה", key: "timeDate", sortable: true },
  { header: "מיקום", key: "location", sortable: true },
  { header: "פעילות הפרט", key: "typeActivity", sortable: true },
  { header: "קטגוריה", key: "categoryoption", sortable: true },
  { header: "חומרת האירוע", key: "eventSeverity", sortable: true },
  { header: "פעילות היחידה", key: "typeUnitActivity", sortable: true },
  { header: "מזג אוויר", key: "weather", sortable: true },
  { header: "תיאור האירוע", key: "eventDescription" },
  { header: "יחידות משנה", key: "subSubUnitInput" },
  { header: "תוצאות", key: "results", sortable: true },
  { header: "חומרת הפגיעה", key: "injuryLevel", sortable: true },
];

function ObjectTable({ allEvents }: Props) {
  const [sortKey, setSortKey] = useState<ColKey | null>(null);
  const [sortDir, setSortDir] = useState<SortDir>("asc");

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

      if (sortKey === "timeDate") {
        const da = Date.parse(va);
        const db = Date.parse(vb);
        return sortDir === "asc" ? da - db : db - da;
      }

      const cmp = va.localeCompare(vb, "he");
      return sortDir === "asc" ? cmp : -cmp;
    });
  }, [allEvents, sortKey, sortDir]);

return (
    <table className="events-table" dir="rtl">
      <thead>
        <tr>
          {COLUMNS.map((col, idx) => (
            <th key={idx}>
              <span style={{ display: "inline-flex", gap: 3, alignItems: "center" }}>
                {col.header}
                {col.sortable && col.key && (
                  col.key === sortKey ? (
                    <button
                      type="button"
                      onClick={() => {
                        setSortKey(null);
                        setSortDir("asc");
                      }}
                      title="בטל מיון"
                      style={{
                        border: "none",
                        background: "transparent",
                        padding: 0,
                        cursor: "pointer",
                        fontSize: 12,
                      }}
                    >
                      {sortDir === "asc" ? "↑" : "↓"}
                    </button>
                  ) : (
                    <span style={{ display: "inline-flex", gap: 6, alignItems: "center" }}>
                      <button
                        type="button"
                        onClick={() => sortBy(col.key!, "asc")}
                        title="מיין ↑"
                        style={{ border: "none", background: "transparent", padding: 0, cursor: "pointer", fontSize: 12 }}
                      >
                        ↑
                      </button>
                      <button
                        type="button"
                        onClick={() => sortBy(col.key!, "desc")}
                        title="מיין ↓"
                        style={{ border: "none", background: "transparent", padding: 0, cursor: "pointer", fontSize: 12 }}
                      >
                        ↓
                      </button>
                    </span>
                  )
                )}
              </span>
            </th>
          ))}
        </tr>
      </thead>

      <tbody>
        {displayedRows.map((row, i) => (
          <tr key={i}>
            {COLUMNS.map((col, j) => {
              if (col.isIndex) {
                return (
                  <td key={j} style={{ textAlign: "center" }}>
                    {i + 1}
                  </td>
                );
              }

              if (!col.key) return <td key={j} />;

              if (col.key === "injuryLevel") {
                const lbl = row.injuryLevel?.label;
                const showDash = !lbl || lbl === "בחר/י";
                return (
                  <td key={j} style={{ textAlign: showDash ? "center" : "right" }}>
                    {showDash ? "-" : lbl}
                  </td>
                );
              }

              return <td key={j}>{getVal(row, col.key)}</td>;
            })}
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default ObjectTable;
