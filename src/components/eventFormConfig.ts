import type { Option } from "../Data";
import type { EventPayload } from "../api/eventsApi";

export type FormData = {
  typeActivity: Option;
  categoryoption: Option;
  eventDescription: string;
  eventSeverity: Option;
  location: Option;
  civilAreaCoord: string;
  results: Option;
  injuryLevel: Option;
  subSubUnitInput: string;
  timeDate: string;
  weather: Option;
  typeUnitActivity: Option;
};

export const initialFormData: FormData = {
  typeActivity: { value: "", label: "בחר/י" },
  categoryoption: { value: "", label: "בחר/י" },
  eventDescription: "",
  eventSeverity: { value: "", label: "בחר/י" },
  location: { value: "", label: "בחר/י" },
  civilAreaCoord: "",
  results: { value: "", label: "בחר/י" },
  injuryLevel: { value: "", label: "בחר/י" },
  subSubUnitInput: "",
  timeDate: "",
  weather: { value: "", label: "בחר/י" },
  typeUnitActivity: { value: "", label: "בחר/י" },
};

export function normalizeCoord(v: string) {
  const m = v.match(/\d{6}/g);
  if (!m || m.length < 2) return null;
  return `(${m[0]},${m[1]})`;
}

export function isCivilArea(opt: Option) {
  return opt.label === "שטח אזרחי" || opt.value === "civilian_area";
}

export function validateCoord(v: string) {
  const patt = /^\s*\(\d{6},\s*\d{6}\)\s*$/;
  return patt.test(v);
}

export function buildEventPayload(formData: FormData): EventPayload {
  return {
    Date: formData.timeDate,
    location: formData.location.value,
    typeActivity: formData.typeActivity.value,
    categoryoption: formData.categoryoption.value,
    eventSeverity: formData.eventSeverity.value,
    typeUnitActivity: formData.typeUnitActivity.value,
    weather: formData.weather.value,
    eventDescription: formData.eventDescription,
    subSubUnitInput: formData.subSubUnitInput,
    results: formData.results.value,
    injuryLevel: formData.injuryLevel.value,
    civilAreaCoord: formData.civilAreaCoord,
  };
}

export type EditFieldKey =
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

export type EditFieldConfig = {
  key: EditFieldKey;
  label: string;
  multiline?: boolean;
};

export const EDIT_FIELDS: EditFieldConfig[] = [
  { key: "Date", label: "תאריך ושעה" },
  { key: "location", label: "מיקום" },
  { key: "typeActivity", label: "סוג פעילות" },
  { key: "categoryoption", label: "קטגוריה" },
  { key: "eventSeverity", label: "חומרת האירוע" },
  { key: "typeUnitActivity", label: "סוג פעילות היחידה" },
  { key: "weather", label: "מזג אוויר" },
  { key: "subSubUnitInput", label: "תת־תת יחידה" },
  { key: "results", label: "תוצאה" },
  { key: "injuryLevel", label: "חומרת פגיעה" },
  { key: "eventDescription", label: "תיאור האירוע", multiline: true },
  { key: "civilAreaCoord", label: "נ״צ לשטח אזרחי" },
];
