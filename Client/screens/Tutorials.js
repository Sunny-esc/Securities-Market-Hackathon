import { SafeAreaProvider } from "react-native-safe-area-context";
import Filters from "./components/filters";
import ListContinue from "./components/listContinue";
import VidCard from "./components/vidCards";
export default function Tutorial() {
  return (
    <SafeAreaProvider
      style={{
        flex: 1,
        paddingTop: 0,
        backgroundColor: "#ffdd",
        paddingBottom: 50,
      }}
    >
      <ListContinue />
      <VidCard />
      <Filters />
    </SafeAreaProvider>
  );
}
