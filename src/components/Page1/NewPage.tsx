import { useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";

function NewPage() {
  const navigate = useNavigate();

  function goBack() {
    navigate(-1);
  }

  return (
    <div dir="rtl" style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>בדיקה שעובד</h1>
      <h3>בדיקה נוספת</h3>

      <Button 
        variant="contained" 
        color="primary" 
        onClick={goBack}
        style={{ marginTop: "20px" }}
      >
        חזרה לעמוד הקודם
      </Button>
    </div>
  );
}

export default NewPage;
