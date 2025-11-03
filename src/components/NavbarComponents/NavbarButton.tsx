import Button from "@mui/material/Button";

type Props = {
  text: string;    
  onClick: () => void;
};

function NavbarButton({ text, onClick }: Props) {
  return (
    <Button
      variant="contained"
      color="primary"
      onClick={onClick}
      style={{
        fontWeight: "bold",
        marginRight: "10px",
      }}
    >
      {text}
    </Button>
  );
}

export default NavbarButton;