import characters from './characters.json';
import { IComboBoxOption } from "@fluentui/react";

export default class Data {
    public static getCharNamesOptions(): IComboBoxOption[] {
        let charNames: IComboBoxOption[] = [];

        for (let charData of characters) {
            charNames.push({ key: charData.base_id, text: charData.name });
        }

        return charNames;
    }
}