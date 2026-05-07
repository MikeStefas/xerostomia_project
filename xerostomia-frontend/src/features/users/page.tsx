"use client";

import { Box, Button } from "@mui/material";
import { useFetchUsers } from "./hooks/fetch-users";
import { useFetchDemographicData } from "./hooks/fetch-demographic-data";
import { useState } from "react";
import AddIcon from '@mui/icons-material/Add';
import UniversalDataGrid from "@/shared/components/universal-data-grid";

import CreateUserForm from "@/features/users/components/create-user-form";
import UserManagement from "./components/user-management";

export default function UsersPage() {
  const { users, setSelectedUserID, selectedUser } = useFetchUsers();
  const { demographicData, editingMode, setEditingMode } = useFetchDemographicData(selectedUser?.userID ?? 0);
  const [isCreating, setIsCreating] = useState(false);

  return (
    <Box sx={{ height: "100%" }}>
      {selectedUser === null ? (
        isCreating ? (
                <CreateUserForm 
                    onCancel={() => setIsCreating(false)} 
                    
                />
        ) : (
            <UniversalDataGrid
                data={users}
                onRowClick={(row) => setSelectedUserID(row.userID)}
                title="Manage Users"
                showRole={true}
                actions={
                    <Button 
                        variant="contained" 
                        startIcon={<AddIcon />}
                        onClick={() => setIsCreating(true)}
                    >
                        Create User
                    </Button>
                }
            />
        )
      ) : (
        <UserManagement
            selectedUser={selectedUser}
            setSelectedUserID={setSelectedUserID}
            editingMode={editingMode}
            setEditingMode={setEditingMode}
            demographicData={demographicData}
        />
      )}
    </Box>
  );
}
