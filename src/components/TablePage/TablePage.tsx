import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import {Dialog, DialogTitle, DialogContent, DialogActions, TextField, MenuItem } from "@mui/material";
import ObjectTable from "../ObjectTable";
import type { TableEvent } from "../ObjectTable";
import {TIME_DATE_LABEL, LOCATION_LABEL, TYPE_ACTIVITY_LABEL, CATEGORY_OPTION_LABEL, EVENT_SEVERITY_LABEL, TYPE_UNIT_ACTIVITY_LABEL,
  WEATHER_LABEL, EVENT_DESCRIPTION_LABEL, SUB_SUBUNIY_INPUT_LABEL, RESULTS_LABEL, INJURY_LEVEL_LABEL} from "../../labels";
import {fetchEvents, deleteEvent, updateEvent, type EventPayload } from "../../api/eventsApi";
import type { Option } from "../../Data";
import {activityTypeArr, categoryArr, eventSeverityArr, locationArr, resultsArr, injuriesLevelArr,
  unitActivityTypeArr, weatherArr} from "../../Data"
import "../TablePage/TablePage.css"

type EditFieldKey =
  | "Date"
  | "location"
  | "typeActivity"
  | "categoryoption"
  | "eventSeverity"
  | "typeUnitActivity"
  | "weather"
  | "eventDescription"
  | "subSubUnitInput"
  | "results"
  | "injuryLevel"
  | "civilAreaCoord";

type EditValues = Record<EditFieldKey, string>;

const EDIT_FIELDS: { key: EditFieldKey; label: string; multiline?: boolean }[] = [
  { key: "Date", label: TIME_DATE_LABEL },
  { key: "location", label: LOCATION_LABEL },
  { key: "typeActivity", label: TYPE_ACTIVITY_LABEL },
  { key: "categoryoption", label: CATEGORY_OPTION_LABEL },
  { key: "eventSeverity", label: EVENT_SEVERITY_LABEL },
  { key: "typeUnitActivity", label: TYPE_UNIT_ACTIVITY_LABEL },
  { key: "weather", label: WEATHER_LABEL },
  { key: "eventDescription", label: EVENT_DESCRIPTION_LABEL, multiline: true },
  { key: "subSubUnitInput", label: SUB_SUBUNIY_INPUT_LABEL },
  { key: "results", label: RESULTS_LABEL },
  { key: "injuryLevel", label: INJURY_LEVEL_LABEL },
  { key: "civilAreaCoord", label: "נ״צ" },
];

const FIELD_OPTIONS: Partial<Record<EditFieldKey, Option[]>> = {
  location: locationArr,
  typeActivity: activityTypeArr,
  categoryoption: categoryArr,
  eventSeverity: eventSeverityArr,
  typeUnitActivity: unitActivityTypeArr,
  weather: weatherArr,
  results: resultsArr,
  injuryLevel: injuriesLevelArr,
};

function NewPage() {
  const navigate = useNavigate();
  const [eventsFromServer, setEventsFromServer] = useState<TableEvent[]>([]);

  const [editOpen, setEditOpen] = useState(false);
  const [eventBeingEdited, setEventBeingEdited] = useState<TableEvent | null>(
    null
  );
  const [editValues, setEditValues] = useState<EditValues>(() => {
    const empty = {} as EditValues;
    EDIT_FIELDS.forEach((f) => {
      empty[f.key] = "";
    });
    return empty;
  });

  useEffect(() => {
    async function loadEvents() {
      try {
        const data = await fetchEvents();
        setEventsFromServer(data as TableEvent[]);
      } catch (err) {
        console.error("Error fetching events", err);
      }
    }

    loadEvents();
  }, []);

  function goBack() {
    navigate(-1);
  }

  function normalizeField(v: any): string {
    if (!v) return "";
    if (typeof v === "string") return v;
    if (typeof v === "object") {
      return (v.value ?? v.label ?? "") as string;
    }
    return String(v);
  }

  function tableEventToPayload(ev: TableEvent): EventPayload {
    return {
      Date: ev.Date ?? ev.timeDate ?? "",
      location: normalizeField(ev.location),
      typeActivity: normalizeField(ev.typeActivity),
      categoryoption: normalizeField(ev.categoryoption),
      eventSeverity: normalizeField(ev.eventSeverity),
      typeUnitActivity: normalizeField(ev.typeUnitActivity),
      weather: normalizeField(ev.weather),
      eventDescription: ev.eventDescription,
      subSubUnitInput: ev.subSubUnitInput,
      results: normalizeField(ev.results),
      injuryLevel: normalizeField(ev.injuryLevel),
      civilAreaCoord: ev.civilAreaCoord,
    };
  }

  async function handleDelete(id: number) {
    try {
      await deleteEvent(id);
      setEventsFromServer((prev) => prev.filter((ev) => ev.Index !== id));
    } catch (err) {
      console.error("Error deleting event", err);
      alert("הייתה בעיה במחיקת האירוע מהשרת");
    }
  }

  function handleEdit(row: TableEvent) {
    setEventBeingEdited(row);

    const initial = {} as EditValues;

    EDIT_FIELDS.forEach((field) => {
      if (field.key === "Date") {
        initial.Date = (row.Date ?? row.timeDate ?? "") as string;
      } else if (field.key === "civilAreaCoord") {
        initial.civilAreaCoord = row.civilAreaCoord ?? "";
      } else{
        const value = (row as any)[field.key];
        initial[field.key] = normalizeField(value);
      }
    });

    setEditValues(initial);
    setEditOpen(true);
  }


  async function handleEditSave() {
    if (!eventBeingEdited) return;


    const updatedEvent: TableEvent = {
      ...eventBeingEdited,
      Date: editValues.Date,
      timeDate: editValues.Date,
      location: editValues.location,
      typeActivity: editValues.typeActivity,
      categoryoption: editValues.categoryoption,
      eventSeverity: editValues.eventSeverity,
      typeUnitActivity: editValues.typeUnitActivity,
      weather: editValues.weather,
      eventDescription: editValues.eventDescription,
      subSubUnitInput: editValues.subSubUnitInput,
      results: editValues.results,
      injuryLevel: editValues.injuryLevel,
      civilAreaCoord: editValues.civilAreaCoord,
    };

    const payload = tableEventToPayload(updatedEvent);

    try {
      const fromServer = await updateEvent(eventBeingEdited.Index, payload);

      setEventsFromServer((prev) =>
        prev.map((ev) =>
          ev.Index === fromServer.Index ? (fromServer as TableEvent) : ev
        )
      );

      setEditOpen(false);
      setEventBeingEdited(null);
    } catch (err) {
      console.error("Error updating event", err);
      alert("הייתה בעיה בעדכון האירוע בשרת");
    }
  }

  function handleEditCancel() {
    setEditOpen(false);
    setEventBeingEdited(null);
  }
function isCivilAreaValue(loc: string) {
  return (

    loc === "civilian_area" || 
    loc === "שטח אזרחי"
  );
}

return (
  <div dir="rtl" style={{ textAlign: "center", margin: 25 }}>
    <Button
      variant="contained"
      color="primary"
      onClick={goBack}
      style={{ display: "block" }}
    >
      חזרה לעמוד הקודם
    </Button>

    <h2 className="table-page-title">טבלת סיכום אירועים</h2>

    <ObjectTable
      allEvents={eventsFromServer}
      onDelete={handleDelete}
      onEdit={handleEdit}
    />

    <Dialog open={editOpen} onClose={handleEditCancel} dir="rtl" fullWidth>
      <DialogTitle>עריכת אירוע</DialogTitle>
      <DialogContent>
        {EDIT_FIELDS.map((field) => {
          const value = editValues[field.key] ?? "";
          const selectOptions = FIELD_OPTIONS[field.key];

          if (field.key === "civilAreaCoord") {
            return (
              <TextField
                className="edit-field"
                key={field.key}
                label={field.label}
                fullWidth
                margin="dense"
                variant="outlined"
                slotProps={{
                  inputLabel: { shrink: true },
                }}
                value={value}
                disabled={!isCivilAreaValue(editValues.location)}
                onChange={(e) =>
                  setEditValues((prev) => ({
                    ...prev,
                    [field.key]: e.target.value,
                  }))
                }
              />
            );
          }

          if (selectOptions && selectOptions.length > 0) {
            return (
              <TextField
                className="edit-field"
                key={field.key}
                label={field.label}
                fullWidth
                margin="dense"
                variant="outlined"
                select
                slotProps={{
                  inputLabel: { shrink: true },
                }}
                value={value}
                onChange={(e) =>
                  setEditValues((prev) => ({
                    ...prev,
                    [field.key]: e.target.value,
                  }))
                }
              >
                {selectOptions.map((opt) => (
                  <MenuItem key={opt.value} value={opt.value}>
                    {opt.label}
                  </MenuItem>
                ))}
              </TextField>
            );
          }

          return (
            <TextField
              className="edit-field"
              key={field.key}
              label={field.label}
              fullWidth
              margin="dense"
              variant="outlined"
              multiline={field.multiline}
              slotProps={{
                inputLabel: { shrink: true },
              }}
              value={value}
              onChange={(e) =>
                setEditValues((prev) => ({
                  ...prev,
                  [field.key]: e.target.value,
                }))
              }
            />
          );
        })}
      </DialogContent>
      <DialogActions>
        <Button onClick={handleEditCancel}>ביטול</Button>
        <Button onClick={handleEditSave} variant="contained">
          שמור
        </Button>
      </DialogActions>
    </Dialog>
  </div>
);
}

export default NewPage;
