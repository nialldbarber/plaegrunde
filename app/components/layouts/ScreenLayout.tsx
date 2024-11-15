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
        <View style={styles.header}>
          {showGoBack && (
            <Pressable style={styles.goBack} onPress={goBack}>
              <ArrowLeft2
                size={30}
                color={theme === "dark" ? "white" : "black"}
                onPress={goBack}
              />
            </Pressable>
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
        </View>
        {children}
      </View>
    </ScrollView>
  );
}

const stylesheet = createStyleSheet(({ spacing }, rt) => ({
  container: {
    flex: 1,
    paddingTop: rt.insets.top,
    paddingBottom: rt.insets.bottom,
    paddingLeft: rt.insets.left,
    paddingRight: rt.insets.right,
  },
  inner: {
    flex: 1,
    paddingTop: spacing[2],
    paddingBottom: spacing[5],
    paddingHorizontal: spacing[5],
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
  },
  goBack: {
    paddingRight: spacing[4],
  },
}));
