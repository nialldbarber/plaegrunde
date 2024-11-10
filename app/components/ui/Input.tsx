import { useEffect, useState } from "react";
import { TextInput, View, type TextInputProps } from "react-native";
import {
  Controller,
  type Control,
  type FieldValues,
  type Path,
} from "react-hook-form";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";
import { createStyleSheet, useStyles } from "react-native-unistyles";
import { Text } from "@/app/components/ui/Text";

interface Props<T extends FieldValues> extends TextInputProps {
  control: Control<T>;
  name: Path<T>;
  errorMessage?: string;
}

export function Input<T extends FieldValues>({
  value,
  onChangeText,
  control,
  name,
  errorMessage,
  ...props
}: Props<T>) {
  const { styles, theme } = useStyles(stylesheet);
  const [isFocused, setIsFocused] = useState(false);

  const errorPosition = useSharedValue(0);
  const errorOpacity = useSharedValue(0);

  useEffect(() => {
    if (errorMessage) {
      errorPosition.value = withSpring(-5);
      errorOpacity.value = withSpring(1);
    } else {
      errorPosition.value = withSpring(0);
      errorOpacity.value = withSpring(0);
    }

    return () => {
      errorPosition.value = 0;
      errorOpacity.value = 0;
    };
  }, [errorMessage]);

  const errorStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: errorPosition.value }],
    opacity: errorOpacity.value,
  }));

  return (
    <View style={styles.container(isFocused)}>
      <Controller
        control={control}
        name={name}
        render={({ field: { value, onChange, onBlur } }) => (
          <>
            <TextInput
              style={styles.input}
              value={value}
              onChangeText={onChange}
              onBlur={() => {
                setIsFocused(false);
                onBlur();
              }}
              onFocus={() => setIsFocused(true)}
              keyboardType="email-address"
              autoComplete="email"
              autoCapitalize="none"
              placeholderTextColor={theme.colors.grey500}
              {...props}
            />
            <Animated.View style={[styles.errorContainer, errorStyle]}>
              <Text color="red700" weight="bold" size="xs">
                {errorMessage}
              </Text>
            </Animated.View>
          </>
        )}
      />
    </View>
  );
}

const stylesheet = createStyleSheet(
  ({ colors, spacing, radii, fontSize, shadow }) => ({
    container: (isFocused: boolean) => ({
      borderWidth: 3,
      borderColor: isFocused ? colors.primary : colors.white,
      borderRadius: radii.md,
      backgroundColor: colors.white,
      boxShadow: shadow.default,
    }),
    input: {
      fontSize: fontSize.base,
      fontWeight: "500",
      height: spacing[16],
      paddingHorizontal: spacing[4],
    },
    errorContainer: {
      position: "absolute",
      top: -spacing[2],
      padding: spacing[1],
      backgroundColor: colors.red100,
      paddingHorizontal: spacing[2],
      borderTopLeftRadius: radii.md,
      borderTopRightRadius: radii.md,
      width: spacing.full,
    },
  }),
);
