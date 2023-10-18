<template>
  <div>
    <!-- Si l'utilisateur est connecté, affiche le bouton de déconnexion -->
    <div v-if="isLoggedIn">
      <button @click="logout">Déconnexion</button>
    </div>

    <!-- Sinon, affiche le formulaire de connexion -->
    <div v-else>
      <input v-model="email" placeholder="Email">
      <input v-model="password" placeholder="Password" type="password">
      <button @click="attemptLogin">Login</button>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useAuthStore } from '@/stores/authStore';

const authStore = useAuthStore();
const email = ref('');
const password = ref('');

const attemptLogin = async () => {
  await authStore.login({ email: email.value, password: password.value });
};

const logout = async () => {
  await authStore.logout();  // Assurez-vous que cette fonction existe dans votre store
  email.value = '';         // Réinitialise les champs email et mot de passe
  password.value = '';
};

const isLoggedIn = ref(authStore.isLoggedIn);
</script>
