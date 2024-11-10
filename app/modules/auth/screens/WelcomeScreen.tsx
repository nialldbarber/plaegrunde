import { View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { createStyleSheet, useStyles } from "react-native-unistyles";
import { GradientBackground } from "@/app/components/layouts/GradientBackground";
import { ScreenLayout } from "@/app/components/layouts/ScreenLayout";
import { VStack } from "@/app/components/layouts/Stack/VStack";
import { Button } from "@/app/components/ui/Button";
import type { WelcomeStackNavigation } from "@/app/navigation/navigation";

export function WelcomeScreen() {
  const { navigate } = useNavigation<WelcomeStackNavigation>();
  const { styles } = useStyles(stylesheet);

  return (
    <>
      <GradientBackground />
      <ScreenLayout title="Welcome" theme="dark">
        <View style={styles.container}>
          <VStack itemSpacing="4" spacingTop="4">
            <Button onPress={() => navigate("Login")}>Log in</Button>
            <Button
              variant="ghost"
              color="primary"
              onPress={() => navigate("Onboarding")}
            >
              Create an account
            </Button>
          </VStack>
        </View>
      </ScreenLayout>
    </>
  );
}

const stylesheet = createStyleSheet(() => ({
  container: {
    // flex: 1,
    // justifyContent: "center",
    // backgroundColor: "pink",
  },
}));
