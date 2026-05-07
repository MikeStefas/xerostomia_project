"use client";
import { DashboardLayout } from "@toolpad/core";
import { Box } from "@mui/material";
import React from "react";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <DashboardLayout>
      <Box
        sx={{
          width: "100%",
          maxWidth: "1600px",
          mx: "auto",
          p: 4,
          height: "100%",
          minHeight: "700px",
        }}
      >
        {children}
      </Box>
    </DashboardLayout>
  );
}
