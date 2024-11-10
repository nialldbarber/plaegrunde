import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import Toast from "react-native-toast-message";
import { z } from "zod";
import { GradientBackground } from "@/app/components/layouts/GradientBackground";
import { ScreenLayout } from "@/app/components/layouts/ScreenLayout";
import { VStack } from "@/app/components/layouts/Stack/VStack";
import { Button } from "@/app/components/ui/Button";
import { Input } from "@/app/components/ui/Input";
import { supabase } from "@/app/services/supabase/supabase";
import { store$ } from "@/app/state/local/auth";

const signUpSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
    .regex(/[a-z]/, "Password must contain at least one lowercase letter")
    .regex(/[0-9]/, "Password must contain at least one number"),
});
type SignUpSchema = z.infer<typeof signUpSchema>;

export function OnboardingScreen() {
  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignUpSchema>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const signUpWithEmail = async (data: SignUpSchema) => {
    const { email, password } = data;
    if (!email || !password) {
      return;
    }

    try {
      const result = signUpSchema.safeParse({ email, password });

      if (!result.success) {
        Toast.show({
          type: "error",
          text1: result.error.message,
        });
        throw new Error("Invalid email or password");
      }

      const {
        data: { session },
        error,
      } = await supabase.auth.signUp({
        email,
        password,
      });

      if (error) {
        console.error("### HELLO", error);
        Toast.show({
          type: "error",
          text1: error.message,
        });
        throw new Error("Invalid email or password");
      }

      if (!session) {
        Toast.show({
          type: "info",
          text1: "Please check your email for verification!",
        });
        throw new Error("No session found");
      }

      store$.setIsAuthenticated(true);
    } catch (error) {
      console.error(error);
      store$.setIsAuthenticated(false);
    }
  };

  return (
    <>
      <GradientBackground />
      <ScreenLayout title="Create account" theme="dark" showGoBack>
        <VStack spacingTop="4" spacingBottom="4" itemSpacing="6">
          <Input
            placeholder="Email"
            control={control}
            name="email"
            errorMessage={errors.email?.message}
            autoCapitalize="none"
          />
          <Input
            placeholder="Password"
            control={control}
            name="password"
            errorMessage={errors.password?.message}
            secureTextEntry
          />
          <Button
            isLoading={isSubmitting}
            onPress={handleSubmit(signUpWithEmail)}
            // disabled={!getValues("email") || !getValues("password")}
          >
            Create account
          </Button>
        </VStack>
      </ScreenLayout>
    </>
  );
}
