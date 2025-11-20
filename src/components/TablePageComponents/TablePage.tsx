import { useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
import ObjectTable from "../ObjectTable";
import type { TableEvent } from "../ObjectTable";
import { useEffect, useState } from "react";
import { fetchEvents } from "../../api/eventsApi";



function NewPage() {
  const navigate = useNavigate();
  const [eventsFromServer, setEventsFromServer] = useState<TableEvent[]>([]);

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

  return (
    <div dir="rtl" style={{ textAlign: "center", margin:25 }}>
      <Button 
        variant="contained" 
        color="primary" 
        onClick={goBack}
        style={{ display: "block" }}
      >
        חזרה לעמוד הקודם
      </Button>
      
      <h2 className="table-page-title">טבלת סיכום אירועים</h2>
      <ObjectTable allEvents={eventsFromServer} />
    </div>
  );
}

export default NewPage;
