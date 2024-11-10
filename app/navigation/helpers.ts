import { useNavigation } from "@react-navigation/native";

export function useGoBack() {
  const { navigate, goBack, canGoBack } = useNavigation();

  if (!canGoBack) {
    return navigate("BottomStack", { screen: "Home" });
  }

  return goBack();
}
