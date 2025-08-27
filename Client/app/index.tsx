import { Text, View } from "react-native";
import Tabs from "@/src/components/tabs";
import Search from "@/src/components/searchbar";
import tabs from "@/src/components/tabs";

export default function Index() {
  return (
    <View>
      <Search />
      <Tabs />
    </View>
  );
}
