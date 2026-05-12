import { Metadata } from "next";
import React from "react";
import { getRoleFromCookie } from "@/features/auth/api/get-role-from-cookie";
import Providers from "../shared/providers/Providers";

export const metadata: Metadata = {
  title: "Xerostomia",
  description: "Xerostomia Dashboard",
  icons: {
    icon: "/favicon.ico",
  },
};

// Root Layout
export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const role = await getRoleFromCookie();

  return (
    <html lang="en" data-toolpad-color-scheme="dark" suppressHydrationWarning>
      <head>
      </head>
      <body>
        <Providers role={role}>{children}</Providers>
      </body>
    </html>
  );
}
