import type { PropsWithChildren } from "react";
import { Pressable, ScrollView, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { ArrowLeft2 } from "iconsax-react-native";
import { createStyleSheet, useStyles } from "react-native-unistyles";
import { Text } from "@/app/components/ui/Text";

type Props = {
  title?: string;
  theme?: "light" | "dark";
  showGoBack?: boolean;
};

export function ScreenLayout({
  title,
  theme = "light",
  showGoBack = false,
  children,
}: PropsWithChildren<Props>) {
  const { styles } = useStyles(stylesheet);
  const { goBack } = useNavigation();

  return (
    <ScrollView style={styles.container}>
      <View style={styles.inner}>
        {showGoBack && (
          <View style={styles.header}>
            <Pressable onPress={goBack}>
              <ArrowLeft2
                size={30}
                color={theme === "dark" ? "white" : "black"}
                onPress={goBack}
              />
            </Pressable>
          </View>
        )}
        {title && (
          <Text
            size="4xl"
            weight="bold"
            color={theme === "dark" ? "white" : "black"}
          >
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
    flex: 1,
    paddingTop: rt.insets.top,
    paddingBottom: rt.insets.bottom,
    paddingLeft: rt.insets.left,
    paddingRight: rt.insets.right,
  },
  inner: {
    flex: 1,
    paddingTop: theme.spacing[2],
    paddingBottom: theme.spacing[5],
    paddingHorizontal: theme.spacing[5],
  },
  header: {
    flexDirection: "row",
  },
}));
