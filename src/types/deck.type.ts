import type { Pokemon } from "./pokemon.type";

export interface Deck {
    id: number;
    name: string;
    ownerId: number;
    cards: Pokemon[];
}