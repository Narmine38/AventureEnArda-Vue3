<template>
  <div>
    <h2>Inscription</h2>

    <form @submit.prevent="submitForm">
      <div>
        <label for="name">Nom:</label>
        <input type="text" id="name" v-model="user.name" required />
      </div>

      <div>
        <label for="email">Email:</label>
        <input type="email" id="email" v-model="user.email" required />
      </div>

      <div>
        <label for="password">Mot de passe:</label>
        <input type="password" id="password" v-model="user.password" required />
      </div>


      <button type="submit">S'inscrire</button>
    </form>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import api from '@/services/api';

const user = ref({
  name: '',
  email: '',
  password: '',
});
const errors = ref({});

const submitForm = async () => {
  try {
    await api.get('/sanctum/csrf-cookie'); // Obtenir le cookie CSRF
    const response = await api.post('/api/register', user.value);
    console.log('Inscription réussie:', response.data);
  } catch (error) {
    console.error("Erreur lors de l'inscription:", error.response.data);
    if (error.response && error.response.data.errors) {
      errors.value = error.response.data.errors;
    }
  }
};

</script>



<style scoped>

</style>
