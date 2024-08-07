import { appProcess } from "@canva/platform";
import LandingAppScreen from "./views/LandingAppScreen";
import OverlayImageScreen from "./views/OverlayImageScreen";
import "context-filter-polyfill";

export const App = () => {
  const context = appProcess.current.getInfo();

  if (context.surface === "object_panel") {
    return <LandingAppScreen />;
  }

  if (context.surface === "selected_image_overlay") {
    return <OverlayImageScreen />;
  }

  throw new Error(`Invalid surface: ${context.surface}`);
};
