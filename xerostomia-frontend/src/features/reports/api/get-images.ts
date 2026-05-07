"use server";
import { customFetch } from "@/shared/custom-fetch";

export async function GetImages(patientId: string, reportId: string): Promise<string[]> {
  //fetch data
  const response = await customFetch(`/reports/images/${patientId}/${reportId}`, {
    method: "GET",
   
  });

  if (response.ok) {
    const result = await response.json();
    const images: string[] = [];
    
      for (const item of result) {
        // Handle common Buffer-in-JSON structures
        const bufferData = item.data;
        if (bufferData) {
            const buffer = Buffer.from(bufferData);
            const base64 = buffer.toString("base64");
            images.push(`data:image/jpeg;base64,${base64}`);
        }
      }
    return images;
  } else {
    console.error("Failed to fetch data");
    return [];
  }
}
