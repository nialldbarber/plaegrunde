const baseColors = {
  white: "#FFFFFF",
  black: "#000000",
  transparent: "transparent",
  primary: "#f95108",
  secondary: "#47474a",
  tertiary: "#000000",
  link: "#000000",
  error: "#000000",
  success: "#000000",
  warning: "#000000",
  info: "#000000",
};

const grey = {
  grey100: "#F9FAFB",
  grey200: "#F4F6F8",
  grey300: "#DFE3E8",
  grey400: "#C4CDD5",
  grey500: "#919EB6",
  grey600: "#637381",
  grey700: "#455A64",
  grey800: "#263238",
  grey900: "#162328",
};

const blue = {
  blue100: "#E3F2FD",
  blue200: "#BBDEFB",
  blue300: "#90CAF9",
  blue400: "#64B5F6",
  blue500: "#42A5F5",
  blue600: "#2196F3",
  blue700: "#1E88E5",
  blue800: "#1976D2",
  blue900: "#1565C0",
};

const green = {
  green100: "#E8F5E9",
  green200: "#C8E6C9",
  green300: "#A5D6A7",
  green400: "#81C784",
  green500: "#66BB6A",
  green600: "#4CAF50",
  green700: "#43A047",
  green800: "#388E3C",
  green900: "#2E7D32",
};

const red = {
  red100: "#FBE9E7",
  red200: "#F8BBD0",
  red300: "#F4ACB7",
  red400: "#F098A4",
  red500: "#EC798A",
  red600: "#E91E63",
  red700: "#D81B60",
  red800: "#C2185B",
  red900: "#AD1457",
};

export const colors = {
  ...baseColors,
  ...grey,
  ...blue,
  ...green,
  ...red,
};
export type Colors = typeof colors;
export type ColorKeys = keyof Colors;
