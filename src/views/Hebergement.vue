<template>
  <div class="hebergements">
    <h1>Hébergements en Terre du Milieu</h1>
    <p>
      La Terre du Milieu offre de nombreux hébergements confortables pour se reposer après une longue journée d'aventure.
    </p>
    <HebergementCard v-for="hebergementItem in hebergements" :key="hebergementItem.id" :hebergement="hebergementItem" />
  </div>
</template>

<script setup>
import {ref, onMounted} from 'vue';
import api from "@/services/api";
import HebergementCard from "@/components/HebergementCard.vue";

const hebergements = ref([]);

onMounted(async () => {
  try {
    const response = await api.get('/api/hebergements');
    hebergements.value = response.data;
  } catch (error) {
    console.error('Erreur lors de la récupération des hébergements:', error);
  }
});
</script>

<style scoped>
/* ... vos styles pour Hebergement.vue ici ... */
</style>
