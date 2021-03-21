import {
  DetailsList,
  IColumn,
  IconButton,
  IGroup,
  Selection,
} from "@fluentui/react";
import React from "react";
import Data from "../data/Data";
import IRuleset from "../data/models/IRuleset";
import IRulesManagerProps from "./IRulesManagerProps";

const columns: IColumn[] = [
  { key: "name", name: "Nombre", fieldName: "Name", minWidth: 300 },
];

const RulesManager: React.FunctionComponent<IRulesManagerProps> = (
  props: IRulesManagerProps
) => {
  const [rulesets, setRulesets] = React.useState<IRuleset[]>([]);
  const [groups, setGroups] = React.useState<IGroup[]>([]);

  const setSelection = () => {
    if (rulesetSelection.getSelectedCount() === 1) {     
      props.edit(
        rulesetSelection.getItems()[rulesetSelection.getSelectedIndices()[0]]
      );
    }
  };

  const rulesetSelection = new Selection({
    onSelectionChanged: setSelection,
  });

  const onRenderColumn = (
    item: IRuleset,
    index: number | undefined,
    column: IColumn | undefined
  ) => {
    const value =
      item && column && column.fieldName
        ? item[column.fieldName as keyof IRuleset] || ""
        : "";

    return <div data-is-focusable={true}>{value}</div>;
  };

  React.useEffect(() => {
    Data.getRulesetsGroupedData().then(
      (groupedData: [IRuleset[], IGroup[]]) => {
        setGroups(groupedData[1]);
        setRulesets(groupedData[0]);
      }
    );
  }, []);

  return (
    <div>
      <span>Rules manager!</span>
      <IconButton
        iconProps={{ iconName: "Add" }}
        onClick={() => props.edit()}
      />
      <DetailsList
        items={rulesets}
        groups={groups}
        selection={rulesetSelection}
        columns={columns}
        ariaLabelForSelectAllCheckbox="Seleccionar todos los elementos"
        ariaLabelForSelectionColumn="Seleccionar columna"
        checkButtonAriaLabel="Seleccionar fila"
        groupProps={{
          showEmptyGroups: true,
        }}
        onRenderItemColumn={onRenderColumn}
      />
    </div>
  );
};

export default RulesManager;
