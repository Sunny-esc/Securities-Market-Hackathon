import { Card } from "@rneui/base";
import { Image, ScrollView, Text, View } from "react-native";

const cards = [
  { title: "CARD 1", uri: "https://reactnative.dev/img/tiny_logo.png" },
  { title: "CARD 2", uri: "https://reactnative.dev/img/tiny_logo.png" },
  { title: "CARD 3", uri: "https://reactnative.dev/img/tiny_logo.png" },
  { title: "CARD 4", uri: "https://reactnative.dev/img/tiny_logo.png" },
];

const ItemCard = () => {
  return (
    <Card containerStyle={{ borderRadius: 10, margin: 10, padding: 0 }}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ padding: 0, margin: 5 }}
      >
        {cards.map((card, idx) => (
          <View
            key={idx}
            style={{
              width: 170,
              alignItems: "center",
              marginRight: 12,
              backgroundColor: "#fff",
              borderRadius: 10,
              padding: 10,
              elevation: 2,
            }}
          >
            <Card.Title>{card.title}</Card.Title>
            <Image
              style={{ width: 120, height: 80, marginBottom: 8 }}
              resizeMode="contain"
              source={{ uri: card.uri }}
            />
            <Text>Example</Text>
          </View>
        ))}
      </ScrollView>
    </Card>
  );
};

export default ItemCard;