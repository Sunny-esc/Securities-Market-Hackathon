import { MD3LightTheme } from "react-native-paper";

const theme = {
  ...MD3LightTheme,
  colors: {
    ...MD3LightTheme.colors,
    primary: "#1f7a8c",      // teal-blue
    secondary: "#ffb703",    // golden accent
    surface: "#ffffff",
    background: "#f6f9fb",
  },
  roundness: 16,
};

export default theme;
