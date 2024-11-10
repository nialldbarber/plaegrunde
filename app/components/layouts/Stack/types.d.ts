import type { Spacing } from "@/app/design-system/tokens";

export type SizingProps = {
  itemSpacing?: Spacing;
  spacing?: Spacing;
  spacingTop?: Spacing;
  spacingBottom?: Spacing;
  spacingLeft?: Spacing;
  spacingRight?: Spacing;
  reverse?: boolean;
  debug?: boolean;
};

export type StackOrientation = {
  orientation?: "horizontal" | "vertical";
};
