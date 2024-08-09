import { Box, LoadingIndicator, Rows, Text, Title } from "@canva/app-ui-kit";
import { useMemo } from "react";
import { TIPS } from "src/constants";
import styles from "styles/components.css";

const ProcessImageLoader = () => {
  const tips = useMemo(() => {
    const randomIndex = Math.floor(Math.random() * TIPS.length);
    return TIPS[randomIndex];
  }, []);

  return (
    <div className={styles.scrollContainer}>
      <Box
        className={styles.fullHeight}
        display="flex"
        alignItems="center"
        justifyContent="center"
      >
        <Rows spacing="3u">
          <Rows spacing="2u">
            <Title alignment="center" size="small">
              Preparing Editor
            </Title>
            <LoadingIndicator size="large" />
            <Text alignment="center" tone="tertiary" size="small">
              {tips}
            </Text>
          </Rows>
        </Rows>
      </Box>
    </div>
  );
};

export default ProcessImageLoader;
