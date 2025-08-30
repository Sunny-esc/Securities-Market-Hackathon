import Home from "@/screens/Home";
import { SafeAreaProvider } from "react-native-safe-area-context";

export default function Index() {
  return (
    <SafeAreaProvider
      style={{ flex: 1, paddingTop: 35, backgroundColor: "#ffffff" }}
    >
      <Home />
    </SafeAreaProvider>
  );
}
