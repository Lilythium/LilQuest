export interface Skill {
    id: string;
    name: string;
    description: string;
}

// NOTE: this is a placeholder for now 
// Not sure if I want to keep exhaustion (stamina cost for using ability)
// Or cooldown (time before you can use ability again) or both
export interface AttackSkill extends Skill {
    damage_formula: number;
    exhaustion: number;
    cooldown: number;
}