import { useEffect, useState } from "react";
import { View } from "react-native";
import { Button } from "@/app/components/ui/Button";
import { Text } from "@/app/components/ui/Text";
import { supabase } from "@/app/services/supabase/supabase";
import { store$ } from "@/app/state/local/auth";

export function HomeScreen() {
  const store = store$.isAuthenticated.get();

  console.log(store);

  const [userName, setUserName] = useState<string | null>(null);

  const getUserName = async () => {
    try {
      const { data, error } = await supabase.auth.getUser();
      console.log(data, error);
      setUserName(data.user?.email ?? null);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getUserName();
  }, []);

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text style={{ color: "red", fontWeight: "900" }}>HOME SCREEN</Text>
      <Text>Hello {userName}</Text>
      <Button onPress={() => store$.isAuthenticated.set(false)}>
        Sign out!
      </Button>
      <Text>{store ? "Authenticated" : "Not authenticated"}</Text>
    </View>
  );
}
