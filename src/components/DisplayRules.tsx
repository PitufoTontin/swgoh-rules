import {
  DetailsList,
  IconButton,
  SelectionMode,
  Selection,
  IColumn,
} from "@fluentui/react";
import React from "react";
import Data from "../data/Data";
import IRule from "../data/models/IRule";
import IDisplayRulesProps from "./IDisplayRulesProps";

const columns: IColumn[] = [
  { key: "name", name: "Nombre", fieldName: "Name", minWidth: 300 },
];

const DisplayRules: React.FunctionComponent<IDisplayRulesProps> = (
  props: IDisplayRulesProps
) => { 
  const [rules, setRules] = React.useState<IRule[]>([]);

  const setSelection = () => {};

  const ruleSelection = new Selection({
    onSelectionChanged: setSelection,
  });

  const onRenderColumn = (
    item: IRule,
    index: number | undefined,
    column: IColumn | undefined
  ) => {
    const value =
      item && column && column.fieldName
        ? item[column.fieldName as keyof IRule] || ""
        : "";

    return <div data-is-focusable={true}>{value}</div>;
  };

  React.useEffect(() => {
    if(props.ruleset) {
      Data.getRulesByRulesetId(props.ruleset?.Id).then(
        (rules: IRule[]) => {
          setRules(rules);
        }
      );
    }    
  }, [props.ruleset]);

  if (!props.ruleset) {
    return null;
  }

  return (
    <div>
      <span>Rules!</span>
      <IconButton
        iconProps={{ iconName: "Add" }}
        onClick={() => props.edit()}
      />
      <DetailsList
        selectionMode={SelectionMode.single}
        items={rules}
        selection={ruleSelection}
        columns={columns}
        ariaLabelForSelectionColumn="Seleccionar columna"
        checkButtonAriaLabel="Seleccionar fila"
        onRenderItemColumn={onRenderColumn}
      />
    </div>
  );
};

export default DisplayRules;
