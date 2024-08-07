import { useEffect, useState } from "react";
import {
  Box,
  Button,
  Checkbox,
  FormField,
  Grid,
  ImageCard,
  Rows,
  Slider,
  Text,
} from "@canva/app-ui-kit";
import { appProcess } from "@canva/platform";
import {
  AppBroadcastMessageLabel,
  DEFAULT_PRESET_VALUE,
  PRESET_OPTIONS,
} from "src/constants";
import type { PresetType, EffectValue } from "src/types";
import { presetChecker } from "src/utils/presetChecker";

interface BackgroundEditorPanelTestProps {
  isSaving?: boolean;
  handleClose: () => void;
  handleSave: () => void;
}

const BackgroundEditorPanel = ({
  isSaving,
  handleClose,
  handleSave,
}: BackgroundEditorPanelTestProps) => {
  const [effectValue, setEffectValue] =
    useState<EffectValue>(DEFAULT_PRESET_VALUE);

  const handleChangePreset = (key: PresetType, maxVal: number) => {
    setEffectValue({ ...DEFAULT_PRESET_VALUE, [key]: maxVal });
  };

  const handleChangeCustomPreset = (key: PresetType, val: number) => {
    setEffectValue((prev) => ({ ...prev, [key]: val }));
  };

  const handleRemoveBackground = () => {
    setEffectValue((prev) => ({ ...prev, bgRemoved: !prev.bgRemoved }));
  };

  useEffect(() => {
    appProcess.broadcastMessage({
      label: AppBroadcastMessageLabel.PresetChange,
      value: effectValue,
    });
  }, [effectValue, appProcess]);

  return (
    <Rows spacing="4u">
      <Rows spacing="2u">
        <Text variant="bold">Effects</Text>

        <Grid alignX="stretch" alignY="stretch" columns={3} spacing="2u">
          {PRESET_OPTIONS.map((preset) => (
            <Rows spacing="1u" key={`preset-${preset.name}`} align="center">
              <ImageCard
                alt={`preset-${preset.name}`}
                ariaLabel={`Select preset ${preset.name}`}
                borderRadius="standard"
                onClick={() => handleChangePreset(preset.name, preset.maxVal)}
                thumbnailUrl={preset.image}
                selectable
                selected={
                  effectValue[preset.name] === preset.maxVal &&
                  presetChecker(effectValue) &&
                  !effectValue.bgRemoved
                }
                thumbnailHeight={100}
                disabled={effectValue.bgRemoved}
              />
              <Text size="small" variant="bold">
                {preset.label}
              </Text>
            </Rows>
          ))}
        </Grid>
      </Rows>

      <Rows spacing="2u">
        <Text variant="bold">Custom effect</Text>
        <Rows spacing="1u">
          <FormField
            control={(props) => {
              return (
                <Checkbox
                  {...props}
                  label="Use background image"
                  checked={!effectValue.bgRemoved}
                  onChange={handleRemoveBackground}
                />
              );
            }}
            label="Background"
          />
          {PRESET_OPTIONS.map((preset) => (
            <FormField
              key={preset.name}
              label={preset.label}
              value={effectValue[preset.name]}
              control={(props) => (
                <Box paddingStart="2u">
                  <Slider
                    {...props}
                    max={preset.maxVal}
                    min={0}
                    step={1}
                    onChange={(val) =>
                      handleChangeCustomPreset(preset.name, val)
                    }
                    disabled={effectValue.bgRemoved}
                  />
                </Box>
              )}
            />
          ))}
        </Rows>
      </Rows>
      <Rows spacing="1u">
        <Button variant="primary" onClick={handleSave} loading={isSaving}>
          Save and close
        </Button>
        <Button variant="secondary" onClick={handleClose} disabled={isSaving}>
          Close without saving
        </Button>
      </Rows>
    </Rows>
  );
};

export default BackgroundEditorPanel;
