import {
  IconButton,
  IIconProps,
  ITooltipHostStyles,
  Stack,
  TextField,
  TooltipHost,
} from "@fluentui/react";
import { useId } from "@fluentui/react-hooks";
import React from "react";
import Data from "../data/Data";
import IRule from "../data/models/IRule";
import IRuleCharacter from "../data/models/IRuleCharacter";
import IRuleset from "../data/models/IRuleset";
import CharacterSelector from "./CharacterSelector";
import IEditRuleProps from "./IEditRuleProps";

const saveIcon: IIconProps = { iconName: "Save" };
const calloutProps = { gapSpace: 0 };
const hostStyles: Partial<ITooltipHostStyles> = {
  root: { display: "inline-block" },
};

const initializeRuleCharacters = (
  charactersNumber: number,
  ruleset: IRuleset
): IRuleCharacter[] => {
  let emptyCharacters: IRuleCharacter[] = [];

  if (charactersNumber > 0) {
    for (let index: number = 0; index < charactersNumber; index++) {
      emptyCharacters.push({
        AlternativeTo: -1,
        GearLevel: ruleset.DefaultGearLevel,
        Order: -1,
        Level: ruleset.DefaultLevel,
        PK: -1,
        RelicLevel: ruleset.DefaultRelicLevel,
        Stars: ruleset.DefaultStars,
      });
    }
  }

  return emptyCharacters;
};

const EditRule: React.FunctionComponent<IEditRuleProps> = (
  props: IEditRuleProps
) => {
  const savetooltipId = useId("savetooltip");
  const rulesetId = props.ruleset.Id;

  const [ruleName, setRuleName] = React.useState<string | undefined>("");
  const [errorEmptyName, setErrorEmptyName] = React.useState("");

  const [ruleCharacters] = React.useState<IRuleCharacter[]>(
    initializeRuleCharacters(5, props.ruleset)
  );

  const updateCharData = React.useCallback(
    (charIndex: number, charData: IRuleCharacter) => {
      ruleCharacters[charIndex] = charData;
    },
    [ruleCharacters]
  );

  const saveRule = React.useCallback(() => {
    if (!ruleName) {
      setErrorEmptyName("Debe introducir un nombre para la regla");
      return;
    }

    if(!Data.isCharsDataValid(ruleCharacters)) {
      return;
    }

    let rule: IRule = {
      Id: Data.getNewRuleId(),
      Name: ruleName,
      RuleCharacters: ruleCharacters,
      RulesetId: rulesetId,
    }

    Data.saveRule(rule);
  }, [ruleName, ruleCharacters, rulesetId]);

  return (
    <div>
      <Stack>
        <span>
          Rule under{" "}
          <b>{`${
            props.ruleset.RuleGroup
              ? `${Data.getRuleGroupName(props.ruleset.RuleGroup)} `
              : ""
          }${props.ruleset.Name}`}</b>
        </span>
        <TextField
          value={ruleName}
          label="Nombre"
          placeholder="Nombre"
          required
          onChange={(event, newValue) => setRuleName(newValue)}
          errorMessage={errorEmptyName}
        />
      </Stack>
      <Stack horizontal tokens={{ childrenGap: 50 }}>
        {ruleCharacters.map((ruleCharacter: IRuleCharacter, index: number) => {
          return (
            <CharacterSelector
              ruleCharacter={ruleCharacter}
              updateCharData={(charData: IRuleCharacter) =>
                updateCharData(index, charData)
              }
            />
          );
        })}
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
            onClick={saveRule}
          />
        </TooltipHost>
      </Stack>
    </div>
  );
};

export default EditRule;
