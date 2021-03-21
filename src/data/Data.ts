import characters from "./characters.json";
import rulesets from "./rulesets.json";
import rules from "./rules.json";
import { IComboBoxOption, IGroup } from "@fluentui/react";
import RulesetType from "./models/enums/RulesetType";
import IRuleset from "./models/IRuleset";
import { saveAs } from "file-saver";
import IRule from "./models/IRule";
import IRuleCharacter from "./models/IRuleCharacter";

export default class Data {
  public static getCharNamesOptions(): IComboBoxOption[] {
    let charNamesOptions: IComboBoxOption[] = [];

    for (let charData of characters) {
      charNamesOptions.push({ key: charData.pk, text: charData.name });
    }

    return charNamesOptions;
  }

  public static getRuleGroupsOptions(): IComboBoxOption[] {
    let ruleGroupsOptions: IComboBoxOption[] = [];

    let ruleGroups = rulesets.filter((ruleset: any) => {
      return ruleset.Type === RulesetType.RuleGroup;
    });

    for (let ruleGroup of ruleGroups) {
      ruleGroupsOptions.push({ key: ruleGroup.Id, text: ruleGroup.Name });
    }

    return ruleGroupsOptions;
  }

  public static getNewRulesetId(): number {
    let newRulesetId: number = 0;
    for (let ruleset of rulesets) {
      if (ruleset.Id > newRulesetId) {
        newRulesetId = ruleset.Id;
      }
    }

    return newRulesetId + 1;
  }

  public static getNewRuleId(): number {
    let newRuleId: number = 0;
    for (let rule of rules) {
      if (rule.Id > newRuleId) {
        newRuleId = rule.Id;
      }
    }

    return newRuleId + 1;
  }

  public static isCharsDataValid(ruleCharacters: IRuleCharacter[]): boolean {
    for(let ruleChar of ruleCharacters) {
      if(ruleChar.PK < 0) {
        return false;
      }
    }

    return true;
  }

  public static async saveRuleset(ruleset: IRuleset): Promise<void> {
    let rulesetsData: IRuleset[] = [];

    Object.assign(rulesetsData, rulesets);
    rulesetsData.push(ruleset);

    saveAs(
      new Blob([JSON.stringify(rulesetsData)], {
        type: "application/json",
      }),
      "rulesets.json"
    );
  }

  public static async saveRule(rule: IRule): Promise<void> {
    let rulesData: IRule[] = [];

    Object.assign(rulesData, rules);
    rulesData.push(rule);

    saveAs(
      new Blob([JSON.stringify(rulesData)], {
        type: "application/json",
      }),
      "rules.json"
    );
  }

  public static async getRulesetsGroupedData(): Promise<
    [IRuleset[], IGroup[]]
  > {
    let groupedData: any = {};
    groupedData[0] = { Name: "No Group", Data: [] };

    for (let ruleset of rulesets) {
      if (ruleset.Type === RulesetType.RuleGroup) {
        if (groupedData[ruleset.Id] === undefined) {
          groupedData[ruleset.Id] = { Name: ruleset.Name, Data: [] };
        } else {
          groupedData[ruleset.Id].Name = ruleset.Name;
        }
      } else {
        if (ruleset.RuleGroup) {
          if (groupedData[ruleset.RuleGroup] === undefined) {
            groupedData[ruleset.RuleGroup] = { Name: "Unknown", Data: [] };
            groupedData[ruleset.RuleGroup].Data.push(ruleset as IRuleset);
          } else {
            groupedData[ruleset.RuleGroup].Data.push(ruleset as IRuleset);
          }
        } else {
          groupedData[0].Data.push(ruleset as IRuleset);
        }
      }
    }

    return this.arrangeGroups(groupedData);
  }

  public static getRuleGroupName(ruleGroupId: number): string {
    let filteredRulesets = rulesets.filter((ruleset) => {
      return ruleset.Id === ruleGroupId;
    });
    if (filteredRulesets.length > 0) {
      return filteredRulesets[0].Name;
    }

    return "";
  }

  private static arrangeGroups(groupedData: any): [IRuleset[], IGroup[]] {
    let rulesetsData: IRuleset[] = [];
    let groups: IGroup[] = [];

    let startIndex: number = 0;

    for (let key of Object.keys(groupedData)) {
      if (key !== "0") {
        let dataCount: number = groupedData[key].Data.length;

        groups.push({
          key: key,
          name: groupedData[key].Name,
          startIndex: startIndex,
          count: dataCount,
          level: 0,
        });

        startIndex += dataCount;

        rulesetsData.push(...groupedData[key].Data);
      }
    }

    rulesetsData.push(...groupedData[0].Data);

    return [rulesetsData, groups];
  }

  public static async getRulesByRulesetId(rulesetId: number): Promise<IRule[]> {
    let rulesData: IRule[] = [];
    for(let rule of rules) {
      if(rule.RulesetId === rulesetId) {
        rulesData.push(rule as IRule);
      }
    }

    return rulesData;
  }

  public static getBaseIdFromChar(pk: number): string {
    let filteredCharacters = characters.filter((character)=> {
      return character.pk === pk;
    });

    if(filteredCharacters.length > 0) {
      return filteredCharacters[0].base_id;
    }

    return "";
  }
}
