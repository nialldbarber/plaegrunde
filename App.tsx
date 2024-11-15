import { toastConfig } from "@/app/components/ui/Toast";
import "@/app/design-system/theme";
import React, { useEffect } from "react";
import { Text } from "react-native";
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import { useNavigationContainerRef } from "@react-navigation/native";
import { QueryClientProvider } from "@tanstack/react-query";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import Toast from "react-native-toast-message";
import { Navigation } from "@/app/navigation/navigation";
import { supabase } from "@/app/services/supabase/supabase";
import { store$ } from "@/app/state/local/auth";
import { queryClient } from "@/app/state/server/config";
import "react-native-url-polyfill/auto";

function App() {
  const navigationRef = useNavigationContainerRef();

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      store$.setSession(session);
    });

    supabase.auth.onAuthStateChange((_event, session) => {
      store$.setSession(session);
    });
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <BottomSheetModalProvider>
          <Navigation
            ref={navigationRef}
            linking={{
              enabled: "auto",
              prefixes: ["myplayground://"],
            }}
            fallback={<Text>Loading...</Text>}
          />
          <Toast config={toastConfig} />
        </BottomSheetModalProvider>
      </GestureHandlerRootView>
    </QueryClientProvider>
  );
}

export default App;
