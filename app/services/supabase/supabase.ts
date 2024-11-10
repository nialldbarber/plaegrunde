import { AppState } from "react-native";
import { createClient } from "@supabase/supabase-js";
import { MMKV } from "react-native-mmkv";
import "react-native-url-polyfill/auto";

const superbaseUrl = "https://noetsmndkfctbrayrrer.supabase.co";
const supabaseAnonKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5vZXRzbW5ka2ZjdGJyYXlycmVyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzA4MzU4NjMsImV4cCI6MjA0NjQxMTg2M30.a4FAAxg6BpdZ1W02JgqY2_xUajvArBjudalBhilFq90";

const storage = new MMKV();

const MMKVStorage = {
  getItem: (key: string) => {
    const value = storage.getString(key);
    return value ? Promise.resolve(value) : Promise.resolve(null);
  },
  setItem: (key: string, value: string) => {
    storage.set(key, value);
    return Promise.resolve();
  },
  removeItem: (key: string) => {
    storage.delete(key);
    return Promise.resolve();
  },
};

export const supabase = createClient(superbaseUrl, supabaseAnonKey, {
  auth: {
    storage: MMKVStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
});

AppState.addEventListener("change", (state) => {
  if (state === "active") {
    supabase.auth.startAutoRefresh();
  } else {
    supabase.auth.stopAutoRefresh();
  }
});
