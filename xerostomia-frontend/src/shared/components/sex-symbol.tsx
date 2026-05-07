import { Box, Typography } from "@mui/material";

export const SexSymbol = ({ sex }: { sex: string | null | undefined }) => {
  if (!sex || sex === "Missing") return <Typography variant="body1">N/A</Typography>;
  const isMale = sex.toLowerCase() === "male";
  return (
    <Box
      sx={{
        display: "inline-flex",
        alignItems: "center",
        gap: 0.5,
        fontWeight: "bold",
        fontSize: "1.2rem",
      }}
    >
      <Typography
        component="span"
        sx={{
          color: isMale ? "#2196f3" : "#f06292", // Professional Blue / Pink
          fontSize: "1.5rem",
        }}
      >
        {isMale ? "♂️" : "♀️"}
      </Typography>
      <Typography
        component="span"
        variant="body1"
        sx={{
          textTransform: "capitalize",
          color: "text.primary",
        }}
      >
        {sex.toLowerCase()}
      </Typography>
    </Box>
  );
};
