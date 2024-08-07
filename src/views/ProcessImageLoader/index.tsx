import { Box, LoadingIndicator, Rows, Text, Title } from "@canva/app-ui-kit";
import styles from "styles/components.css";

const ProcessImageLoader = () => {
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
              "Try experimenting with different presets to find the perfect look
              for your photos!"
            </Text>
          </Rows>
        </Rows>
      </Box>
    </div>
  );
};

export default ProcessImageLoader;
