import React, { useCallback } from "react";
import { Text as NativeText, type TextProps } from "react-native";
import { createStyleSheet, useStyles } from "react-native-unistyles";
import { renderStringWithEmoji } from "@/app/components/utils/renderWithEmoji";
import type { ColorKeys } from "@/app/design-system/colors";
import type { FontSize, FontWeight } from "@/app/design-system/tokens";

type Decoration = "underline" | "line-through" | "none";

interface Props extends TextProps {
  size?: FontSize;
  weight?: FontWeight;
  color?: ColorKeys;
  decoration?: Decoration;
  withEmoji?: boolean;
}

export function Text({
  size = "base",
  weight = "medium",
  color = "black",
  decoration = "none",
  withEmoji = false,
  children,
  ...props
}: Props) {
  const { styles } = useStyles(stylesheet, { size, weight });

  const renderChildren = useCallback(() => {
    return React.Children.map(children, (child) => {
      if (typeof child === "string") {
        return withEmoji ? renderStringWithEmoji(child) : child;
      }
      if (React.isValidElement(child) && child.type === Text) {
        return React.cloneElement(child, { ...child.props });
      }
      return child;
    });
  }, [children, withEmoji]);

  return (
    <NativeText
      style={[styles.container(color), props.style]}
      maxFontSizeMultiplier={1.5}
      {...(!props.style ? { ...props } : {})}
    >
      {renderChildren()}
    </NativeText>
  );
}

const stylesheet = createStyleSheet(
  ({ fontSize, fontWeight, letterSpacing, lineHeight, colors }) => ({
    container: (color: ColorKeys) => ({
      color: colors[color],
      variants: {
        size: {
          xs: {
            fontSize: fontSize.xs,
            letterSpacing: letterSpacing.xs,
            lineHeight: lineHeight.xs,
          },
          sm: {
            fontSize: fontSize.sm,
            letterSpacing: letterSpacing.sm,
            lineHeight: lineHeight.sm,
          },
          base: {
            fontSize: fontSize.base,
            letterSpacing: letterSpacing.base,
            lineHeight: lineHeight.base,
          },
          lg: {
            fontSize: fontSize.lg,
            letterSpacing: letterSpacing.lg,
            lineHeight: lineHeight.lg,
          },
          xl: {
            fontSize: fontSize.xl,
            letterSpacing: letterSpacing.xl,
            lineHeight: lineHeight.xl,
          },
          "2xl": {
            fontSize: fontSize["2xl"],
            letterSpacing: letterSpacing["2xl"],
            lineHeight: lineHeight["2xl"],
          },
          "3xl": {
            fontSize: fontSize["3xl"],
            letterSpacing: letterSpacing["3xl"],
            lineHeight: lineHeight["3xl"],
          },
          "4xl": {
            fontSize: fontSize["4xl"],
            letterSpacing: letterSpacing["4xl"],
            lineHeight: lineHeight["4xl"],
          },
          "5xl": {
            fontSize: fontSize["5xl"],
            letterSpacing: letterSpacing["5xl"],
            lineHeight: lineHeight["5xl"],
          },
          "6xl": {
            fontSize: fontSize["6xl"],
            letterSpacing: letterSpacing["6xl"],
            lineHeight: lineHeight["6xl"],
          },
          "7xl": {
            fontSize: fontSize["7xl"],
            letterSpacing: letterSpacing["7xl"],
            lineHeight: lineHeight["7xl"],
          },
        },
        weight: {
          normal: {
            fontFamily: fontWeight.normal,
          },
          bold: {
            fontFamily: fontWeight.bold,
          },
          semibold: {
            fontFamily: fontWeight.semibold,
          },
          medium: {
            fontFamily: fontWeight.medium,
          },
          light: {
            fontFamily: fontWeight.light,
          },
        },
      },
    }),
  }),
);
