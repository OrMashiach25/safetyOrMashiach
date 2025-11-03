import NavbarButton from "./NavbarButton";

function Navbar() {
  return (
    <nav
      style={{
        backgroundColor: "#1976d2",
        color: "white",
        padding: "20px",
        fontSize: "20px",
        fontWeight: "bold",
        textAlign: "right",
        width: "100%",
        marginBottom: "10px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      טופס הזנת אירוע - מב"ט
      <NavbarButton text="סיכום אירועים" onClick={() => (window.location.href = "/new-page")} />
    </nav>
  );
}

export default Navbar;
