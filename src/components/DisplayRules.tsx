import { IconButton } from "@fluentui/react";
import IDisplayRulesProps from "./IDisplayRulesProps";

const DisplayRules: React.FunctionComponent<IDisplayRulesProps> = (
  props: IDisplayRulesProps
) => {
  if(!props.rulesetId) {
    return null;
  }

  return (
    <div>
      <span>Rules!</span>
      <IconButton
        iconProps={{ iconName: "Add" }}
        onClick={() => props.edit()}
      />
    </div>
  );
};

export default DisplayRules;
