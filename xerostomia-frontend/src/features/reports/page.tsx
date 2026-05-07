"use client";
import { Box } from "@mui/material";
import { ReportCard } from "@/features/reports/components/reportcard";
import { useFetchPatients } from "@/features/reports/hooks/fetch-patients";
import UniversalDataGrid from "@/shared/components/universal-data-grid";
import DemographicCard from "../demographics/components/demographic-card";
import { useFetchDemographicData } from "../users/hooks/fetch-demographic-data";
import ImageViewerDialog from "./components/image-viewer-dialog";

export default function ReportsPage() {
  const { patients, selectedPatientID, setselectedPatientID, reports, selectedReportID, setselectedReportID, selectedReport } = useFetchPatients();
  const { demographicData } = useFetchDemographicData(selectedPatientID!);
  return (
    <Box sx={{ height: "100%" }}>
      {selectedPatientID === null ? (
        <UniversalDataGrid
            data={patients}
            onRowClick={(row) => setselectedPatientID(row.userID)}
            title="Patients"
            backButton={false}
            includeDates={false}
            showReportCount={true}
        />
      ) : null}
      
      {selectedPatientID !== null && selectedReportID === null ? (
        <UniversalDataGrid
            data={reports}
            onRowClick={(row) => setselectedReportID(row.reportId)}
            title="Reports"
            backButton={true}
            onBack={() => setselectedPatientID(null)}
            includeDates={true}
        />
      ) : null}

      {selectedReport && (
        <>
          <ReportCard report={selectedReport} setselectedReportID={setselectedReportID} />
          <DemographicCard demographicData={demographicData}/>
          <ImageViewerDialog report={selectedReport} />
        </>
      )}
    </Box>
  );
}
