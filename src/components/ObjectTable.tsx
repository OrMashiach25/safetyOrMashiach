import { useMemo, useState } from "react";
import type { Option } from "../Data";
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, IconButton, Tooltip } from "@mui/material";
import PlaceIcon from "@mui/icons-material/Place";
import { INDEX_LABEL,TIME_DATE_LABEL ,LOCATION_LABEL ,TYPE_ACTIVITY_LABEL ,
    CATEGORY_OPTION_LABEL ,TYPE_UNIT_ACTIVITY_LABEL ,WEATHER_LABEL ,EVENT_DESCRIPTION_LABEL ,
    SUB_SUBUNIY_INPUT_LABEL ,RESULTS_LABEL ,EVENT_SEVERITY_LABEL ,INJURY_LEVEL_LABEL } from "../labels";

type FormData = {
  typeActivity: Option;
  categoryoption: Option;
  eventDescription: string;
  eventSeverity: Option;
  location: Option;
  civilAreaCoord?: string;
  results: Option;
  injuryLevel: Option;
  subSubUnitInput: string;
  timeDate: string;
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
  { header: INDEX_LABEL, isIndex: true },
  { header: TIME_DATE_LABEL, key: "timeDate", sortable: true },
  { header: LOCATION_LABEL, key: "location", sortable: true },
  { header: TYPE_ACTIVITY_LABEL, key: "typeActivity", sortable: true },
  { header: CATEGORY_OPTION_LABEL, key: "categoryoption", sortable: true },
  { header: EVENT_SEVERITY_LABEL, key: "eventSeverity", sortable: true },
  { header: TYPE_UNIT_ACTIVITY_LABEL, key: "typeUnitActivity", sortable: true },
  { header: WEATHER_LABEL, key: "weather", sortable: true },
  { header: EVENT_DESCRIPTION_LABEL, key: "eventDescription" },
  { header: SUB_SUBUNIY_INPUT_LABEL, key: "subSubUnitInput" },
  { header: RESULTS_LABEL, key: "results", sortable: true },
  { header: INJURY_LEVEL_LABEL, key: "injuryLevel", sortable: true },
];

function ObjectTable({ allEvents }: Props) {
  const [sortKey, setSortKey] = useState<ColKey | null>(null);
  const [sortDir, setSortDir] = useState<SortDir>("asc");

  const [coordViewOpen, setCoordViewOpen] = useState(false);
  const [coordToView, setCoordToView] = useState<string>("");

   function isCivilArea(opt: Option | undefined | null) {
      if (!opt) return false;
      return opt.label === "שטח אזרחי" || opt.value === "civilian_area" || opt.value === "civil_area";
  }

  function getVal(row: FormData, key: ColKey): string {
    const v: any = row[key as keyof FormData];
    if (v === null) return "";
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
  <>
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
              if (col.key === "location") {
                  const label = getVal(row, "location");
                  const showIcon = isCivilArea(row.location) && !!row.civilAreaCoord;
                  return (
                    <td key={j}>
                      <span style={{ display: "inline-flex", gap: 6, alignItems: "center" }}>
                        <span>{label}</span>
                        {showIcon && (
                          <Tooltip title="הצגת נ״צ">
                            <IconButton
                              size="small"
                              onClick={() => {
                                setCoordToView(row.civilAreaCoord!);
                                setCoordViewOpen(true);
                              }}
                              aria-label="show-coord"
                            >
                              <PlaceIcon fontSize="small" />
                            </IconButton>
                          </Tooltip>
                        )}
                      </span>
                    </td>
                  );
                }

              return <td key={j}>{getVal(row, col.key)}</td>;
            })}
          </tr>
        ))}
      </tbody>
    </table>

      <Dialog open={coordViewOpen} onClose={() => setCoordViewOpen(false)} dir="rtl">
          <DialogTitle>נ״צ (תצוגה בלבד)</DialogTitle>
              <DialogContent>
                <div style={{ fontFamily: "monospace", fontSize: 16, direction: "ltr", marginTop: 6 }}>
                  {coordToView}
                </div>
              </DialogContent>
              <DialogActions>
                <Button onClick={() => setCoordViewOpen(false)} variant="contained">סגור</Button>
              </DialogActions>
      </Dialog>
    </>
  );
}

export default ObjectTable;
