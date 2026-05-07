"use server";
import { customFetch } from "@/shared/custom-fetch";

export async function ViewUserReports(userID: number) {
  //fetch data
  const response = await customFetch(`/reports/view-user-reports/${userID}`, {
    method: "GET",
  });
  console.log(response);
  if (response.ok) {
    const result = await response.json();
    if (result.length === 0) {
      return [];
    }

    return result;
  } else {
    console.error(`Failed to fetch reports: ${response.status} ${response.statusText}`);
    return [];
  }
}
