import { Stack ,Alert} from "@mui/material"


type Props = {
    message: string;
};

export const MuiErorrAlert = ({ message }: Props) => {
    return(
        <Stack spacing={2} > 
            <Alert severity='error'>{message}</Alert>
        </Stack>
    );
};
