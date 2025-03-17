<template>
    <p v-if="connectedUser">Connected User : {{ connectedUser }}</p>

    <div class="pokemon-container">
        <div v-for="pokemon in pokemons" :key="pokemon.id">
            <PokemonCardComponent :pokemon="pokemon" />
        </div>
    </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { isLoggedIn, getUser } from '../services/auth.service';
import { getPokemons } from '../services/pokemon.service';
import PokemonCardComponent from '../components/PokemonCard.component.vue';
import type { Pokemon } from '../types/pokemon.type.ts';

const router = useRouter();

const connectedUser = ref<string | null>(null);

const pokemons = ref<Pokemon[]>([]);

if (!isLoggedIn()) {
    router.push('/login');
} else {
    connectedUser.value = getUser();
}

try {
    getPokemons().then(data => {
        pokemons.value = data;
    });
} catch (error) {
    console.error(error);
}
</script>

<style scoped>
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
</style>