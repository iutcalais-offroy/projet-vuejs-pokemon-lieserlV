<template>
  <n-text class="title">Liste des decks</n-text>

  <n-data-table :columns="columns" :data="decks" :bordered="true" :row-key="row => row.id" />

  <n-modal v-model:show="isModalOpen">
    <n-card title="Détails du deck" closable @close="isModalOpen = false">
      <n-text>Détails du deck</n-text>

      <div class="pokemon-container">
        <div v-for="pokemon in selectedDeck?.cards || []" :key="pokemon.id">
          <PokemonCardComponent :pokemon="pokemon" />
        </div>
      </div>

      <n-button @click="isModalOpen = false">Fermer</n-button>
    </n-card>
  </n-modal>
</template>

<script lang="ts" setup>
import { ref, h, onMounted } from "vue";
import { NButton, NText, NModal, NCard, NDataTable } from "naive-ui";
import PokemonCardComponent from "../components/PokemonCard.component.vue";
import { getDeckByUserId, deleteDeck } from "../services/deck.service";
import type { Deck } from "../types/deck.type";

// Récupération des decks depuis l'API
const decks = ref([]);

const fetchDecks = async () => {
  const userId = localStorage.getItem("id");
  const tempdeck = await getDeckByUserId(userId ? Number(userId) : 0);
  decks.value = tempdeck.map((deck: Deck) => ({
    ...deck,
    cards: deck.cards.map((card: any) => ({
      ...card,
      id: card.id,
    })),
  }));
  decks.value.sort((a: Deck, b: Deck) => a.id - b.id);
  return decks;
};

onMounted(async () => {
  await fetchDecks();
});

// État du modal et deck sélectionné
const isModalOpen = ref(false);
const selectedDeck = ref<Deck | null>(null);

// Ouvrir le modal avec les détails du deck
const openModal = (deck: Deck) => {
  selectedDeck.value = deck;
  isModalOpen.value = true;
};

// Supprimer un deck
const handleDeleteDeck = async (id: number) => {
  try {
    await deleteDeck(id);
    await fetchDecks(); // Refresh the decks after deletion
  } catch (error) {
    console.error("Failed to delete deck:", error);
  }
};

// Définition des colonnes pour le tableau
const columns = ref([
  { title: "ID", key: "id" },
  { title: "Nom du deck", key: "name" },
  {
    title: "Actions",
    key: "actions",
    render: (row: Deck) =>
      h("div", { class: "action-buttons", style: { gap: "8px", display: "flex" } }, [
      h(
        NButton,
        { type: "primary", size: "small", onClick: () => openModal(row) },
        { default: () => "Détails" }
      ),
      h(
        NButton,
        {
        type: "error",
        size: "small",
        onClick: () => handleDeleteDeck(row.id),
        },
        { default: () => "Supprimer" }
      ),
      ]),
  },
]);
</script>

<style scoped>
.title {
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 16px;
  display: block;
}

.action-buttons {
  display: flex;
  gap: 8px;
}

/* Styles des cartes Pokémon */
.pokemon-container {
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
}

.pokemon-container>div {
  flex: 1 1 calc(20% - 16px);
  box-sizing: border-box;
}

@media (max-width: 1200px) {
  .pokemon-container>div {
    flex: 1 1 calc(25% - 16px);
  }
}

@media (max-width: 900px) {
  .pokemon-container>div {
    flex: 1 1 calc(33.33% - 16px);
  }
}

@media (max-width: 600px) {
  .pokemon-container>div {
    flex: 1 1 calc(50% - 16px);
  }
}

@media (max-width: 400px) {
  .pokemon-container>div {
    flex: 1 1 calc(100% - 16px);
  }
}
</style>
