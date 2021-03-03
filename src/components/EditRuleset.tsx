import {
  ChoiceGroup,
  ComboBox,
  IChoiceGroupOption,
  IComboBox,
  IComboBoxOption,
  IconButton,
  IIconProps,
  ITooltipHostStyles,
  Slider,
  SpinButton,
  TextField,
  TooltipHost,
} from "@fluentui/react";
import { useId } from "@fluentui/react-hooks";
import React from "react";
import Data from "../data/Data";
import RulesetType from "../data/models/enums/RulesetType";
import IRuleset from "../data/models/IRuleset";

const rulesetTypeOptions: IChoiceGroupOption[] = [
  { key: RulesetType.RuleSet, text: "Conjunto de Reglas" },
  { key: RulesetType.RuleGroup, text: "Grupo de Reglas" },
];

const gearLevelOptions: IComboBoxOption[] = [
  { key: "1", text: "I" },
  { key: "2", text: "II" },
  { key: "3", text: "III" },
  { key: "4", text: "IV" },
  { key: "5", text: "V" },
  { key: "6", text: "VI" },
  { key: "7", text: "VII" },
  { key: "8", text: "VIII" },
  { key: "9", text: "IX" },
  { key: "10", text: "X" },
  { key: "11", text: "XI" },
  { key: "12", text: "XII" },
  { key: "13", text: "XIII" },
];

const saveIcon: IIconProps = { iconName: "Save" };
const calloutProps = { gapSpace: 0 };
const hostStyles: Partial<ITooltipHostStyles> = {
  root: { display: "inline-block" },
};

const EditRuleset: React.FunctionComponent = () => {
  const savetooltipId = useId("savetooltip");

  const [rulesetName, setRulesetName] = React.useState<string | undefined>("");

  const [selectedTypeKey, setSelectedType] = React.useState<string>(
    RulesetType.RuleSet
  );
  const onChangeType = React.useCallback(
    (
      ev: React.FormEvent<HTMLElement | HTMLInputElement> | undefined,
      option?: IChoiceGroupOption | undefined
    ) => {
      if (option) {
        setSelectedType(option.key);
      }
    },
    []
  );

  const [rarityValue, setRarityValue] = React.useState(7);
  const raritySliderOnChange = (value: number) => setRarityValue(value);

  const [relicValue, setRelicValue] = React.useState(5);
  const relicSliderOnChange = (value: number) => setRelicValue(value);

  const [levelValue, setLevelValue] = React.useState(85);
  const levelSpinOnChange = (value: string) => setLevelValue(Number(value));

  const [selectedGearLevel, selectGearLevel] = React.useState<string>("XII");
  const changeGearLevelCombobox = (
    event: React.FormEvent<IComboBox>,
    option?: IComboBoxOption
  ) => {
    if (option) {
      selectGearLevel(option.key.toString());
    }
  };

  const [selectedRuleGroup, selectRuleGroup] = React.useState<number | null>(
    null
  );
  const [ruleGroupsOptions] = React.useState<IComboBoxOption[]>(
    Data.getRuleGroupsOptions()
  );
  const changeRuleGroupCombobox = (
    event: React.FormEvent<IComboBox>,
    option?: IComboBoxOption
  ) => {
    if (option) {
      selectRuleGroup(Number(option.key.toString()));
    }
  };

  const saveRuleset = React.useCallback(() => {
    let newRuleset: IRuleset = {
      Id: Data.getNewRulesetId(),
      Name: rulesetName ? rulesetName : "",
      DefaultStars: rarityValue,
      DefaulLevel: levelValue,
      DefaultGearLevel: Number(selectedGearLevel),
      DefaultRelicLevel: relicValue,
      RuleGroup: selectedRuleGroup ? selectedRuleGroup : undefined,
      Type: selectedTypeKey as RulesetType,
    };

    Data.saveRuleset(newRuleset);
  }, [
    rarityValue,
    rulesetName,
    selectedGearLevel,
    selectedRuleGroup,
    selectedTypeKey,
    levelValue,
    relicValue,
  ]);

  return (
    <div>
      <span>Ruleset</span>
      <ChoiceGroup
        selectedKey={selectedTypeKey}
        options={rulesetTypeOptions}
        onChange={onChangeType}
        label="Elige conjunto/grupo de reglas a crear"
      />
      <TextField
        label="Nombre"
        placeholder="Nombre"
        required
        onChange={(event, newValue) => setRulesetName(newValue)}
      />
      <Slider
        label="Estrellas"
        min={1}
        max={7}
        defaultValue={7}
        value={rarityValue}
        showValue
        snapToStep
        onChange={raritySliderOnChange}
      />
      <SpinButton
        defaultValue="85"
        label={"Nivel"}
        min={1}
        max={85}
        step={1}
        value={levelValue.toString()}
        incrementButtonAriaLabel={"Incrementa el valor en 1"}
        decrementButtonAriaLabel={"Decrementa el valor en 1"}
        onIncrement={levelSpinOnChange}
        onDecrement={levelSpinOnChange}
      />
      <ComboBox
        label="Nivel de Equipo"
        allowFreeform={true}
        autoComplete={"on"}
        options={gearLevelOptions}
        onChange={changeGearLevelCombobox}
        selectedKey={selectedGearLevel}
        defaultSelectedKey="12"
      />
      <Slider
        label="Reliquia"
        min={1}
        max={8}
        defaultValue={5}
        value={relicValue}
        showValue
        snapToStep
        onChange={relicSliderOnChange}
      />
      {selectedTypeKey === RulesetType.RuleSet ? (
        <ComboBox
          label="Grupo de Reglas"
          allowFreeform={true}
          autoComplete={"on"}
          options={ruleGroupsOptions}
          onChange={changeRuleGroupCombobox}
          selectedKey={selectedRuleGroup}
        />
      ) : null}
      <TooltipHost
        content="Guardar"
        id={savetooltipId}
        calloutProps={calloutProps}
        styles={hostStyles}
      >
        <IconButton
          iconProps={saveIcon}
          title="Guardar"
          ariaLabel="Guardar"
          onClick={saveRuleset}
        />
      </TooltipHost>
    </div>
  );
};

export default EditRuleset;
