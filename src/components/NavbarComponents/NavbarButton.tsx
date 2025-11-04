import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";

type Props = { text: string; };

function NavbarButton({ text }: Props) {
  const navigate = useNavigate();
  return (
    <Button
      variant="contained"
      color="primary"
      onClick={() => navigate("/page1")}
      style={{ fontWeight: "bold", marginRight: "10px"}}
    >
      {text}
    </Button>
  );
}

export default NavbarButton;