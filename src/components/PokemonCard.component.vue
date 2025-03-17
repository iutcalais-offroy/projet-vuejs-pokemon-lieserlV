<template>
    <n-card class="pokemon-card">
        <img :src="pokemon.imageUrl" :alt="pokemon.name" class="pokemon-image" />
        <div class="pokemon-top">
            <n-text class="pokemon-name">{{ pokemon.name }}</n-text>
            <n-text class="pokemon-life" style="color: red;">{{ pokemon.lifePoints }} PV</n-text>
            <n-tag :style="{ backgroundColor: getTypeColor(pokemon.type.name) }" class="pokemon-type">{{
                pokemon.type.name }}</n-tag>
        </div>
        <div class="pokemon-height-weight">
            <n-text>Taille : {{ pokemon.height }}m | Poids : {{ pokemon.weight }} kg </n-text>
        </div>
        <div class="pokemon-attacks">
            <n-text class="pokemon-attack-name">{{ pokemon.attack.name }}</n-text>
            <n-text class="pokemon-attack-damages">{{ pokemon.attack.damages }} PV</n-text>
        </div>
    </n-card>
</template>

<script lang="ts" setup>
import { NCard } from 'naive-ui';
import { defineProps } from 'vue';

import type { Pokemon } from '../types/pokemon.type';

const props = defineProps<{ pokemon: Pokemon }>();

const getTypeColor = (type: string) => {
    switch (type.toLowerCase()) {
        case 'fire': return '#F08030';
        case 'water': return '#6890F0';
        case 'grass': return '#78C850';
        case 'electric': return '#F8D030';
        case 'ice': return '#98D8D8';
        case 'fighting': return '#C03028';
        case 'poison': return '#A040A0';
        case 'ground': return '#E0C068';
        case 'flying': return '#A890F0';
        case 'psychic': return '#F85888';
        case 'bug': return '#A8B820';
        case 'rock': return '#B8A038';
        case 'ghost': return '#705898';
        case 'dragon': return '#7038F8';
        case 'dark': return '#705848';
        case 'steel': return '#B8B8D0';
        case 'fairy': return '#EE99AC';
        default: return '#A8A878';
    }
};
</script>

<style scoped>
.pokemon-card {
    width: 300px;
    border: 1px solid #ccc;
    border-radius: 10px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    overflow: hidden;
    text-align: center;
    background-color: #fff;
    margin: 10px;
}

.pokemon-image {
    width: 100%;
    height: auto;
}

.pokemon-top {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px;
    margin: 10px;
}

.pokemon-name {
    font-size: 1.2em;
    font-weight: bold;
    text-align: left;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}

.pokemon-life {
    font-size: 1.2em;
    font-weight: bold;
    text-align: center;
}

.pokemon-type {
    padding: 5px 10px;
    border-radius: 5px;
    text-align: right;
}

.pokemon-height-weight {
    padding: 10px;
    margin: 10px; 
    font-size: 0.9em;
    color: #666;
}

.pokemon-attacks {
    padding: 10px;
    background-color: #f0f0f0;
    border-radius: 5px;
}

.pokemon-attack {
    margin: 10px;
}

.pokemon-attack-name {
    font-size: 1.1em;
    font-weight: bold;
    text-align: left;
    display: inline-block;
    width: 70%;
}

.pokemon-attack-damages {
    font-size: 1em;
    color: red;
    text-align: right;
    display: inline-block;
    width: 30%;
}

.pokemon-container {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
}
</style>
