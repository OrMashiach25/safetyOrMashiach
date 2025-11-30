import { Stack ,Alert, type AlertColor} from "@mui/material"
import { useEffect, useState } from "react";


type Props = {
    message: string;
    duration?: number;
    severity?:AlertColor; 
};

export const MuiErorrAlert = ({ message , duration = 3000 , severity = "error"}: Props) => {
    const [visible, setVisible] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => setVisible(false), duration);
        return () => clearTimeout(timer);
    }, [duration]);

     if (!visible) return null;
    
    
     return(
        <Stack spacing={2}
            sx={{width: "fit-content",
                margin: "auto", 
                mt: 2,         

            }}
        > 
            <Alert severity={severity}>{message}</Alert>
        </Stack>
    );
};
