import { useNavigate, useLocation } from "react-router-dom";
import Button from "@mui/material/Button";
import ObjectTable from "../ObjectTable";

type SelectOption  = {value: string; label: string}
type FormData= {
    typeActivity:SelectOption;
    categoryoption:SelectOption;
    eventDescription: string;
    eventSeverity:SelectOption;
    location:SelectOption;
    results:SelectOption;
    injuryLevel:SelectOption;
    subSubUnitInput:string;
    timeDate:string;
    weather:SelectOption;
    typeUnitActivity:SelectOption;
};

function NewPage() {

    const {state} = useLocation() as {state?: {allEvents?: FormData[]}};
    const allEvents = state?.allEvents ??[];
    const navigate = useNavigate();

  function goBack() {
    navigate(-1);
  }

  return (
    <div dir="rtl" style={{ textAlign: "center", margin:25 }}>
        
      <Button 
        variant="contained" 
        color="primary" 
        onClick={goBack}
        style={{ 
          display: "block"
        }}
      >
        חזרה לעמוד הקודם
      </Button>
      
      <h2 className="table-page-title" > טבלת סיכום אירועים </h2>
      <ObjectTable allEvents={allEvents}/>

    </div>
  );
}

export default NewPage;
