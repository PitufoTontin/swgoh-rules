import RulesetType from "./enums/RulesetType";

export default interface IRuleset {
    Id: number;
    Name: string;
    DefaultStars: number;
    DefaulLevel: number;
    DefaultGearLevel: number;
    DefaultRelicLevel: number;
    RuleGroup?: number;
    Type: RulesetType;
}