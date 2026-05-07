import { Box, Stack, Typography } from "@mui/material";
import { User } from "../types";
import { HorizontalField } from "@/shared/components/horisontal-field";

export default function UserCard({
  selectedUser,
}: {
  selectedUser: User | null;
}) {
  return (
    <Box sx={{ flex: 1, px: { xs: 0, sm: 2 } }}>
      {selectedUser ? (
        <Stack sx={{ width: '100%', maxWidth: '600px', mx: 'auto', flex: 1, direction: 'column', gap: 1 }}>
          <Typography variant="h6" sx={{ fontWeight: 'bold', fontSize: '1.2rem', textAlign: 'center', mb: 2 }}>User Data</Typography>
          <HorizontalField label="USER ID" value={selectedUser.userID} bottomDivider />
          <HorizontalField label="First Name" value={selectedUser.firstName} bottomDivider />
          <HorizontalField label="Last Name" value={selectedUser.lastName} bottomDivider />
          <HorizontalField label="Email" value={selectedUser.email} bottomDivider />
          <HorizontalField label="Created" value={new Date(selectedUser.createdAt).toLocaleString()} bottomDivider />
          <HorizontalField label="Updated" value={new Date(selectedUser.updatedAt).toLocaleString()} bottomDivider />
          <HorizontalField label="Role" value={selectedUser.role} bottomDivider />
          <HorizontalField label="Institution" value={selectedUser.institution} />
        </Stack>
      ) : (
        <Typography>Select a user to see details</Typography>
      )}
    </Box>
  );
}
