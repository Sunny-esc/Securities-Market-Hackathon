import React from "react";
export function Icon({ as: IconComp, ...props }) {
  return IconComp ? <IconComp {...props} /> : null;
}