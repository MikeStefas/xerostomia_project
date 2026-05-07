import { useCallback, useEffect, useState } from "react";
import { GetImages } from "../api/get-images";
import { Report } from "../types";

export function useFetchImages(report: Report) {
    const [images, setImages] = useState<string[]>([]);
    const [loading, setLoading] = useState(false);
    const [index, setIndex] = useState(0);
    
    const handleGetImages = useCallback(async () => {
        setLoading(true);
    try {
      const fetchedImages = await GetImages(report.userID.toString(), report.reportId.toString());
      setImages(fetchedImages);
    } catch (error) {
      console.error("Failed to load images", error);
    } finally {
      setLoading(false);
    }
  }, [report]);


  useEffect(() => {
    handleGetImages();
  }, [report, handleGetImages]);
  
  const handleNextImage = () => {
    if (index < images.length - 1) {
      setIndex((prevIndex) => prevIndex + 1);
    }
    else {
      setIndex(0);
    }
  };

  const handlePreviousImage = () => {
    if (index > 0) {
      setIndex((prevIndex) => prevIndex - 1);
    }
    else {
      setIndex(images.length - 1);
        }
    };

  return { image: images[index], loading, index, handleNextImage, handlePreviousImage };
}
