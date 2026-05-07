"use server";

import { customFetch } from "@/shared/custom-fetch";

export async function ViewUsers({
  chooseRole,
  ofClinicianID,
}: {
  chooseRole: "ANY" | "CLINICIAN" | "PATIENT" | null;
  ofClinicianID: number | null;
}) {

  const clinicianID = ofClinicianID ?? 0;
  const response = await customFetch(`/user/view-users/${chooseRole}/${clinicianID}`, {
    method: "GET",
  });

  if (response.ok) {
    const result = await response.json();
    return result;
  } else {
    throw new Error("Failed to fetch data");
  }
}
