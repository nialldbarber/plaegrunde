import { useCallback, useRef, useState } from "react";
import {
  BottomSheetBackdrop,
  BottomSheetBackdropProps,
  BottomSheetModal,
  BottomSheetScrollView,
  BottomSheetView,
} from "@gorhom/bottom-sheet";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import Toast from "react-native-toast-message";
import { z } from "zod";
import { GradientBackground } from "@/app/components/layouts/GradientBackground";
import { ScreenLayout } from "@/app/components/layouts/ScreenLayout";
import { VStack } from "@/app/components/layouts/Stack/VStack";
import { Button } from "@/app/components/ui/Button";
import { Input } from "@/app/components/ui/Input";
import { Text } from "@/app/components/ui/Text";
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
      store$.setIsAuthenticated(false);
      console.error(error);
      throw error;
    }
  };

  const bottomSheetModalRefOne = useRef<BottomSheetModal>(null);
  const bottomSheetModalRefTwo = useRef<BottomSheetModal>(null);

  const handleUpdateModalOne = () => {
    increment();

    bottomSheetModalRefOne.current?.dismiss();
    bottomSheetModalRefTwo.current?.present();
  };

  const handleUpdateModalTwo = () => {
    increment();

    bottomSheetModalRefTwo.current?.dismiss();
    bottomSheetModalRefOne.current?.present();
  };

  const [count, setCount] = useState(0);
  const increment = () => setCount(count + 1);

  console.log("mounted", count);

  const renderBackdrop = useCallback(
    (props: BottomSheetBackdropProps) => (
      <BottomSheetBackdrop
        {...props}
        disappearsOnIndex={1}
        appearsOnIndex={2}
      />
    ),
    [],
  );

  return (
    <>
      <BottomSheetModal
        ref={bottomSheetModalRefOne}
        enableDynamicSizing
        maxDynamicContentSize={800}
      >
        <BottomSheetScrollView style={{ padding: 20, paddingBottom: 100 }}>
          <Button onPress={increment}>Increment</Button>
          <Text size="xl" weight="bold" style={{ marginBottom: 20 }}>
            One {count}
          </Text>
          <Button onPress={handleUpdateModalOne}>Open Two</Button>
          {Array.from({ length: count }).map((_, index) => (
            <Button
              variant={index % 2 === 0 ? "primary" : "secondary"}
              key={index}
            >
              {index}
            </Button>
          ))}
        </BottomSheetScrollView>
      </BottomSheetModal>
      <BottomSheetModal ref={bottomSheetModalRefTwo}>
        <BottomSheetView style={{ flex: 1, padding: 20, paddingBottom: 100 }}>
          <Text size="xl" weight="bold" style={{ marginBottom: 20 }}>
            Two {count}
          </Text>
          <Button onPress={handleUpdateModalTwo}>Open One</Button>
        </BottomSheetView>
      </BottomSheetModal>
      <GradientBackground />
      <ScreenLayout title="Create account" theme="dark" showGoBack>
        <VStack spacingTop="4" spacingBottom="4" itemSpacing="6">
          <Button onPress={() => bottomSheetModalRefOne.current?.present()}>
            Open One
          </Button>
          <Button onPress={() => bottomSheetModalRefTwo.current?.present()}>
            Open Two
          </Button>
        </VStack>
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
