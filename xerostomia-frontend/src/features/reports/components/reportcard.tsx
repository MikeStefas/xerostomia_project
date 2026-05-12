"use client";

import { Report } from "../types";
import { Box, Typography, Button, Stack } from "@mui/material";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { HorizontalField } from "@/shared/components/horisontal-field";


export function ReportCard({ report, setselectedReportID }: { report: Report, setselectedReportID: (id: number | null) => void }) {

  return (
    <Box sx={{ flex: 1, px: { xs: 0, sm: 2 } }}>
      <Stack direction="row" >
          <Button onClick={() => setselectedReportID(null)} sx={{ minWidth: '20px', p: 1 }}>
            <ArrowBackIcon />
          </Button>
          <Typography variant="h6" sx={{  fontSize: '2rem', flex: 1, mr: 5 }}>
            Report #{report.reportId}
          </Typography>
        </Stack>
      <Stack sx={{ width: '100%', maxWidth: '600px', mx: 'auto', flex: 1, direction: 'column', gap: 1 }}>
        <Typography variant="h6" sx={{ textAlign: 'center' , fontWeight: 'bold'}}>Report Information</Typography>
        <HorizontalField 
          label="Date" 
          value={new Date(report.createdAt).toLocaleString()} 
          bottomDivider 
        />
        <HorizontalField 
          label="Result" 
          value={report.result_total > 0.5 ? 'Xerostomia' : 'Healthy'} 
          bottomDivider 
        />
        <HorizontalField 
          label="Xerostomia Risk Percentage" 
          value={`${Math.round(report.result_total)}%`} 
        />
      </Stack>
    </Box>
  );
}
