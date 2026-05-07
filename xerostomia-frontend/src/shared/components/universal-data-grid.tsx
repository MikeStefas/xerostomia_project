import { Box, Typography, Button, Stack } from "@mui/material";
import { Clinician, Patient, User } from "@/features/users/types";
import { Report } from "@/features/reports/types";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { ReactNode, useMemo } from "react";
import { DataGrid, GridColDef } from "@mui/x-data-grid";

type GridDataItem = User | Clinician | Patient | Report;

interface UniversalDataGridProps<T extends GridDataItem> {
  data: T[];
  onRowClick: (row: T) => void; 
  title: string;
  backButton?: boolean;
  onBack?: () => void;
  includeDates?: boolean;
  showRole?: boolean;
  showReportCount?: boolean;
  actions?: ReactNode;
}

export default function UniversalDataGrid<T extends GridDataItem>({ 
  data, 
  onRowClick, 
  title, 
  backButton = false, 
  onBack, 
  includeDates = false,
  showRole = false,
  showReportCount = false,
  actions
}: UniversalDataGridProps<T>) {

  //id needed for datagrid
  const rows = useMemo(() => data.map((item) => {
    const base = { ...item };
    if ("reportId" in item) {
      return {
        ...base,
        id: item.reportId,
        createdAt: new Date(item.createdAt).toLocaleDateString() + ", " + new Date(item.createdAt).toLocaleTimeString(),
      };
    }
    
    return {
      ...base,
      id: "userID" in item ? item.userID : Math.random(), 
      userID: "userID" in item ? item.userID : undefined,
      firstName: "firstName" in item ? item.firstName : "",
      lastName: "lastName" in item ? item.lastName : "",
      role: "role" in item ? item.role : "", 
      email: item.email,
      institution: "institution" in item ? item.institution : "",
      role_val: "role" in item ? item.role : "", 
      
      //date formatting
      createdAt:
        "createdAt" in item && item.createdAt
          ? new Date(item.createdAt).toLocaleDateString() +
            ", " +
            new Date(item.createdAt).toLocaleTimeString()
          : "",
      updatedAt:
        "updatedAt" in item && item.updatedAt
          ? new Date(item.updatedAt).toLocaleDateString() +
            ", " +
            new Date(item.updatedAt).toLocaleTimeString()
          : "",
    };
  }), [data]);

  const isReport = data.length > 0 && "reportId" in data[0];

  const userColumns: GridColDef[] = [
    {
      field: "userID",
      headerName: "User ID",
      width: 100,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "firstName",
      headerName: "First Name",
      flex: 1,
      minWidth: 150,
    },
    {
      field: "lastName",
      headerName: "Last Name",
      flex: 1,
      minWidth: 150,
    },
    {
      field: "email",
      headerName: "Email",
      flex: 1.3,
      minWidth: 200,
    },
    {
      field: "institution",
      headerName: "Institution",
      flex: 1,
      minWidth: 180,
    },
  ];

  if (showRole && !isReport) {
    userColumns.splice(3, 0, {
      field: "role_val",
      headerName: "Role",
      flex: 1,
      minWidth: 120,
    });
  }

  if (showReportCount && !isReport) {
    userColumns.push({
      field: "reportCount",
      headerName: "Report Count",
      width: 120,
      headerAlign: "center",
      align: "center",
    });
  }

  const reportColumns: GridColDef[] = [
    {
      field: "reportId",
      headerName: "Report ID",
      width: 100,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "userID",
      headerName: "User ID",
      width: 100,
      headerAlign: "center",
      align: "center",
    },

    {
      field: "createdAt",
      headerName: "Created At",
      flex: 1,
      minWidth: 180,
    },
  ];

  const columns: GridColDef[] = isReport ? reportColumns : [...userColumns];

  if (includeDates && !isReport) {
    columns.push({
      field: "createdAt",
      headerName: "Created At",
      flex: 1,
      minWidth: 180,
    });
    columns.push({
      field: "updatedAt",
      headerName: "Updated At",
      flex: 1,
      minWidth: 180,
    });
  }

    return (
        <Box
          sx={{
            height: "100%",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 2 }}>
            <Stack direction="row" alignItems="center" spacing={2}>
                {backButton && onBack && (
                <Button onClick={onBack}>
                    <ArrowBackIcon />
                </Button>
                )}
                <Typography variant="h4">{title}</Typography>
            </Stack>
            {actions && <Box>{actions}</Box>}
          </Stack>
          
          <DataGrid
            sx={{
            height: "50vh",
            }}
            rows={rows}
            columns={columns}
            onRowClick={(params) => {
                onRowClick(params.row);
            }}
            />
        </Box>
    )
}