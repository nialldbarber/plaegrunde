import { UnistylesRegistry } from "react-native-unistyles";
import { colors } from "@/app/design-system/colors";
import {
  fontSize,
  fontWeight,
  letterSpacing,
  lineHeight,
  radii,
  shadow,
  spacing,
  tokens,
} from "@/app/design-system/tokens";

export const theme = {
  colors,
  tokens,
  spacing,
  fontSize,
  fontWeight,
  letterSpacing,
  lineHeight,
  radii,
  shadow,
} as const;

type AppThemes = {
  light: typeof theme;
};

declare module "react-native-unistyles" {
  export interface UnistylesThemes extends AppThemes {}
}

UnistylesRegistry.addThemes({
  light: theme,
});
