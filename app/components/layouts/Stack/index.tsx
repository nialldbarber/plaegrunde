import { Children, type PropsWithChildren } from "react";
import { View } from "react-native";
import flattenChildren from "react-keyed-flatten-children";
import { createStyleSheet, useStyles } from "react-native-unistyles";
import type {
  SizingProps,
  StackOrientation,
} from "@/app/components/layouts/Stack/types";
import type { Spacing } from "@/app/design-system/tokens";

interface Props extends SizingProps, StackOrientation {}

export function Stack({
  orientation = "horizontal",
  spacing = "0",
  spacingTop = "0",
  spacingBottom = "0",
  spacingLeft = "0",
  spacingRight = "0",
  itemSpacing = "0",
  reverse = false,
  debug = false,
  children: childProp,
}: PropsWithChildren<Props>) {
  const children = flattenChildren(childProp);
  const { styles } = useStyles(stylesheet);

  const formattedChildren = reverse ? children.reverse() : children;

  return (
    <View
      style={styles.container(
        spacing,
        spacingTop,
        spacingBottom,
        spacingLeft,
        spacingRight,
        itemSpacing,
        debug,
        orientation,
      )}
    >
      {Children.map(formattedChildren, (child, index) => {
        const first = index === 0;
        const last = index === children.length - 1;
        return (
          <View style={styles.item(first, last, orientation)}>{child}</View>
        );
      })}
    </View>
  );
}

const stylesheet = createStyleSheet(({ spacing: _spacing }) => ({
  container: (
    spacing,
    spacingTop,
    spacingBottom,
    spacingLeft,
    spacingRight,
    itemSpacing,
    debug,
    orientation,
  ) => ({
    flex: 1,
    flexDirection: orientation === "horizontal" ? "row" : "column",
    gap: _spacing[itemSpacing as Spacing] ?? itemSpacing,
    margin: _spacing[spacing as Spacing] ?? spacing,
    marginTop: _spacing[spacingTop as Spacing] ?? spacingTop,
    marginBottom: _spacing[spacingBottom as Spacing] ?? spacingBottom,
    marginLeft: _spacing[spacingLeft as Spacing] ?? spacingLeft,
    marginRight: _spacing[spacingRight as Spacing] ?? spacingRight,
    backgroundColor: debug ? "rgba(255, 0, 0, 0.1)" : "transparent",
    borderWidth: debug ? 1 : 0,
    borderColor: debug ? "red" : "transparent",
    borderStyle: debug ? "dashed" : "solid",
  }),
  item: (first, last, orientation) => ({
    ...(orientation === "horizontal"
      ? {
          paddingTop: first && 0,
          paddingBottom: last && 0,
        }
      : {
          paddingLeft: first && 0,
          paddingRight: last && 0,
        }),
  }),
}));
