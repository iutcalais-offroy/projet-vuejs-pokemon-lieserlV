import type { Pokemon } from "../types/pokemon.type";

export async function getPokemons(): Promise<Pokemon[]> {
    try {
        const response = await fetch('http://localhost:3000/pokemons-cards');
        const data = response.json();
        return data;
    } catch (e) {
        throw new Error("Erreur lors de la récupération des pokemons : " + e);
    }
};

export async function getPokemonById(id: number): Promise<Pokemon> {
    try {
        const response = await fetch(`http://localhost:3000/pokemon-cards/${id}`);
        const data = response.json();
        return data;
    } catch (e) {
        throw new Error("Erreur lors de la récupération du pokemon : " + e);
    }
};