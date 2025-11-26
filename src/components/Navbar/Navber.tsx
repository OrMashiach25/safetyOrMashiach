import IconButton from "@mui/material/IconButton";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";

type Props = {
  mode: "light" | "dark";
  toggleMode: () => void;
};

function Navbar({ mode, toggleMode }: Props) {
  return (
    <nav
      style={{
        backgroundColor: "#1976d2",
        color: "white",
        padding: "12px 24px",
        fontSize: "18px",
        fontWeight: "bold",
        textAlign: "right",
        marginBottom: "5px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      טופס הזנת אירוע - מב"ט

      <IconButton onClick={toggleMode} style={{ color: "white" }}>
        {mode === "light" ? <DarkModeIcon /> : <LightModeIcon />}
      </IconButton>
    </nav>
  );
}

export default Navbar;
