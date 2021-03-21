import {
  ComboBox,
  IComboBox,
  IComboBoxOption,
  Image,
  Slider,
  SpinButton,
  Stack,
} from "@fluentui/react";
import React from "react";
import Data from "../data/Data";
import IRuleCharacter from "../data/models/IRuleCharacter";
import ICharacterSelectorProps from "./ICharacterSelectorProps";

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

const CharacterSelector: React.FunctionComponent<ICharacterSelectorProps> = (
  props: ICharacterSelectorProps
) => {
  const updateCharData = props.updateCharData;
  const [charOptions] = React.useState<IComboBoxOption[]>(
    Data.getCharNamesOptions()
  );
  const [selectedChar, selectChar] = React.useState<number>(-1);
  const [selectedCharBaseId, selectCharBaseId] = React.useState<string>("");

  const changeCharCombobox = (
    event: React.FormEvent<IComboBox>,
    option?: IComboBoxOption
  ) => {
    if (option) {
      selectChar(Number(option.key));
    }
  };

  const [rarityValue, setRarityValue] = React.useState(
    props.ruleCharacter.Stars
  );
  const raritySliderOnChange = (value: number) => setRarityValue(value);

  const [levelValue, setLevelValue] = React.useState(props.ruleCharacter.Level);
  const levelSpinUpOnChange = (value: string) => {
    const newValue: number = Number(value);
    if (newValue < 85) {
      setLevelValue(newValue + 1);
    }
  };
  const levelSpinDownOnChange = (value: string) => {
    const newValue: number = Number(value);
    if (newValue > 1) {
      setLevelValue(newValue - 1);
    }
  };

  const [selectedGearLevel, selectGearLevel] = React.useState<string>(
    props.ruleCharacter.GearLevel.toString()
  );
  const changeGearLevelCombobox = (
    event: React.FormEvent<IComboBox>,
    option?: IComboBoxOption
  ) => {
    if (option) {
      selectGearLevel(option.key.toString());

      if (Number(option.key) < 13) {
        setRelicValue(0);
      }
    }
  };

  const [relicValue, setRelicValue] = React.useState(
    props.ruleCharacter.RelicLevel
  );
  const relicSliderOnChange = (value: number) => {
    setRelicValue(value);
    if (value > 0) {
      selectGearLevel("13");
    }
  };

  React.useEffect(() => {
    let charData: IRuleCharacter = {
      AlternativeTo: -1,
      GearLevel: Number(selectedGearLevel),
      Order: -1,
      Level: levelValue,
      PK: selectedChar,
      RelicLevel: relicValue,
      Stars: rarityValue,
    };

    updateCharData(charData);
  }, [
    selectedChar,
    selectedGearLevel,
    levelValue,
    relicValue,
    rarityValue,
    updateCharData,
  ]);

  React.useEffect(()=> {
    selectCharBaseId(Data.getBaseIdFromChar(selectedChar));
  },
  [selectedChar]);

  return (
    <div>
      <ComboBox
        label="Character"
        allowFreeform={true}
        autoComplete={"on"}
        options={charOptions}
        onChange={changeCharCombobox}
      />

      <Stack tokens={{ childrenGap: 10 }}>
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
        {selectedCharBaseId && (
          <Image
            src={`./character_images/${selectedCharBaseId}.png`}
            alt={selectedCharBaseId}
          />
        )}
      </Stack>
    </div>
  );
};

export default CharacterSelector;
