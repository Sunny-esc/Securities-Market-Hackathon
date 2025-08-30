import { Header } from "@rneui/base";
import BasicsCard from "./basicsCard";
import Draw from "./drawer";
import Notification from "./notification";


export default () => {
  return (
    <>
    <Header
        backgroundColor="#7e8052"
      backgroundImageStyle={{}}
      barStyle="light-content"
      centerComponent={{
        text: "My App",
        style: { color: "#fff", fontSize: 25, fontWeight: "bold", paddingTop: 8 },
      }}
      centerContainerStyle={{}}
      containerStyle={{ width: "100%" }}
      leftComponent={<Draw />}
      leftContainerStyle={{}}
      linearGradientProps={{}}
      placement="left"
      rightComponent={<Notification />}
      rightContainerStyle={{}}
      statusBarProps={{}}
    />
    <BasicsCard/>
    </>
  );
}