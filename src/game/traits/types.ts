export type TraitTrigger =
    | "on-win"
    | "on-hit"
    | "on-damage-taken";

export type TraitTarget =
    | "self"
    | "enemy";

export type TraitEffectType =
    | "experience-gain"
    | "gold-gain"
    | "strength"
    | "dexterity"
    | "constitution"
    | "intelligence"
    | "wisdom"
    | "charisma";

export type TraitEffectOperation =
    | "multiply"
    | "add";

export interface TraitModifierEffect {
    type: "modifier";
    trigger: TraitTrigger | "always";
    target: TraitTarget;
    effect: TraitEffectType;
    operation: TraitEffectOperation;
    value: number;
}

export interface TraitActionEffect {
    type: "action";
    trigger: TraitTrigger;
    action: "basic-attack";
    chance: number;
}

export interface TraitPropertyEffect {
    type: "property";
    property: "flinch-immunity";
    value: boolean;
}

export type TraitEffect =
    | TraitModifierEffect
    | TraitActionEffect
    | TraitPropertyEffect;

export interface Trait {
    id: string;
    name: string;
    description: string;
    effects: TraitEffect[];
}