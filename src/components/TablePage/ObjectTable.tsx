import { useMemo, useState } from "react";
import type { Option } from "../../Data";
import {Dialog, DialogTitle, DialogContent, DialogActions, Button, IconButton, Tooltip} from "@mui/material";
import PlaceIcon from "@mui/icons-material/Place";
import EditRoundedIcon from "@mui/icons-material/EditRounded";
import DeleteForeverRoundedIcon from "@mui/icons-material/DeleteForeverRounded";
import { INDEX_LABEL, TIME_DATE_LABEL, LOCATION_LABEL, TYPE_ACTIVITY_LABEL, CATEGORY_OPTION_LABEL,
  TYPE_UNIT_ACTIVITY_LABEL, WEATHER_LABEL, EVENT_DESCRIPTION_LABEL, SUB_SUBUNIY_INPUT_LABEL, RESULTS_LABEL,
  EVENT_SEVERITY_LABEL, INJURY_LEVEL_LABEL} from "../../labels";
import {activityTypeArr, categoryArr, eventSeverityArr, locationArr, resultsArr, injuriesLevelArr,
  unitActivityTypeArr, weatherArr} from "../../Data"


export type TableEvent = {
  Index: number;
  typeActivity: Option | string;
  categoryoption: Option | string;
  eventDescription: string;
  eventSeverity: Option | string;
  location: Option | string;
  civilAreaCoord?: string;
  results: Option | string;
  injuryLevel: Option | string;
  subSubUnitInput: string;
  timeDate?: string;
  Date?: string;
  weather: Option | string;
  typeUnitActivity: Option | string;
};

type Props = {
  allEvents: TableEvent[];
  onDelete: (id: number) => void;
  onEdit: (event: TableEvent) => void;
};

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

const makeValueMap = (opts: Option[]) =>
  Object.fromEntries(opts.map((o) => [String(o.value), String(o.label)]));

const VALUE_MAPS = {
  location: makeValueMap(locationArr),
  typeActivity: makeValueMap(activityTypeArr),
  categoryoption: makeValueMap(categoryArr),
  eventSeverity: makeValueMap(eventSeverityArr),
  typeUnitActivity: makeValueMap(unitActivityTypeArr),
  weather: makeValueMap(weatherArr),
  results: makeValueMap(resultsArr),
  injuryLevel: makeValueMap(injuriesLevelArr),
} as const;



function ObjectTable({ allEvents, onDelete, onEdit }: Props) {
  const [sortKey, setSortKey] = useState<ColKey | null>(null);
  const [sortDir, setSortDir] = useState<SortDir>("asc");

  const [coordViewOpen, setCoordViewOpen] = useState(false);
  const [coordToView, setCoordToView] = useState<string>("");

  function isCivilArea(opt: Option | string | undefined | null) {
    if (!opt) return false;

    if (typeof opt === "string") {
      return opt === "civilian_area" || opt === "civil_area" || opt === "שטח אזרחי";
    }

    return (
      opt.label === "שטח אזרחי" ||
      opt.value === "civilian_area" ||
      opt.value === "civil_area"
    );
  }

  function getVal(row: TableEvent, key: ColKey): string {
    if (key === "timeDate") {
      const raw = row.timeDate ?? row.Date ?? "";
      return String(raw);
    }

    const v: any = (row as any)[key];
    if (v == null) return "";

    if (typeof v === "object" && ("label" in v || "value" in v)) {
      return String(v.label ?? v.value ?? "");
    }

    const str = String(v);
    const map = (VALUE_MAPS as any)[key];
    if(map && map[str]){
      return map[str];
    }

    return str;
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
            <th style={{ width: 90 }}>פעולות</th>

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

              <td className="events-table-actions">
                <span className="events-table-actions-buttons">
                  <IconButton
                    size="small"
                    onClick={() => onEdit(row)}
                    aria-label="edit"
                  >
                    <EditRoundedIcon />
                  </IconButton>

                  <IconButton
                    size="small"
                    onClick={() => onDelete(row.Index)}
                    aria-label="delete"
                    style={{ marginLeft: 6 }}
                  >
                    <DeleteForeverRoundedIcon />
                  </IconButton>
                </span>
              </td>

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
                  const lbl = getVal(row,"injuryLevel");
                  const showDash = !lbl || lbl === "בחר/י";

                  return (
                    <td key={j} style={{ textAlign: showDash ? "center" : "right" }}>
                      {showDash ? "-" : lbl}
                    </td>
                  );
                }

                if (col.key === "location") {
                  const label= getVal (row, "location");
                  const showIcon = isCivilArea(row.location);

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
          <div
            style={{
              fontFamily: "monospace",
              fontSize: 16,
              direction: "ltr",
              marginTop: 6,
            }}
          >
            {coordToView}
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setCoordViewOpen(false)} variant="contained">
            סגור
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default ObjectTable;
