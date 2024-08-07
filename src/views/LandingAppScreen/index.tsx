import { useEffect, useState } from "react";
import { appProcess } from "@canva/platform";
import styles from "styles/components.css";
import { useOverlay } from "utils/use_overlay_hook";
import SelectImagePanel from "../SelectImagePanel";
import BackgroundEditorPanel from "../BackgroundEditorPanel";
import ProcessImageLoader from "../ProcessImageLoader";
import { Alert, Rows } from "@canva/app-ui-kit";

const LandingAppScreen = () => {
  const overlay = useOverlay("image_selection");
  const [isImageReady, setIsImageReady] = useState(false);
  const [isImageWithoutBgReady, setIsImageWithoutBgReady] = useState(false);
  const [isLoadImage, setIsLoadImage] = useState(false);
  const [isImageSaving, setIsImageSaving] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");

  const handleOpenOverlay = () => {
    overlay.open();
    setIsLoadImage(true);
  };

  const handleSave = () => {
    overlay.close({ reason: "completed" });
    setIsImageSaving(true);
  };

  const handleClose = () => {
    overlay.close({ reason: "aborted" });
    setIsImageReady(false);
    setIsImageWithoutBgReady(false);
    setIsImageReady(false);
  };

  useEffect(() => {
    appProcess.registerOnMessage((_, message) => {
      const imageReady = Boolean(message.isImageReady);
      const savingFinish = Boolean(message.isSavingFinish);
      const errorMessage = message.alert?.message || "";

      if (errorMessage) {
        setAlertMessage(errorMessage);
        overlay.close({ reason: "aborted" });
      }

      if (imageReady) {
        setIsLoadImage(false);
        setIsImageReady(true);
      }

      if (savingFinish) {
        setIsImageSaving(false);
        setIsImageWithoutBgReady(false);
        setIsImageReady(false);
      }
    });
  }, [
    overlay,
    setIsLoadImage,
    setIsImageReady,
    setAlertMessage,
    setIsImageSaving,
  ]);

  useEffect(() => {
    appProcess.registerOnMessage((_, message) => {
      const imageWithoutBgReady = Boolean(message.isImageWithoutBgReady);

      if (imageWithoutBgReady) setIsImageWithoutBgReady(true);
    });
  }, [setIsLoadImage, setIsImageReady]);

  useEffect(() => {
    if (!overlay.isOpen) return;
    appProcess.broadcastMessage({ startProcessImage: true });
  }, [overlay]);

  if (
    isImageReady &&
    !isImageWithoutBgReady &&
    overlay.isOpen &&
    !alertMessage
  ) {
    return <ProcessImageLoader />;
  }

  return (
    <div className={styles.scrollContainer}>
      <Rows spacing="2u">
        {alertMessage && <Alert tone="critical">{alertMessage}</Alert>}
        {isImageWithoutBgReady ? (
          <BackgroundEditorPanel
            isSaving={isImageSaving}
            handleClose={handleClose}
            handleSave={handleSave}
          />
        ) : (
          <SelectImagePanel
            isLoading={isLoadImage}
            isImageSaving={isImageSaving}
            isCanOpenOverlay={overlay.canOpen}
            handleOpenOverlay={handleOpenOverlay}
          />
        )}
      </Rows>
    </div>
  );
};

export default LandingAppScreen;
