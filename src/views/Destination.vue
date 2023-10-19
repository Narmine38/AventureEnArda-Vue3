<template>
  <div class="destinations">
    <h1>Destinations en Terre du Milieu</h1>
    <p>
      La Terre du Milieu est vaste et offre une variété de lieux magnifiques et mystérieux à explorer.
    </p>
    <PlaceCard v-for="lieuItem in lieux" :key="lieuItem.id" :lieu="lieuItem" />
  </div>
</template>

<script setup>
import {ref, onMounted} from 'vue';
import api from "@/services/api";
import PlaceCard from "@/components/PlaceCard.vue";

const lieux = ref([]);

onMounted(async () => {
  try {
    const response = await api.get('/api/lieux');
    lieux.value = response.data;
  } catch (error) {
    console.error('Erreur lors de la récupération des lieux:', error);
  }
});
</script>

<style scoped>
/* ... vos styles pour Destinations.vue ici ... */
</style>
