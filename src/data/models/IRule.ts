import IRuleCharacter from "./IRuleCharacter";

export default interface IRule {    
    Id: number;
    RulesetId: number;
    Name: string;   
    RuleCharacters: IRuleCharacter[];
}