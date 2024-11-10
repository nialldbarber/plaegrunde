import type { PropsWithChildren } from "react";
import { Stack } from "@/app/components/layouts/Stack";
import type { SizingProps } from "@/app/components/layouts/Stack/types";

export function VStack({
  spacing = "0",
  spacingTop = "0",
  spacingBottom = "0",
  spacingLeft = "0",
  spacingRight = "0",
  itemSpacing = "0",
  debug = false,
  reverse = false,
  children,
}: PropsWithChildren<SizingProps>) {
  return (
    <Stack
      orientation="vertical"
      spacing={spacing}
      spacingTop={spacingTop}
      spacingBottom={spacingBottom}
      spacingLeft={spacingLeft}
      spacingRight={spacingRight}
      itemSpacing={itemSpacing}
      debug={debug}
      reverse={reverse}
    >
      {children}
    </Stack>
  );
}
