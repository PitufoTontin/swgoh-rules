import EditionMode from "./EditionMode";

export default interface IAppStatus {  
    editionMode: EditionMode;
    ruleId?: number;
    rulesetId?: number;
}