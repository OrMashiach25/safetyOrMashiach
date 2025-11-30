import type { FormData } from "./eventFormConfig";
import { isCivilArea } from "./eventFormConfig";
import type { Option } from "../Data";
import ActivityType from "./Inputs/ActivityType";
import Category from "./Inputs/Category";
import DescriptionEvent from "./Inputs/DescriptionEvent";
import EventSeverity from "./Inputs/EventSeverity";
import LocationSelect from "./Inputs/Location";
import Results from "./Inputs/Results";
import SubSubUnitInput from "./Inputs/SubUnitInput";
import TimeAndDate from "./Inputs/TimeAndDate";
import Weather from "./Inputs/Weather";
import UnitActivityType from "./Inputs/UnitActivityType";

type EventFieldsProps = {
  formData: FormData;
  updateField: <K extends keyof FormData>(key: K, value: FormData[K]) => void;

  onCivilAreaSelected: (newLoc: Option) => void;
};

export function EventFields({ formData, updateField, onCivilAreaSelected }: EventFieldsProps) {
  return (
    <>
      <div className="field">
        <TimeAndDate
          value={formData.timeDate}
          onChange={(v: string) => updateField("timeDate", v)}
        />
      </div>

      <div className="field">
        <LocationSelect
          value={formData.location}
          onChange={(v) => {
            if (isCivilArea(v)) {

              onCivilAreaSelected(v);
            } else {
              updateField("location", v);
              updateField("civilAreaCoord", "");
            }
          }}
        />
      </div>

      <div className="field">
        <ActivityType
          value={formData.typeActivity}
          onChange={(v) => updateField("typeActivity", v)}
        />
      </div>

      <div className="field">
        <Category
          value={formData.categoryoption}
          onChange={(v) => updateField("categoryoption", v)}
        />
      </div>

      <div className="field">
        <EventSeverity
          value={formData.eventSeverity}
          onChange={(v) => updateField("eventSeverity", v)}
        />
      </div>

      <div className="field">
        <UnitActivityType
          value={formData.typeUnitActivity}
          onChange={(v) => updateField("typeUnitActivity", v)}
        />
      </div>

      <div className="field">
        <Weather
          value={formData.weather}
          onChange={(v) => updateField("weather", v)}
        />
      </div>

      <div className="field">
        <SubSubUnitInput
          value={formData.subSubUnitInput}
          onChange={(v) => updateField("subSubUnitInput", v)}
        />
      </div>

      <div className="results-wrapper">
        <Results
          value={formData.results}
          onChange={(v) => updateField("results", v)}
          injuryLevel={formData.injuryLevel}
          onChangeInjury={(v) => updateField("injuryLevel", v)}
        />
      </div>

      <div className="field">
        <DescriptionEvent
          value={formData.eventDescription}
          onChange={(v) => updateField("eventDescription", v)}
        />
      </div>
    </>
  );
}
