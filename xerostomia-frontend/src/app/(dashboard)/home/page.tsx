"use client";

import { Card, CardContent, Typography, Box } from "@mui/material";

import GroupAddIcon from "@mui/icons-material/GroupAdd";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import LinkIcon from "@mui/icons-material/Link";
import AssignmentIcon from "@mui/icons-material/Assignment";
import { useEffect, useState } from "react";
import Image from "next/image";
import { getRoleFromCookie } from "@/features/auth/api/get-role-from-cookie";
import { GetImages } from "@/features/reports/api/get-images";

export default function DashboardPage() {
  const [role, setRole] = useState("");
  const [images, setImages] = useState<string[]>([]);
  
  useEffect(() => {
    const manageRole = async () => {
      const role = await getRoleFromCookie();
      setRole(role);
    };
    manageRole();
  }, []);

  const handleGetImages = async () => {
    const fetchedImages = await GetImages("4", "27");
    setImages(fetchedImages);
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom color="text.primary">
        SmileCheck Dashboard
      </Typography>

      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          gap: 3,
          mt: 2,
        }}
      >
        <Card
          sx={{
            flex: "1 1 300px",
            minWidth: 300,
            bgcolor: "background.paper",
            borderLeft: "5px solid",
            borderColor: "primary.main",
          }}
        >
          <CardContent>
            <Box display="flex" alignItems="center" mb={1}>
              <AssignmentIcon
                fontSize="large"
                sx={{ mr: 1, color: "primary.main" }}
              />
              <Typography variant="h6" color="text.primary">
                Reports
              </Typography>
            </Box>
            <Typography variant="body2" color="text.secondary">
              {role === "CLINICIAN" ? (
                <>
                  See a list of your paired patients. Click on a patient to view
                  detailed reports and track progress.
                </>
              ) : (
                <>
                  View all patients and their reports. Admins can access all
                  data.
                </>
              )}
            </Typography>
          </CardContent>
        </Card>

        {role === "ADMIN" && (
          <Card
            sx={{
              flex: "1 1 300px",
              minWidth: 300,
              bgcolor: "background.paper",
              borderLeft: "5px solid",
              borderColor: "secondary.main",
            }}
          >
            <CardContent>
              <Box display="flex" alignItems="center" mb={1}>
                <GroupAddIcon
                  fontSize="large"
                  sx={{ mr: 1, color: "secondary.main" }}
                />
                <Typography variant="h6" color="text.primary">
                  Create User
                </Typography>
              </Box>
              <Typography variant="body2" color="text.secondary">
                Add new users to the system by filling in their details like
                name, email, and role.
              </Typography>
            </CardContent>
          </Card>
        )}

        {role === "ADMIN" && (
          <Card
            sx={{
              flex: "1 1 300px",
              minWidth: 300,
              bgcolor: "background.paper",
              borderLeft: "5px solid",
              borderColor: "info.main",
            }}
          >
            <CardContent>
              <Box display="flex" alignItems="center" mb={1}>
                <ManageAccountsIcon
                  fontSize="large"
                  sx={{ mr: 1, color: "info.main" }}
                />
                <Typography variant="h6" color="text.primary">
                  Manage Users
                </Typography>
              </Box>
              <Typography variant="body2" color="text.secondary">
                View user data, demographics, and edit information to keep
                everything up to date.
              </Typography>
            </CardContent>
          </Card>
        )}

        {role === "ADMIN" && (
          <Card
            sx={{
              flex: "1 1 300px",
              minWidth: 300,
              bgcolor: "background.paper",
              borderLeft: "5px solid",
              borderColor: "success.main",
            }}
          >
            <CardContent>
              <Box display="flex" alignItems="center" mb={1}>
                <LinkIcon
                  fontSize="large"
                  sx={{ mr: 1, color: "success.main" }}
                />
                <Typography variant="h6" color="text.primary">
                  Manage Pairs
                </Typography>
              </Box>
              <Typography variant="body2" color="text.secondary">
                Pair clinicians with patients and view existing pairings.
              </Typography>
            </CardContent>
          </Card>
        )}
      </Box>

      <Box sx={{ mt: 4 }}>
        <button onClick={handleGetImages} style={{ padding: '10px 20px', cursor: 'pointer' }}>
          Get Images
        </button>
      </Box>

      {images.length > 0 && (
        <Box sx={{ mt: 4, display: 'flex', flexWrap: 'wrap', gap: 2 }}>
          {images.map((src, idx) => (
            <Card key={idx} sx={{ width: 1000 }}>
              <Image 
                src={src} 
                alt={`Fetched image ${idx}`} 
                height={1000}
                width={1000}
                style={{ width: '100%', height: 'auto', display: 'block' }} 
              />
             
            </Card>
          ))}
        </Box>
      )}
    </Box>
  );
}
