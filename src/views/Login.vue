<template>
  <div>
      <input v-model="email" placeholder="Email">
      <input v-model="password" placeholder="Password" type="password">
      <button @click="attemptLogin">Login</button>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useAuthStore } from '@/stores/authStore';
import router from "@/router";

const authStore = useAuthStore();
const email = ref('');
const password = ref('');

const attemptLogin = async () => {
  await authStore.login({ email: email.value, password: password.value });
  await router.push("/");
};



const isLoggedIn = ref(authStore.isLoggedIn);
</script>

<style scoped>
/* Fond d'écran */
div {
  /* Couleur de fond d'un vieux parchemin */
  background: #F4E9D8 ;
  background-size: cover;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
  max-width: 400px;
  margin: auto;
  border: 3px solid #7B5E47; /* Bordure marron rappelant le cuir */
}

/* Style de base pour les boutons et champs de saisie */
button, input {
  font-family: 'Ringbearer', sans-serif; /* Une police rappelant l'écriture du "Seigneur des Anneaux" */
  border: 1px solid #7B5E47;
  padding: 10px;
  margin: 5px;
  border-radius: 5px;
  background-color: transparent;
  color: #3E2723; /* Marron foncé pour un look ancien */
  font-size: 16px;
}

button:hover {
  background-color: #BFAE96; /* Marron clair au survol */
  cursor: pointer;
}

input::placeholder {
  color: #7B5E47; /* Couleur de placeholder marron */
}

/* Ornementations */
div:before, div:after {
  content: "";
  display: block;
  width: 50px;
  height: 50px;
  margin: auto;
}

div:before {
  margin-bottom: 20px;
}

div:after {
  margin-top: 20px;
}
</style>
