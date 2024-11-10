import type { AccessibilityRole, AccessibilityState } from "react-native";

type Props = {
  label?: string;
  hint?: string;
  role?: AccessibilityRole;
  state?: AccessibilityState;
};

export function useA11y({ label, hint, role, state }: Props) {
  return {
    accessible: true,
    accessibilityLabel: label,
    accessibilityHint: hint,
    accessibilityRole: role,
    accessibilityState: state,
  };
}
