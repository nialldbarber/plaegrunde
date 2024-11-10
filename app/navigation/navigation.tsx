import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import {
  createStaticNavigation,
  type StaticParamList,
} from "@react-navigation/native";
import {
  NativeStackNavigationProp,
  createNativeStackNavigator,
} from "@react-navigation/native-stack";
import { Home2, User } from "iconsax-react-native";
import {
  useIsUserAuthenticated,
  useIsUserNotAuthenticated,
} from "@/app/hooks/useIsUserAuthenticated";
import { AccountScreen } from "@/app/modules/account/AccountScreen";
import { LoginScreen } from "@/app/modules/auth/screens/LoginScreen";
import { OnboardingScreen } from "@/app/modules/auth/screens/OnboardingScreen";
import { WelcomeScreen } from "@/app/modules/auth/screens/WelcomeScreen";
import { HomeScreen } from "@/app/modules/home/screens/HomeScreen";
import { SettingsModal } from "@/app/modules/settings/SettingsModal";

const screenOptions = { headerShown: false };

/**
 * Bottom stack
 */
export const BottomStack = createBottomTabNavigator({
  initialRouteName: "Home",
  screens: {
    Home: HomeScreen,
    Account: AccountScreen,
  },
  screenOptions: ({ route }) => ({
    screenOptions,
    animation: "shift",
    tabBarIcon: ({ focused }) => {
      // TODO: add focused styles
      if (route.name === "Home") {
        return <Home2 size={27} color="#FF8A65" variant="Bold" />;
      }
      if (route.name === "Account") {
        return <User size={27} color="#FF8A65" variant="Bold" />;
      }
    },
  }),
});

/**
 * Login stack
 */
export const WelcomeStack = createNativeStackNavigator({
  initialRouteName: "Welcome",
  screenOptions,
  screens: {
    Welcome: WelcomeScreen, // shows options
    Login: LoginScreen, // shows login form
    Onboarding: OnboardingScreen, // shows onboarding (basically create an account)
  },
});
export type WelcomeStackParamList = {
  Welcome: undefined;
  Login: undefined;
  Onboarding: undefined;
};
export type WelcomeStackNavigation =
  NativeStackNavigationProp<WelcomeStackParamList>;

/**
 * Root stack
 */
export const RootStack = createNativeStackNavigator({
  groups: {
    Authenticated: {
      if: useIsUserAuthenticated,
      screenOptions,
      screens: { BottomStack },
    },
    NotAuthenticated: {
      if: useIsUserNotAuthenticated,
      screenOptions,
      screens: { WelcomeStack },
    },
    Modal: {
      if: useIsUserAuthenticated,
      screenOptions: {
        screenOptions,
        presentation: "modal",
        contentStyle: { backgroundColor: "white" },
      },
      screens: {
        screen: SettingsModal,
      },
    },
  },
});

type RootStackParamList = StaticParamList<typeof RootStack>;

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}

export const Navigation = createStaticNavigation(RootStack);
