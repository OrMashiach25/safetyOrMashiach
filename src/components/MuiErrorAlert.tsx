import { Stack ,Alert} from "@mui/material"

export const MuiErorrAlert = () => {
    return(
        <Stack spacing={2} > 
            <Alert severity='error'>אנא מלא את כל פרטי הטופס  </Alert>
        </Stack>
    )
}