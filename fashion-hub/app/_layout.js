import { Stack } from "expo-router";
import { GluestackUIProvider } from "@gluestack-ui/themed";
import { config } from "@gluestack-ui/config";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { LogBox } from "react-native";

LogBox.ignoreLogs([
  "SafeAreaView has been deprecated",
  "java.lang.String cannot be cast",
]);

LogBox.ignoreAllLogs(true);

export default function RootLayout() {
  return (
    <SafeAreaProvider>
      <GluestackUIProvider config={config}>
        <Stack
          screenOptions={{
            headerShown: false,
            animation: "slide_from_right",
          }}
        >
          
          <Stack.Screen name="index" />

          
          <Stack.Screen name="(tabs)" />

          
          <Stack.Screen name="product-detail" />
        </Stack>
      </GluestackUIProvider>
    </SafeAreaProvider>
  );
}
