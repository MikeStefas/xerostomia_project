import { Button, CircularProgress, Dialog, DialogContent, IconButton, Stack, Typography } from "@mui/material";
import { Box } from "@mui/system";
import Image from "next/image";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import CloseIcon from '@mui/icons-material/Close';
import { useFetchImages } from "../hooks/fetch-images";
import { Report } from "../types";
import { useState } from "react";

export default function ImageViewerDialog({ report }: { report: Report }){
    const { image, loading, handlePreviousImage, handleNextImage } = useFetchImages(report);
    const [open, setOpen] = useState(false);
    return (
        <Box sx ={{mx: "auto",  borderRadius: "4px", p: 1, flex: 1, alignItems: "center", justifyContent: "center", display: "flex" }}>
        {loading && <CircularProgress sx={{mx: "auto", mt: 2}}/>}
      {image && !loading && (
        <Box sx={{ mt: 4 }}>
          <Button variant="contained" onClick={() => setOpen(true)}>
            View Images
          </Button>

          <Dialog
            fullScreen
            open={open}
            onClose={() => setOpen(false)}
          >
            <Box sx={{ p: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center', bgcolor: 'black', color: 'white' }}>
              <Typography variant="h6">Image Viewer</Typography>
              <IconButton color="inherit" onClick={() => setOpen(false)}>
                <CloseIcon />
              </IconButton>
            </Box>
            <DialogContent sx={{ bgcolor: 'black', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
              <Box sx={{ position: 'relative', width: '100%', height: '80vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <Image 
                  src={image} 
                  alt={`Fetched image`}
                  fill
                  style={{ objectFit: 'contain' }}
                />
              </Box>
              <Stack direction="row" spacing={4} sx={{ mt: 4 }}>
                <Button variant="contained" color="secondary" onClick={handlePreviousImage} startIcon={<ArrowBackIcon />}>
                  Previous
                </Button>
                <Button variant="contained" color="secondary" onClick={handleNextImage} endIcon={<ArrowForwardIcon />}>
                  Next
                </Button>
              </Stack>
            </DialogContent>
          </Dialog>
        </Box>
      )}
      </Box>
    )
}
