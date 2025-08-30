import { SafeAreaProvider } from "react-native-safe-area-context";
import Header from "./components/header";
import ItemCard from "./components/itemCard";
import Tabs from "./components/tabs";
import Tprogress from "./components/tprogress";


export default function Home() {
  return (
      <SafeAreaProvider style={{ flex: 1, paddingTop: 0, backgroundColor: "#ffffff" }}>
        <Header />
        <ItemCard />
        <Tprogress />
        <Tabs />
      </SafeAreaProvider>
  );
}