import { ComboBox, IComboBox, IComboBoxOption, Image } from "@fluentui/react";
import React from "react";
import Data from "../data/Data";

const EditRule: React.FunctionComponent = () => {
  const [charOptions] = React.useState<IComboBoxOption[]>(Data.getCharNamesOptions());
  const [selectedChar, selectChar] = React.useState<string>("");

  const changeCharCombobox = (
    event: React.FormEvent<IComboBox>,
    option?: IComboBoxOption
  ) => {
    if (option) {
      selectChar(option.key.toString());
    }
  };

  return (
    <div>
      <ComboBox
        label="Character"
        allowFreeform={true}
        autoComplete={"on"}
        options={charOptions}
        onChange={changeCharCombobox}
      />
      {selectedChar && (
        <div>
          <Image
            src={`./character_images/${selectedChar}.png`}
            alt={selectedChar}
          />
          {selectedChar}
        </div>
      )}
    </div>
  );
};

export default EditRule;
