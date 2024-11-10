import {
  BaseToast,
  BaseToastProps,
  ErrorToast,
} from "react-native-toast-message";
import { createStyleSheet, useStyles } from "react-native-unistyles";

export const toastConfig = {
  success: (props: BaseToastProps) => {
    const { styles } = useStyles(stylesheet);
    return (
      <BaseToast
        {...props}
        style={styles.successContainer}
        contentContainerStyle={{ paddingHorizontal: 15 }}
        text1Style={{
          fontSize: 15,
          fontWeight: "400",
        }}
      />
    );
  },
  error: (props: BaseToastProps) => {
    const { styles } = useStyles(stylesheet);
    return (
      <ErrorToast
        {...props}
        style={styles.errorContainer}
        text1Style={styles.errorText}
        text2Style={{
          fontSize: 15,
        }}
      />
    );
  },
};

const stylesheet = createStyleSheet(
  ({ tokens, colors, spacing, fontSize, fontWeight }) => ({
    successContainer: {
      backgroundColor: colors.green200,
    },
    errorContainer: {
      backgroundColor: tokens.errorBg,
      borderLeftColor: tokens.errorBg,
    },
    errorText: {
      color: tokens.errorText,
      fontSize: fontSize.sm,
      fontFamily: fontWeight.bold,
    },
  }),
);
