<template>
  <div class="user-card">
    <h2>{{ user.name }}</h2>
    <p>Email: {{ user.email }}</p>
    <!-- Vous pouvez ajouter d'autres détails ici -->
    <button @click="viewDetails">Voir détails</button>
  </div>
</template>

<script setup>
import { defineProps } from 'vue';

const props = defineProps({
  user: {
    type: Object,
    required: true
  }
});

const viewDetails = () => {
  // Vous pouvez ajouter une logique pour voir les détails de l'utilisateur
  // Par exemple, ouvrir un modal avec plus d'informations
  alert(`Détails de l'utilisateur: ${props.user.name}`);
};
</script>

<style scoped>
.user-card {
  width: 250px;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  text-align: center;
}

.user-image {
  width: 100px;
  height: 100px;
  border-radius: 50%;
  margin-bottom: 10px;
}

button {
  padding: 10px 15px;
  background-color: #007BFF;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

button:hover {
  background-color: #0056b3;
}
</style>
