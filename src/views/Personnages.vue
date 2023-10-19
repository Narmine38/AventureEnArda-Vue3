<template>
  <div class="personnages">
    <h1>Personnages de la Terre du Milieu</h1>
    <p>
      Découvrez les personnages emblématiques qui ont marqué l'histoire de la Terre du Milieu.
    </p>
    <PersonnageCard v-for="personnageItem in personnages" :key="personnageItem.id" :personnage="personnageItem" />
  </div>
</template>

<script setup>
import {ref, onMounted} from 'vue';
import api from "@/services/api";
import PersonnageCard from "@/components/PersonnageCard.vue";  // Assurez-vous de créer ce composant

const personnages = ref([]);

onMounted(async () => {
  try {
    const response = await api.get('/api/personnages');
    personnages.value = response.data;
  } catch (error) {
    console.error('Erreur lors de la récupération des personnages:', error);
  }
});
</script>

<style scoped>
/* ... vos styles pour Personnages.vue ici ... */
</style>
