<template>
  <div>
    <h2>Inscription</h2>

    <form @submit.prevent="submitForm">
      <div>
        <label for="name">Nom:</label>
        <input type="text" id="name" v-model="user.name" required />
        <div class="error" v-if="errors.name">{{ errors.name[0] }}</div>
      </div>

      <div>
        <label for="email">Email:</label>
        <input type="email" id="email" v-model="user.email" required />
        <div class="error" v-if="errors.email">{{ errors.email[0] }}</div>
      </div>

      <div>
        <label for="password">Mot de passe:</label>
        <input type="password" id="password" v-model="user.password" required />
        <div class="error" v-if="errors.password">{{ errors.password[0] }}</div>
      </div>

      <button type="submit">S'inscrire</button>
    </form>

    <div v-if="errorMessage" class="error">{{ errorMessage }}</div>
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
const errorMessage = ref('');

const submitForm = async () => {
  try {
    const response = await api.post('/api/register', user.value);
    console.log('Inscription réussie:', response.data);
    errorMessage.value = ''; // Reset the error message
  } catch (error) {
    console.error("Erreur lors de l'inscription:", error.response.data);
    if (error.response && error.response.data.errors) {
      errors.value = error.response.data.errors;
    } else {
      errorMessage.value = "Une erreur inattendue s'est produite. Veuillez réessayer plus tard.";
    }
  }
};

</script>

<style scoped>
.error {
  color: red;
}
</style>
