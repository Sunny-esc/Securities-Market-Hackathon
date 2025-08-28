import { Text, View } from "react-native";
import Tabs from "@/src/components/tabs";
import Search from "@/src/components/searchbar";
import Drawer from "@/src/components/drawer";
import { SafeAreaView, SafeAreaProvider } from "react-native-safe-area-context";

export default function Index() {
  return (
    <SafeAreaProvider>
      <Tabs />
      <Search />
    </SafeAreaProvider>
  );
}
