import { useNavigate } from "react-router-dom";
import { useState } from "react";
import type { Option } from "../Data";
import { Button } from "@mui/material";
import ActivityType from "./InputComponents/ActivityType";
import Category from "./InputComponents/Category";
import DescriptionEvent from "./InputComponents/DescriptionEvent";
import EventSeverity from "./InputComponents/EventSeverity";
import LocationSelect from "./InputComponents/Location";
import Results from "./InputComponents/Results";
import SubSubUnitInput from "./InputComponents/SubUnitInput";
import TimeAndDate from "./InputComponents/TimeAndDate";
import Weather from "./InputComponents/Weather";
import UnitActivityType from "./InputComponents/UnitActivityType";
import { MuiErorrAlert } from "./MuiErrorAlert";
 


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

    const navigate = useNavigate();
    
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

    const [errorMessage, setErrorMessage] = useState<string>("");
    const [erorrKey , setErorrKey] = useState(0);

    const [allEvents, setAllEnets] = useState<FormData[]>([]);

    function updateField<K extends keyof FormData>(key: K, value: FormData[K]) {
        setFormData(prev => ({ ...prev, [key]: value }));
    }

    function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        
        const allFilled = 
            formData.timeDate.trim() !== "" &&
            formData.location.value !== "" &&
            formData.typeActivity.value !== "" &&
            formData.categoryoption.value !== "" &&
            formData.eventSeverity.value !== "" &&
            formData.typeUnitActivity.value !== "" &&
            formData.weather.value !== "" &&
            formData.results.value !== "" &&
            formData.eventDescription.trim() !== "" &&
            formData.subSubUnitInput.trim() !== "";

        if (!allFilled){
            setErrorMessage("אנא מלא את כל פרטי הטופס");
            setErorrKey((k) => k+1);
            return;
        }
        setErrorMessage("");
        
        setAllEnets(prev => [...prev, formData] );
        

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

    function goToTable() {
        navigate ("/page1", {state: {allEvents}});
    }

    return (
        <div>
            <h1 className="event-form-title"> יצירת אירוע חדש</h1>
            <form onSubmit={handleSubmit}>
                <div className="event-form">
                    <div className="field">
                        <TimeAndDate
                    
                        value={formData.timeDate}
                        onChange={(v: string) => updateField("timeDate", v)}
                        />
                    </div>

                    <div className="field">
                        <LocationSelect
                        value={formData.location}
                        onChange={(v) => updateField("location", v)}
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
                    <div className="field">
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

                </div>

                {errorMessage && <MuiErorrAlert key={erorrKey} message={errorMessage} duration={3000}/>}
                
                <div style={{display: "flex", gap: 12,marginTop:12, margin:20 }}>
                    <Button type="submit" variant="contained" color="primary"
                    >
                        הוסף אירוע
                    </Button>

                    <Button
                        type= "button"
                        variant="outlined"
                        onClick={goToTable}
                        disabled={allEvents.length === 0}
                    >
                        צפה בטבלה
                    </Button>
                </div>
            </form>
        </div>
    );

}

export default EventForm;
