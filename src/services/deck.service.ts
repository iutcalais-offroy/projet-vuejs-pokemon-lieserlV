import type { Pokemon } from "../types/pokemon.type";

export const getDecks = async () => {
    try {
        const response = await fetch('https://pokemon-api-seyrinian-production.up.railway.app/decks');
        const data = response.json();
        return data;
    } catch (e) {
        throw new Error("Erreur lors de la récupération des decks : " + e);
    }
};

export const getDeckById = async (id: number) => {
    try {
        const response = await fetch(`https://pokemon-api-seyrinian-production.up.railway.app/decks/${id}`);
        const data = response.json();
        return data;
    } catch (e) {
        throw new Error("Erreur lors de la récupération du deck : " + e);
    }
}

export const createDeck = async (name: string, cards: Pokemon[]) => {
    try {
        const response = await fetch('https://pokemon-api-seyrinian-production.up.railway.app/decks', {
            method: 'POST',
            headers: { 
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            },
            body: JSON.stringify({ 
                name, 
                cards: cards.map(pokemon => pokemon.id)
            })
        });

        const data = await response.json();
        if (response.ok) {
            return { success: true, deck: data };
        } else {
            return { success: false, message: data.message || "Erreur inconnue" };
        }
    } catch (e) {
        return { success: false, message: e };
    }
};


export const deleteDeck = async (id: number) => {
    try {
        const response = await fetch(`https://pokemon-api-seyrinian-production.up.railway.app/decks/${id}`, {
            method: 'DELETE',
            headers: { 'Authorization': 'Bearer ' + localStorage.getItem('token') }
        });

        const data = await response.json();
        if (response.ok) {
            return { success: true };
        } else {
            return { success: false, message: data.message };
        }
    } catch (e) {
        return { success: false, message: e };
    }
};

export const getDeckByUserId = async (id: number) => {
    try {
        const response = await fetch(`https://pokemon-api-seyrinian-production.up.railway.app/decks/`);
        const data = await response.json();

        const decks = data.filter((deck: any) => deck.userid === id);
        return decks;
    } catch (e) {
        throw new Error("Erreur lors de la récupération des decks de l'utilisateur : " + e);    
    }
}