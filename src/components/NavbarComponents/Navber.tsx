import NavbarButton from "./NavbarButton";

type NavbarProps = {
  showButton?: boolean;
};

function Navbar({ showButton = true }: NavbarProps) {
  return (
    <nav
      style={{
        backgroundColor: "#1976d2",
        color: "white",
        padding: "20px 20px",
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
      {showButton && (
        <NavbarButton text="סיכום אירועים" 
        onClick={() => (window.location.href = "/page1")} />
      )}
      
    </nav>
  );
}

export default Navbar;
