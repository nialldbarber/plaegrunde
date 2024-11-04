import "@/app/design-system/theme";
import React from "react";
import { Text } from "react-native";
import { useNavigationContainerRef } from "@react-navigation/native";
import { QueryClientProvider } from "@tanstack/react-query";
import { Navigation } from "@/app/navigation/navigation";
import { queryClient } from "@/app/state/server/config";

function App() {
  const navigationRef = useNavigationContainerRef();

  return (
    <QueryClientProvider client={queryClient}>
      <Navigation
        ref={navigationRef}
        linking={{
          enabled: "auto",
          prefixes: ["myplayground://"],
        }}
        fallback={<Text>Loading...</Text>}
      />
    </QueryClientProvider>
  );
}

export default App;
