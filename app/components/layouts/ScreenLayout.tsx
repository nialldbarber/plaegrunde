import type { PropsWithChildren } from "react";
import { ScrollView, View } from "react-native";
import { createStyleSheet, useStyles } from "react-native-unistyles";
import { Text } from "@/app/components/ui/Text";

type Props = {
  title?: string;
};

export function ScreenLayout({ title, children }: PropsWithChildren<Props>) {
  const { styles } = useStyles(stylesheet);

  return (
    <ScrollView style={styles.container}>
      <View style={styles.inner}>
        {title && (
          <Text size="3xl" weight="bold">
            {title}
          </Text>
        )}
        {children}
      </View>
    </ScrollView>
  );
}

const stylesheet = createStyleSheet((theme, rt) => ({
  container: {
    paddingTop: rt.insets.top,
    paddingBottom: rt.insets.bottom,
    paddingLeft: rt.insets.left,
    paddingRight: rt.insets.right,
  },
  inner: {
    paddingTop: theme.spacing[2],
    paddingBottom: theme.spacing[5],
    paddingHorizontal: theme.spacing[5],
  },
}));
