import { Box, LoadingIndicator, Rows, Text, Title } from "@canva/app-ui-kit";
import styles from "styles/components.css";

const ProcessImageLoader = () => {
  return (
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
            for your photos, and remember to adjust the intensity of each effect
            to add a unique touch!"
          </Text>
        </Rows>
      </Rows>
    </Box>
  );
};

export default ProcessImageLoader;
