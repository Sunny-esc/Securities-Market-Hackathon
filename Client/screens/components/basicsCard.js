import { Button, Card, Text } from "react-native-paper";

const BasicsCard = () => (
  <Card
    elevation={20}
    style={{
      margin: 10,
      borderRadius: 10,
      height: 180,
      paddingTop: 25,
    }}
  >
    <Card.Title
      title="New to Investment ?"
      titleStyle={{ fontSize: 26, color: "#fff", fontWeight: "700" }}
      subtitle="Start exploring world of investments"
      subtitleStyle={{ fontSize: 16, color: "#fff", fontWeight: "400" }}
    />
    <Card.Actions
      style={{ justifyContent: "flex-start", paddingLeft: 7, paddingTop: 20 }}
    >
      <Button
        style={{ backgroundColor: "#7e8052" }}
        mode="contained"
        onPress={() => console.log("Pressed")}
      >
        <Text style={{ color: "#fff" }}>Explore</Text>
      </Button>
    </Card.Actions>
  </Card>
);

export default BasicsCard;
