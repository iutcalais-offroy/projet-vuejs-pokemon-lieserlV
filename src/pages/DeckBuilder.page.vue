<template>
    <p class="label-top" v-if="connectedUser">Connected User : {{ connectedUser }}</p>

    <n-text class="label-top">Deck ({{ deck.length }} cartes) <br></n-text>
    <n-form class="deck-form">
        <n-form-item label="Nom du Deck">
            <n-input v-model:value="deckName" placeholder="Entrez le nom du deck" />
        </n-form-item>
    </n-form>
    <n-button type="primary" :disabled="!deckName || deck.length === 0" @click="onCreateDeck" class="create-button">
        Créer le Deck
    </n-button>

    <n-form class="search-form">
        <n-form-item label="">
            <n-input v-model:value="search" placeholder="Rechercher un Pokémon" />
        </n-form-item>
    </n-form>

    <div class="pokemon-container">
        <div v-for="pokemon in filteredPokemons" :key="pokemon.id" @click="togglePokemonInDeck(pokemon)"
            :class="{ 'selected': isInDeck(pokemon) }">
            <PokemonCardComponent :pokemon="pokemon" :inDeck="isInDeck(pokemon)" />
        </div>
    </div>
</template>

<script lang="ts" setup>
import { ref, computed } from 'vue';
import { useRouter } from 'vue-router';
import { isLoggedIn, getUser } from '../services/auth.service';
import { getPokemons } from '../services/pokemon.service';
import PokemonCardComponent from '../components/PokemonCard.component.vue';
import type { Pokemon } from '../types/pokemon.type.ts';
import { createDeck } from '../services/deck.service.ts';

const router = useRouter();

const connectedUser = ref<string | null>(null);
const pokemons = ref<Pokemon[]>([]);
const search = ref<string>('');
const deckName = ref<string>('');
const deck = ref<Pokemon[]>([]);
const filteredPokemons = computed(() => {
    return pokemons.value.filter(pokemon => pokemon.name.toLowerCase().includes(search.value.toLowerCase()));
});

// Vérification de l'authentification
if (!isLoggedIn()) {
    router.push('/login');
} else {
    connectedUser.value = getUser();
}

// Récupération des pokémons depuis l'API
try {
    getPokemons().then(data => {
        pokemons.value = data;
    });
} catch (error) {
    console.error(error);
}

// Ajout/Suppression d'un Pokémon dans le deck
const togglePokemonInDeck = (pokemon: Pokemon) => {
    const index = deck.value.findIndex(p => p.id === pokemon.id);
    if (index === -1) {
        deck.value.push(pokemon);
    } else {
        deck.value.splice(index, 1);
    }
};

// Vérification si un Pokémon est dans le deck
const isInDeck = (pokemon: Pokemon) => {
    return deck.value.some(p => p.id === pokemon.id);
};

// Création du deck (en gros on renvoie les infos au service qui renvoie à l'API)
const onCreateDeck = () => {
    createDeck(deckName.value, deck.value);
    deck.value = [];
};
</script>

<style scoped>

.label-top {
    font-weight: bold;
    font-size: 1.2em;
}

.deck-form {
    max-width: 400px;
    margin-left: 0;
    margin-right: auto;
}

.pokemon-container {
    display: flex;
    flex-wrap: wrap;
    gap: 16px; /* Espace entre les cartes */
}

.pokemon-container > div {
    flex: 1 1 calc(20% - 16px); /* Cinq cartes par ligne */
    
    @media (max-width: 1200px) {
        flex: 1 1 calc(25% - 16px); /* Quatre cartes par ligne */
    }

    @media (max-width: 900px) {
        flex: 1 1 calc(33.33% - 16px); /* Trois cartes par ligne */
    }

    @media (max-width: 600px) {
        flex: 1 1 calc(50% - 16px); /* Deux cartes par ligne */
    }

    @media (max-width: 400px) {
        flex: 1 1 calc(100% - 16px); /* Une carte par ligne */
    }
    box-sizing: border-box;
}

.pokemon-container > div.selected {
    border: 2px solid #42b983; /* Green border for selected cards */
    background-color: #e0f7fa; /* Light blue background for selected cards */
}

.search-form {
    max-width: 400px;
    margin-left: 0;
    margin-right: auto;
}


</style>