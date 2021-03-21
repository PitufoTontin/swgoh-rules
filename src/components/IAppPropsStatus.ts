import IRuleset from "../data/models/IRuleset";
import EditionMode from "./EditionMode";

export default interface IAppStatus {  
    editionMode: EditionMode;
    ruleId?: number;
    ruleset?: IRuleset;
}