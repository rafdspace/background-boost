import { getTemporaryUrl } from "@canva/asset";
import { appProcess } from "@canva/platform";
import { useCallback, useEffect, useRef, useState } from "react";
import { downloadImage } from "src/utils/downloadImage";
import { useSelection } from "utils/use_selection_hook";

const useGenerateImage = () => {
  const currentSelectedObject = useSelection("image");
  const fetchOnce = useRef(false);

  const [imageUrl, setImageUrl] = useState("");
  const [imageWithBg, setImageWithBg] = useState<HTMLImageElement>();
  const [imageWithoutBg, setImageWithoutBg] = useState<HTMLImageElement>();

  const generateImageUrl = useCallback(async () => {
    if (imageUrl) return;

    const draft = await currentSelectedObject.read();
    const [image] = draft.contents;
    if (!image) {
      return;
    }

    // Download the selected image
    const { url } = await getTemporaryUrl({ type: "IMAGE", ref: image.ref });
    setImageUrl(url);
  }, [currentSelectedObject]);

  const generateImageWithBg = useCallback(async () => {
    if (!imageUrl || imageWithBg) return;

    const img = await downloadImage(imageUrl);

    setImageWithBg(img);
  }, [imageUrl, imageWithBg, setImageWithBg]);

  const generateImageWithoutBg = useCallback(async () => {
    if (!imageUrl || imageWithoutBg || fetchOnce.current) return;
    fetchOnce.current = true;

    try {
      const response = await fetch(
        "https://rafdspace-image-api.vercel.app/api/remove-background",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            imageUrl,
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to process background image.");
      }
      const blob = await response.blob();
      const url = URL.createObjectURL(blob);

      // Create an HTMLImageElement
      const image = new Image();
      image.src = url;

      // Wait for the image to load before setting it to state
      image.onload = () => {
        setImageWithoutBg(image);
      };
      appProcess.broadcastMessage({ isImageWithoutBgReady: true });
    } catch (error) {
      const errMessage = error instanceof Error ? error.message : String(error);
      appProcess.broadcastMessage({
        alert: {
          type: "critical",
          message:
            "Oops! We're having trouble processing your image right now.",
          description: errMessage,
        },
      });
    }
  }, [imageUrl, imageWithoutBg, imageWithBg, fetch]);

  useEffect(() => {
    generateImageUrl();
  }, [generateImageUrl]);

  useEffect(() => {
    generateImageWithBg();
  }, [generateImageWithBg]);

  return {
    imageWithBg,
    imageWithoutBg,
    currentSelectedObject,
    generateImageWithoutBg,
  };
};

export default useGenerateImage;
