import Header from "@/screens/components/header";
import Tabs from "@/screens/components/tabs";
import { Provider as PaperProvider } from "react-native-paper";
import { SafeAreaProvider } from "react-native-safe-area-context";

export default function Index() {
  return (
    <PaperProvider>
      <SafeAreaProvider style={{ paddingTop: 0, backgroundColor: "#000" }}>
        <Header />
        <Tabs />
      </SafeAreaProvider>
    </PaperProvider>
  );
}
