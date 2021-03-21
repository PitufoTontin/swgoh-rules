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
  Stack,
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
  const relicSliderOnChange = (value: number) => {
    setRelicValue(value);
    if (value > 0) {
      selectGearLevel("13");
    }
  };

  const [levelValue, setLevelValue] = React.useState(85);
  const levelSpinUpOnChange = (value: string) => {
    const newValue: number = Number(value);
    if(newValue < 85) {
      setLevelValue(newValue + 1);
    }    
  }
  const levelSpinDownOnChange = (value: string) => {
    const newValue: number = Number(value);
    if(newValue > 1) {
      setLevelValue(newValue - 1);
    }   
  }

  const [selectedGearLevel, selectGearLevel] = React.useState<string>("13");
  const changeGearLevelCombobox = (
    event: React.FormEvent<IComboBox>,
    option?: IComboBoxOption
  ) => {
    if (option) {
      selectGearLevel(option.key.toString());

      if(Number(option.key) < 13) {
        setRelicValue(0);
      }
    }
  };

  const [selectedRuleGroup, selectRuleGroup] = React.useState<number | null>(
    null
  );
  const [ruleGroupsOptions, setRuleGroupsOptions] = React.useState<
    IComboBoxOption[]
  >(Data.getRuleGroupsOptions());
  const changeRuleGroupCombobox = (
    event: React.FormEvent<IComboBox>,
    option?: IComboBoxOption
  ) => {
    if (option) {
      selectRuleGroup(Number(option.key.toString()));
    }
  };

  const [errorEmptyName, setErrorEmptyName] = React.useState("");

  const setDefaultValues = () => {
    setRulesetName("");
    setRarityValue(7);
    setLevelValue(85);
    selectGearLevel("13");
    setRelicValue(5);
  };

  const saveRuleset = React.useCallback(() => {
    if (!rulesetName) {
      setErrorEmptyName("Debe introducir un nombre para el conjunto de reglas");
      return;
    }

    let newRuleset: IRuleset = {
      Id: Data.getNewRulesetId(),
      Name: rulesetName ? rulesetName : "",
      DefaultStars: rarityValue,
      DefaultLevel: levelValue,
      DefaultGearLevel: Number(selectedGearLevel),
      DefaultRelicLevel: relicValue,
      RuleGroup: selectedRuleGroup ? selectedRuleGroup : undefined,
      Type: selectedTypeKey as RulesetType,
    };

    Data.saveRuleset(newRuleset);
    if (selectedTypeKey === RulesetType.RuleGroup) {
      setRuleGroupsOptions(Data.getRuleGroupsOptions());
    }
    setDefaultValues();
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
      <Stack horizontal tokens={{ childrenGap: 50 }}>
        <Stack>
          <TextField
            value={rulesetName}
            label="Nombre"
            placeholder="Nombre"
            required
            onChange={(event, newValue) => setRulesetName(newValue)}
            errorMessage={errorEmptyName}
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
        </Stack>
        <Stack>
          <Slider
            label="Estrellas"
            min={1}
            max={7}
            value={rarityValue}
            showValue
            snapToStep
            onChange={raritySliderOnChange}
          />
          <SpinButton
            label={"Nivel"}
            min={1}
            max={85}
            step={1}
            value={levelValue.toString()}
            incrementButtonAriaLabel={"Incrementa el valor en 1"}
            decrementButtonAriaLabel={"Decrementa el valor en 1"}
            onIncrement={levelSpinUpOnChange}
            onDecrement={levelSpinDownOnChange}
          />
        </Stack>
        <Stack>
          <ComboBox
            label="Nivel de Equipo"
            allowFreeform={true}
            autoComplete={"on"}
            options={gearLevelOptions}
            onChange={changeGearLevelCombobox}
            selectedKey={selectedGearLevel}
          />
          <Slider
            label="Reliquia"
            min={0}
            max={8}
            value={relicValue}
            showValue
            snapToStep
            onChange={relicSliderOnChange}
          />
        </Stack>
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
      </Stack>
    </div>
  );
};

export default EditRuleset;
