import { useEffect, useRef } from "react";
import { upload } from "@canva/asset";
import { appProcess } from "@canva/platform";
import { AppBroadcastMessageLabel } from "src/constants";
import { getCanvas } from "src/utils/getCanvas";
import useGenerateImage from "src/usecases/useGenerateImage";

const OverlayImageScreen = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const {
    imageWithBg,
    imageWithoutBg,
    currentSelectedObject,
    generateImageWithoutBg,
  } = useGenerateImage();

  // Removed image bg processed when overlay is opened
  useEffect(() => {
    if (imageWithoutBg) return;
    appProcess.registerOnMessage((_, message) => {
      const canStartProcessImage = Boolean(message.startProcessImage);
      if (canStartProcessImage) {
        generateImageWithoutBg();
      }
    });
  }, [imageWithoutBg, generateImageWithoutBg]);

  // Init canvas
  useEffect(() => {
    if (!imageWithBg) return;

    const { width, height } = imageWithBg;
    // Render the selected image
    const { canvas, context } = getCanvas(canvasRef.current);
    canvas.width = width;
    canvas.height = height;

    // Draw the background image first
    context.drawImage(imageWithBg, 0, 0, width, height);

    // Set the `isImageReady` state
    appProcess.broadcastMessage({ isImageReady: true });
  }, [imageWithBg, imageWithoutBg, getCanvas]);

  useEffect(() => {
    if (!imageWithBg || !imageWithoutBg) return;

    appProcess.registerOnMessage((_, message) => {
      if (message.label === AppBroadcastMessageLabel.PresetChange) {
        const { canvas, context } = getCanvas(canvasRef.current);
        const { width, height } = imageWithBg;
        canvas.width = width;
        canvas.height = height;
        const { grayscale, blur, sephia, bgRemoved } = message.value;

        // Clear the canvas
        context.clearRect(0, 0, width, height);

        if (bgRemoved) {
          // Draw only the image without background
          context.filter = "none";
          context.drawImage(imageWithoutBg, 0, 0, width, height);
        } else {
          // Apply filters only to the background image
          context.filter = `grayscale(${grayscale}%) blur(${blur}px) sepia(${sephia}%)`;
          context.drawImage(imageWithBg, 0, 0, width, height);

          // Draw the image without background on top with no filters
          context.filter = "none";
          context.drawImage(imageWithoutBg, 0, 0, width, height);
        }
      }
    });
  }, [imageWithBg, imageWithoutBg, appProcess]);

  useEffect(() => {
    return void appProcess.current.setOnDispose(async (context) => {
      // Save changes to the user's image
      if (context.reason === "completed") {
        // Get the data URL of the image
        const { canvas } = getCanvas(canvasRef.current);
        const dataUrl = canvas.toDataURL();

        // Upload the new image
        const asset = await upload({
          type: "IMAGE",
          mimeType: "image/png",
          url: dataUrl,
          thumbnailUrl: dataUrl,
        });

        // Replace the original image with the new image
        const draft = await currentSelectedObject.read();
        draft.contents[0].ref = asset.ref;
        await draft.save();
      }

      // Reset the `isImageReady` state
      appProcess.broadcastMessage({
        isImageReady: false,
        isImageWithoutBgReady: false,
        isSavingFinish: true,
      });
    });
  }, [currentSelectedObject, appProcess]);

  return <canvas ref={canvasRef} style={{ width: "100%", height: "100%" }} />;
};

export default OverlayImageScreen;
