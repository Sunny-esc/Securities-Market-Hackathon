import { Avatar, ListItem } from "@rneui/base";
import { ScrollView } from "react-native";
import TouchableScale from "react-native-touchable-scale";

const items = [
  {
    name: "Chris Jackson",
    subtitle: "Vice Chairman",
    avatar: "https://reactnative.dev/img/tiny_logo.png",
  },
  {
    name: "Sarah Lee",
    subtitle: "Chief Marketing Officer",
    avatar: "https://randomuser.me/api/portraits/women/44.jpg",
  },
  {
    name: "John Doe",
    subtitle: "Lead Developer",
    avatar: "https://randomuser.me/api/portraits/men/45.jpg",
  },
  {
    name: "Emily Smith",
    subtitle: "Product Manager",
    avatar: "https://randomuser.me/api/portraits/women/46.jpg",
  },
  {
    name: "Michael Brown",
    subtitle: "UX Designer",
    avatar: "https://randomuser.me/api/portraits/men/47.jpg",
  },
  {
    name: "Linda White",
    subtitle: "QA Engineer",
    avatar: "https://randomuser.me/api/portraits/women/48.jpg",
  },
  {
    name: "David Green",
    subtitle: "Support Lead",
    avatar: "https://randomuser.me/api/portraits/men/49.jpg",
  },
];

const TProgress = () => (
  <ScrollView
    contentContainerStyle={{ paddingVertical: 10 }}
    style={{ maxHeight: 300 }} // Optional: limit height for scroll
  >
    {items.map((item, idx) => (
      <ListItem
        key={idx}
        Component={TouchableScale}
        friction={90}
        tension={100}
        activeScale={0.95}
        linearGradientProps={{
          colors: ["#FF9800", "#F44336"],
          start: { x: 1, y: 0 },
          end: { x: 0.2, y: 0 },
        }}
        containerStyle={{ marginVertical: 10, borderRadius: 10 }}
      >
        <Avatar rounded source={{ uri: item.avatar }} />
        <ListItem.Content>
          <ListItem.Title style={{ color: "black", fontWeight: "bold" }}>
            {item.name}
          </ListItem.Title>
          <ListItem.Subtitle style={{ color: "black" }}>
            {item.subtitle}
          </ListItem.Subtitle>
        </ListItem.Content>
        <ListItem.Chevron color="black" />
      </ListItem>
    ))}
  </ScrollView>
);

export default TProgress;
