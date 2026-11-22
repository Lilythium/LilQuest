// ignore will add stacks that tick down one at a time
// replace will only allow one stack, reapplying resets duration
export type StackingPolicy = "ignore" | "add" | "multiply" | "replace";

export interface StatusEffectDefinition {
    id: string;
    name: string;
    description: string;
    stackingPolicy: StackingPolicy;
}