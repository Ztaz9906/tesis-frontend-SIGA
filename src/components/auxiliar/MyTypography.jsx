import Typography from "@mui/material/Typography";

export default function MyTypography({label, data}) {
    const displayData = (data) => data || 'No disponible';
    return (
        <Typography variant="body2" color="textSecondary">
            <span className="font-medium">{label}:&nbsp;</span>
            {displayData(data)}
        </Typography>
    );
}
