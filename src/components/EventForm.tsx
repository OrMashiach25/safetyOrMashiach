import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import type { Option } from "../Data";
import { Button, Dialog, DialogTitle, DialogContent, DialogActions, TextField } from "@mui/material";
import { MuiErorrAlert } from "./MuiErrorAlert";
import { createEvent, fetchEvents} from "../api/eventsApi";
import type { EventPayload} from "../api/eventsApi";
import  type { FormData } from "./eventFormConfig";
import { initialFormData, isCivilArea, validateCoord,
  normalizeCoord, buildEventPayload } from "./eventFormConfig";
import { EventFields } from "./EventFields";

function EventForm() {

    const navigate = useNavigate();
    const [formData, setFormData] = useState<FormData>(initialFormData);
    const [errorMessage, setErrorMessage] = useState<string>("");
    const [erorrKey , setErorrKey] = useState(0);
    const [coordDialogOpen, setCoordDialogOpen] = useState(false);
    const [coordDraft, setCoordDraft] = useState("");
    const [coordError, setCoordError] = useState("");
    const [prevLocation, setPrevLocation] = useState<Option | null>(null);
    const [pendingCivilLoc, setPendingCivilLoc] = useState<Option | null>(null);
    const [hasEvents, setHasEvents] = useState(false);

    function updateField<K extends keyof FormData>(key: K, value: FormData[K]) {
        setFormData(prev => ({ ...prev, [key]: value }));
    }

    useEffect(() => {
        async function checkEvents() {
            try {
                const data = await fetchEvents();
                setHasEvents(Array.isArray(data) && data.length >0);
            } catch (err) {
                console.error("Error checking events:", err);
                setHasEvents(false);
            }
        }
        checkEvents();
    }, []);

    async function handleSubmit(e: React.FormEvent) {
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

        if (isCivilArea(formData.location) && !validateCoord(formData.civilAreaCoord)) {
            setErrorMessage("נדרש נ״צ בפורמט (123456,654321) עבור 'שטח אזרחי'");
            setErorrKey((k) => k + 1);
            return;
        }

        setErrorMessage("");

        const payload: EventPayload = buildEventPayload(formData);

        try {
            await createEvent(payload);
        } catch (err) {
            console.error("Error creating event:", err);
            setErrorMessage("אירעה שגיאה בשמירת האירוע לשרת");
            setErorrKey((k) => k + 1);
            return;
        }

        setHasEvents(true);
        setFormData(initialFormData);
    }

    function goToTable() {
        navigate ("/events");
    }

    return (
        <div className="event-form-page">
            <div className="event-form-card">
                <h1 className="event-form-title"> יצירת אירוע חדש</h1>
                <form onSubmit={handleSubmit}>
                    <div className="event-form">
                          <EventFields
                            formData={formData}
                            updateField={updateField}
                            onCivilAreaSelected={(v) => {
                            setPrevLocation(formData.location);
                            setPendingCivilLoc(v);
                            setCoordDraft(formData.civilAreaCoord || "");
                            setCoordError("");
                            setCoordDialogOpen(true);
                            }}
                        /> 
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
                            disabled={!hasEvents}
                        >
                            צפה בטבלה
                        </Button>
                    </div>
                </form>

                <Dialog open={coordDialogOpen} onClose={() => {}} dir="rtl">
                    <DialogTitle>הזן/י נ״צ לשטח אזרחי</DialogTitle>
                    <DialogContent>
                        <TextField
                        className="coordField"
                        autoFocus
                        fullWidth
                        margin="dense"
                        label='פורמט: (123456,654321)'
                        placeholder="(123456,654321)"
                        value={coordDraft}
                        onChange={(e) => { setCoordDraft(e.target.value); if (coordError) setCoordError(""); }}
                        error={!!coordError}
                        helperText={coordError || "זהו שדה חובה"}
                        slotProps={{
                            htmlInput: {
                                dir: "ltr",
                                inputMode: "numeric",
                                pattern: String.raw`\(\d{6},\s*\d{6}\)`,
                            },
                        }}
                        />
                    </DialogContent>

                    <DialogActions sx={{ justifyContent: "space-between" }}>
                        <Button
                        onClick={() => {
                            setCoordDialogOpen(false);
                            setCoordDraft("");
                            setCoordError("");
                            setPendingCivilLoc(null);
                            if (prevLocation) {
                            updateField("location", prevLocation);
                            }
                        }}
                        >
                        ביטול
                        </Button>

                        <Button
                        variant="contained"
                        onClick={() => {
                            if (!validateCoord(coordDraft)) {
                            setCoordError("נ״צ לא תקין");
                            return;
                            }
                            const normalized = normalizeCoord(coordDraft);
                            if (!normalized || !pendingCivilLoc) {
                            setCoordError("שגיאה בשמירת הנ״צ. נסה/י שוב.");
                            return;
                            }

                            updateField("location", pendingCivilLoc);
                            updateField("civilAreaCoord", normalized);

                            setCoordDialogOpen(false);
                            setPendingCivilLoc(null);
                        }}
                        >
                        שמירה
                        </Button>
                    </DialogActions>
                </Dialog>
            </div> 
        </div>
    );
}

export default EventForm;
