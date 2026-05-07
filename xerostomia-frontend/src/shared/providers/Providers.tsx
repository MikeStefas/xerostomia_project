"use client";

import { NextAppProvider } from "@toolpad/core/nextjs";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v15-appRouter";
import {
  BRANDING,
  NAVIGATION_ADMIN,
  NAVIGATION_CLINICIAN,
} from "./appprovider-props";
import React, { Suspense } from "react";
import SessionProvider from "./session-provider";
import CircularProgress from "@mui/material/CircularProgress";

export default function Providers({
  children,
  role,
}: {
  children: React.ReactNode;
  role: string;
}) {
  return (
    <Suspense
      fallback={
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
          <CircularProgress />
        </div>
      }
    >
      <AppRouterCacheProvider options={{ enableCssLayer: true }}>
        <NextAppProvider
          navigation={
            role === "ADMIN" ? NAVIGATION_ADMIN : NAVIGATION_CLINICIAN
          }
          branding={BRANDING}
        >
          <SessionProvider role={role}>{children}</SessionProvider>
        </NextAppProvider>
      </AppRouterCacheProvider>
    </Suspense>
  );
}
