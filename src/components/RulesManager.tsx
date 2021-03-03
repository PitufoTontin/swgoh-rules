import { IconButton } from "@fluentui/react";
import React from "react";
import IRulesManagerProps from "./IRulesManagerProps";

const RulesManager: React.FunctionComponent<IRulesManagerProps> = (
  props: IRulesManagerProps
) => {
  return (
    <div>
      <span>Rules manager!</span>
      <IconButton
        iconProps={{ iconName: "Add" }}
        onClick={() => props.edit()}
      />
    </div>
  );
};

export default RulesManager;
