import { useState } from "react";
import Toast from "react-native-toast-message";
import { GradientBackground } from "@/app/components/layouts/GradientBackground";
import { ScreenLayout } from "@/app/components/layouts/ScreenLayout";
import { VStack } from "@/app/components/layouts/Stack/VStack";
import { Button } from "@/app/components/ui/Button";
import { Divider } from "@/app/components/ui/Divider";
import { Input } from "@/app/components/ui/Input";
import { supabase } from "@/app/services/supabase/supabase";
import { store$ } from "@/app/state/local/auth";

export function LoginScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const signInWithEmail = async () => {
    if (!email || !password) {
      return;
    }

    try {
      setIsLoading(true);
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        console.error("####", error);

        Toast.show({
          type: "error",
          text1: "Invalid email or password!",
        });

        setIsLoading(false);
        store$.setIsAuthenticated(false);
        return;
      }

      store$.setIsAuthenticated(true);
    } catch (error) {
      console.error(error);
      setIsLoading(false);
      store$.setIsAuthenticated(false);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <GradientBackground />
      <ScreenLayout title="Log in" theme="dark" showGoBack>
        <VStack spacingTop="4" spacingBottom="4" itemSpacing="4">
          <Input
            placeholder="Email..."
            keyboardType="email-address"
            value={email}
            onChangeText={(text) => setEmail(text)}
          />
          <Input
            placeholder="Password..."
            secureTextEntry
            value={password}
            onChangeText={(text) => setPassword(text)}
          />
          <Divider size="5" color="transparent" />
          <Button
            isLoading={isLoading}
            onPress={signInWithEmail}
            disabled={!email || !password}
          >
            Log in
          </Button>
          <Button variant="ghost" color="primary">
            Forgot password?
          </Button>
        </VStack>
      </ScreenLayout>
    </>
  );
}
