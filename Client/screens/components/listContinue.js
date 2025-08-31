import { Avatar, ListItem } from "@rneui/base";
import React from "react";
import Progress from "./progressBar";

export default function ListContinue() {
  const [expanded, setExpanded] = React.useState(false);
  return (
    <>
      <ListItem.Accordion
        style={{ backgroundColor: "#f0f0f0", padding: 10 }}
        content={
          <ListItem.Content>
            <ListItem.Title>CONTINUE WHERE YOU LEFT</ListItem.Title>
            <ListItem.Subtitle>Tap to expand</ListItem.Subtitle>
          </ListItem.Content>
        }
        isExpanded={expanded}
        onPress={() => {
          setExpanded(!expanded);
        }}
      >
        <ListItem>
          <Avatar
            rounded
            source={{
              uri: "https://reactnative.dev/img/tiny_logo.png",
            }}
          />
          <ListItem.Content>
            <ListItem.Title>Some Tutorial</ListItem.Title>
            <ListItem.Subtitle>Description</ListItem.Subtitle>
          </ListItem.Content>
        </ListItem>
        <Progress />
      </ListItem.Accordion>
    </>
  );
}
