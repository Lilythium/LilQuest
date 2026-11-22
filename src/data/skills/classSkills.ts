import type { HealingSkill, EffectSkill, StatSkill, CompositeSkill} from "../../game/skills/types";

export const mend: HealingSkill = {
    type: "healing",
    id: "mend",
    name: "Mend",
    description: "Restores health based on wisdom.",
    baseHealing: 5,
    staminaCost: 2.5,
    cooldown: 200,
    scaling: {
        attribute: "wisdom",
        coefficient: 0.5
    }
};

export const bulwark: EffectSkill = {
    type: "effect",
    id: "bulwark",
    name: "Bulwark",
    description: "Reduce incoming damage by 10%.",
    target: "self",
    staminaCost: 2,
    cooldown: 100,
    effectId: "bulwark",
    effectStacks: 1
};

export const sidestep: EffectSkill = {
    type: "effect",
    id: "sidestep",
    name: "Sidestep",
    description: "Dodge the next attack. If you attack first, receive a crit chance bonus",
    target: "self",
    staminaCost: 2,
    cooldown: 175,
    effectId: "sidestep",
    effectStacks: 1
};

export const recklessAbandon: CompositeSkill = {
    type: "composite",
    id: "reckless-abandon",
    name: "Reckless Abandon",
    description: "Select an attack skill to use. The selected skill will do 2x damage but will slow the user.",
    allowedSkillTypes: ["AttackSkill"],
    staminaCost: 0,
    cooldown: 200,
    scaling: {
        attribute: "strength",
        coefficient: 2
    },
    effectIds: ["slowed"]
};

export const sap: StatSkill = {
    type: "stat",
    id: "sap",
    name: "Sap",
    description: "Steal half of the target's initiative and add it to your own.",
    staminaCost: 2,
    cooldown: 150,
    transfers: [
        {
            id: "drain-initiative",
            type: "ratio",
            stat: { target: "target", stat: "currentInitiative" },
            percentage: 0.5
        },
        {
            type: "previous-transfer",
            transferId: "drain-initiative",
            destination: { target: "self", stat: "currentInitiative" }
        }
    ]
};