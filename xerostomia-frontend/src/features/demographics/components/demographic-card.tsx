import { Box, Button, Stack, Typography } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import { DemographicData } from "../types";
import { User } from "@/features/users/types";
import { HorizontalField } from "@/shared/components/horisontal-field";
import { SexSymbol } from "@/shared/components/sex-symbol";

interface DemographicCardProps {
  selectedUser?: User | null;
  setEditingMode?: (editingMode: boolean) => void;
  demographicData: DemographicData | null;
  showTitle?: boolean;
}

export default function DemographicCard({
  selectedUser,
  setEditingMode,
  demographicData,
  showTitle = true,
}: DemographicCardProps) {

  const isClinician = selectedUser?.role === "CLINICIAN";

  return (
    <Box sx={{ flex: 1, px: { xs: 0, sm: 2 }, mt: 2 }}>
      {!isClinician && (
        <Stack sx={{ width: '100%', maxWidth: '600px', mx: 'auto', flex: 1, direction: 'column', gap: 1 }}>
          {showTitle && (
            <Typography variant="h6" sx={{ fontWeight: 'bold', fontSize: '1.2rem', textAlign: 'center', mb: 2 }}>
              Demographic Data
            </Typography>
          )}

          <HorizontalField 
            label="Year of birth" 
            value={demographicData?.yearOfBirth || "N/A"} 
            bottomDivider 
          />
          <HorizontalField 
            label="Gender" 
            value={<SexSymbol sex={demographicData?.gender} />} 
          />
          
          {setEditingMode && (
            <Box sx={{ display: 'flex', justifyContent: 'center', mt: 1 }}>
              <Button
                sx={{ borderRadius: "10px" }}
                variant="outlined"
                startIcon={<EditIcon />}
                onClick={() => setEditingMode(true)}
              >
                Edit mode
              </Button>
            </Box>
          )}
        </Stack>
      )}
    </Box>
  );
}
