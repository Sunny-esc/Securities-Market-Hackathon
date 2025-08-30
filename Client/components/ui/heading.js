import { Text } from "react-native";

export function Heading({ children, size = "md", style, ...props }) {
  let fontSize = 20;
  if (size === "lg") fontSize = 28;
  if (size === "sm") fontSize = 16;

  return (
    <Text
      style={[
        { fontSize, fontWeight: "bold", color: "#222", marginBottom: 8 },
        style,
      ]}
      {...props}
    >
          {children}
        </Text>
      );
    }