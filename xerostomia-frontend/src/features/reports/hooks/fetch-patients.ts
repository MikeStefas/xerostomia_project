import { useState, useEffect, useMemo } from "react";
import { Patient } from "@/features/users/types";
import { Report } from "@/features/reports/types";
import { ViewUsers } from "@/features/users/api/viewusers";
import { ViewUserReports } from "@/features/reports/api/viewuserreport";

export function useFetchPatients() {
  const [patients, setPatients] = useState<Patient[]>([]);
  const [selectedPatientID, setselectedPatientID] = useState<number | null>(
    null
  );
  const [reports, setReports] = useState<Report[]>([]);
  const [selectedReportID, setselectedReportID] = useState<number | null>(null);

  const selectedReport = useMemo(() => {
    if (!reports || !Array.isArray(reports)) return undefined;
    return reports.find((r) => r.reportId === selectedReportID);
  }, [reports, selectedReportID]);

  //fetch ALL patients on load
  useEffect(() => {
    const fetchPatients = async () => {
      try {
        const data = await ViewUsers({
          chooseRole: "PATIENT",
          ofClinicianID: 0, // Using 0 instead of null to avoid backend ParseIntPipe errors
        });
        if (Array.isArray(data)) {
          setPatients(data);
        }
      } catch (error) {
        console.error("Error fetching patients:", error);
      }
    };
    fetchPatients();
  }, []);

  // Fetch reports on patient id change
  useEffect(() => {
    if (selectedPatientID === null) return;
    const fetchReports = async () => {
      try {
        const data = await ViewUserReports(selectedPatientID);
        if (Array.isArray(data)) {
          setReports(data);
        } else {
          setReports([]);
        }
      } catch (error) {
        console.error("Error fetching reports:", error);
        setReports([]);
      }
    };
    fetchReports();
  }, [selectedPatientID]);

  return { 
    patients, 
    selectedPatientID, 
    setselectedPatientID, 
    reports, 
    selectedReportID, 
    setselectedReportID, 
    selectedReport 
  };
}