import { MD3Colors, ProgressBar } from "react-native-paper";
import { SafeAreaProvider } from "react-native-safe-area-context";

const Progress = () => (
  <SafeAreaProvider>
    <ProgressBar progress={0.5} color={MD3Colors.error50} />
  </SafeAreaProvider>
);

export default Progress;
