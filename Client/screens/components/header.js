import { Header } from "@rneui/base";
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
          text: "INV.edu",
          style: {
            color: "#fff",
            fontSize: 25,
            fontWeight: "bold",
            paddingTop: 11,
          },
        }}
        centerContainerStyle={{}}
        containerStyle={{ width: "100%" }}
        leftComponent={<Draw />}
        leftContainerStyle={{}}
        linearGradientProps={{}}
        placement="center"
        rightComponent={<Notification />}
        rightContainerStyle={{}}
        statusBarProps={{}}
      />
    </>
  );
};
