import * as React from "react";
import { FAB, PaperProvider, Portal } from "react-native-paper";

const Filters = () => {
  const [state, setState] = React.useState({ open: false });

  const onStateChange = ({ open }) => setState({ open });

  const { open } = state;

  return (
    <PaperProvider>
      <Portal>
        <FAB.Group
          style={{ position: "absolute" }}
          open={open}
          visible
          icon={open ? "filter" : "filter"}
          actions={[
            {
              icon: "new-box",
              label: "Latest",
              onPress: () => console.log("Pressed add"),
            },
            {
              icon: "star",
              label: "Starred",
              onPress: () => console.log("Pressed star"),
            },
            {
              icon: "arrow-down",
              label: "Popular High-Low",
              onPress: () => console.log("Pressed email"),
            },
            {
              icon: "arrow-up",
              label: "Popular Low-High",
              onPress: () => console.log("Pressed notifications"),
            },
          ]}
          onStateChange={onStateChange}
          onPress={() => {
            if (open) {
              // do something if the speed dial is open
            }
          }}
        />
      </Portal>
    </PaperProvider>
  );
};

export default Filters;
