import { ScrollView, View } from "react-native";
import { Avatar, Button, Card, Text } from "react-native-paper";
import { SafeAreaProvider } from "react-native-safe-area-context";

const LeftContent = (props) => <Avatar.Icon {...props} icon="folder" />;

const VidCard = () => (
  <SafeAreaProvider style={{ flex: 1 }}>
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.cardGrid}>
        {Array.from({ length: 8 }).map((_, i) => (
          <Card key={i} theme={{ roundness: 5 }} style={styles.card}>
            <Card.Content>
              <Text variant="titleLarge">Card title</Text>
              <Text variant="bodyMedium">Card content</Text>
            </Card.Content>
            <Card.Actions>
              <Button>Watch</Button>
            </Card.Actions>
          </Card>
        ))}
      </View>
    </ScrollView>
  </SafeAreaProvider>
);

const styles = {
  scrollContainer: {
    paddingTop: 20,
    paddingBottom: 50,
    alignItems: "center",
  },
  cardGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    gap: 20,
  },
  card: {
    width: "45%",
    margin: 0,
    padding: 0,
  },
};

export default VidCard;
