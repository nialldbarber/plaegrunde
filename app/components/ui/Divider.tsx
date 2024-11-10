import { View } from "react-native";
import { createStyleSheet, useStyles } from "react-native-unistyles";
import type { ColorKeys } from "@/app/design-system/colors";
import { radii, spacing, type Spacing } from "@/app/design-system/tokens";

type Props = {
  color?: ColorKeys;
  size?: Spacing;
  orientation?: "horizontal" | "vertical";
  visible?: boolean;
};

export function Divider({
  color = "grey500",
  size = "px",
  orientation = "horizontal",
  visible = true,
}: Props) {
  const { styles } = useStyles(stylesheet, { orientation });
  return <View style={styles.container(color, size, visible)} />;
}

const stylesheet = createStyleSheet(({ colors }) => ({
  container: (_color: ColorKeys, size: Spacing, visible: boolean) => ({
    borderRadius: radii.full,
    variants: {
      orientation: {
        horizontal: {
          width: "100%",
          height: spacing[size],
          backgroundColor: colors[_color],
          opacity: visible ? 1 : 0,
        },
        vertical: {
          width: spacing[size],
          height: "100%",
          backgroundColor: colors[_color],
          opacity: visible ? 1 : 0,
        },
      },
    },
  }),
}));
