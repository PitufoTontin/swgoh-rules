import characters from './characters.json';
import rulesets from './rulesets.json';
import { IComboBoxOption } from "@fluentui/react";
import RulesetType from './models/enums/RulesetType';
import IRuleset from './models/IRuleset';

export default class Data {
    private static rulesetsData: IRuleset[] = [];

    constructor() {
        Object.assign(Data.rulesetsData, rulesets);
    }

    public static getCharNamesOptions(): IComboBoxOption[] {
        let charNamesOptions: IComboBoxOption[] = [];

        for (let charData of characters) {
            charNamesOptions.push({ key: charData.base_id, text: charData.name });
        }

        return charNamesOptions;
    }

    public static getRuleGroupsOptions(): IComboBoxOption[] {
        let ruleGroupsOptions: IComboBoxOption[] = [];

        let ruleGroups = Data.rulesetsData.filter((ruleset: IRuleset) => {
            return ruleset.Type === RulesetType.RuleGroup;
        });

        for(let ruleGroup of ruleGroups) {
            ruleGroupsOptions.push({key: ruleGroup.Id, text: ruleGroup.Name});
        }

        return ruleGroupsOptions;
    }

    public static getNewRulesetId(): number {
        let newRulesetId: number = 0;
        for(let ruleset of Data.rulesetsData) {
            if(ruleset.Id > newRulesetId) {
                newRulesetId = ruleset.Id;
            }
        }

        return newRulesetId + 1;
    }

    public static async saveRuleset(ruleset: IRuleset): Promise<void> {
        Data.rulesetsData.push(ruleset);
        console.log(Data.rulesetsData);
    }
}