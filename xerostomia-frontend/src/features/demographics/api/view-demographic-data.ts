"use server";
import { customFetch } from "@/shared/custom-fetch";

export async function ViewDemographicData(userID: number) {
  //fetch data
  const response = await customFetch(`/demographics/view-demographic-data/${userID}`, {
    method: "GET",
  });

  if (response.ok) {
    const text = await response.text();

    if (!text) {
      return null;
    }

    try {
      const result = JSON.parse(text);
      return result;
    } catch (error) {
      return "Invalid JSON in response " + error;
    }
  } else {
    return "Failed to fetch data";
  }
}
