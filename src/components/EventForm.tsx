import { useState } from "react";
import type { Option } from "../Data";
import ActivityType from "./ActivityType";
import Category from "./Category";
import DescriptionEvent from "./DescriptionEvent";
import EventSeverity from "./EventSeverity";
import LocationSelect from "./Location";
import Results from "./Results";
import SubSubUnitInput from "./SubUnitInput";
import TimeAndDate from "./TimeAndDate";
import Weather from "./Weather";
import UnitActivityType from "./UnitActivityType";
import ObjectTable from "./ObjectTable";


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
}

function EventForm() {
    const [allEvents, setAllEvents] = useState<FormData[]>([]);
    const [formData, setFormData] = useState<FormData>({
    typeActivity:{ value: "", label: "בחר/י" },
    categoryoption:{ value: "", label: "בחר/י" },
    eventDescription:"", 
    eventSeverity:{ value: "", label: "בחר/י" },
    location:{ value: "", label: "בחר/י" },
    results:{ value: "", label: "בחר/י" },
    injuryLevel:{ value: "", label: "בחר/י" },
    subSubUnitInput: "",
    timeDate:"",
    weather:{ value: "", label: "בחר/י" },
    typeUnitActivity:{ value: "", label: "בחר/י" }
    });

    function updateField<K extends keyof FormData>(key: K, value: FormData[K]) {
        setFormData(prev => ({ ...prev, [key]: value }));
    }
    function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        console.log("Submitting:", formData);
        setAllEvents(prev => [...prev, formData]);
        setFormData({
        typeActivity:{ value: "", label: "בחר/י" },
        categoryoption:{ value: "", label: "בחר/י" },
        eventDescription:"", 
        eventSeverity:{ value: "", label: "בחר/י" },
        location:{ value: "", label: "בחר/י" },
        results:{ value: "", label: "בחר/י" },
        injuryLevel:{ value: "", label: "בחר/י" },
        subSubUnitInput: "",
        timeDate:"",
        weather:{ value: "", label: "בחר/י" },
        typeUnitActivity:{ value: "", label: "בחר/י" }
        });

    }

    return (
        <>
            <form onSubmit={handleSubmit}>
                <TimeAndDate
                value={formData.timeDate}
                onChange={(v: string) => updateField("timeDate", v)}
                />
                <LocationSelect
                value={formData.location}
                onChange={(v) => updateField("location", v)}
                />
                <ActivityType
                value={formData.typeActivity}
                onChange={(v) => updateField("typeActivity", v)}
                />
                <Category
                value={formData.categoryoption}
                onChange={(v) => updateField("categoryoption", v)}
                />
                <EventSeverity
                value={formData.eventSeverity}
                onChange={(v) => updateField("eventSeverity", v)}
                />
                <UnitActivityType
                value={formData.typeUnitActivity}
                onChange={(v) => updateField("typeUnitActivity", v)}
                />
                <Weather
                value={formData.weather}
                onChange={(v) => updateField("weather", v)}
                />
                <DescriptionEvent
                value={formData.eventDescription}
                onChange={(v) => updateField("eventDescription", v)}
                />
                <SubSubUnitInput
                value={formData.subSubUnitInput}
                onChange={(v) => updateField("subSubUnitInput", v)}
                />
                <Results
                value={formData.results}
                onChange={(v) => updateField("results", v)}
                injuryLevel={formData.injuryLevel}
                onChangeInjury={(v) => updateField("injuryLevel", v)}
                />

                <button type="submit">שליחה</button>
            </form>
            <ObjectTable allEvents={allEvents} />
        </>
    );

}

export default EventForm;
