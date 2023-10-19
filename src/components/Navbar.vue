<template>
  <nav class="lotr-navbar">
    <RouterLink to="/middle-earth" class="nav-link">Terre du Milieu</RouterLink>
    <RouterLink to="/destinations" class="nav-link">Destinations</RouterLink>
    <RouterLink to="/personnages" class="nav-link">Personnages</RouterLink>
    <RouterLink to="/histoires" class="nav-link">Histoires</RouterLink>
    <RouterLink to="/conseils" class="nav-link">Conseils de Voyage</RouterLink>

    <!-- Si l'utilisateur est connecté -->
    <div v-if="isLoggedIn" class="auth-section">
      <!-- Si l'utilisateur est un administrateur -->
      <RouterLink v-if="isAdmin" to="/administration" class="auth-link">Administration</RouterLink>
      <!-- Si l'utilisateur n'est pas un administrateur -->
      <RouterLink v-else to="/mon-compte" class="auth-link">Mon Compte</RouterLink>
      <!-- Bouton de déconnexion -->
      <button @click="logout" class="logout-button">Déconnexion</button>
    </div>
    <!-- Si l'utilisateur n'est pas connecté -->
    <div v-else class="auth-section">
      <RouterLink to="/connexion" class="auth-link">Connexion</RouterLink>
      <RouterLink to="/inscription" class="auth-link">Inscription</RouterLink>
    </div>
  </nav>
</template>

<script setup>
import {useAuthStore} from "@/stores/authStore";
import {computed, ref} from "vue";
import router from "@/router";

const userStore = useAuthStore();
const isLoggedIn = computed(() => userStore.isLoggedIn);
const isAdmin = computed(() => userStore.isAdmin);
const email = ref('');
const password = ref('');

const logout = async () => {
  await useAuthStore().logout();  // Assurez-vous que cette fonction existe dans votre store
  email.value = '';         // Réinitialise les champs email et mot de passe
  password.value = '';
  await router.push("/connexion");
  window.location.reload();
// Redirection vers la page de connexion
};


</script>

<style scoped>
.lotr-navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 2rem;
  background-color: #1b1a18; /* fond sombre rappelant le cuir ou le bois ancien */
  border-bottom: 3px solid #8b4513; /* Une bordure rappelant le cuir ou le bois */
}

.nav-link {
  text-decoration: none;
  margin: 0 1rem;
  padding: 0.5rem 1rem;
  font-family: 'Cinzel', serif; /* une police qui évoque une esthétique médiévale */
  font-size: 1.2rem;
  color: #f4e4d3; /* Une couleur crème pour le contraste */
  transition: color 0.3s ease;
}

.nav-link:hover {
  color: #e9af77; /* un doré doux pour le survol */
}

.auth-section {
  display: flex;
  align-items: center;
}

.auth-link {
  text-decoration: none;
  margin-left: 1rem;
  padding: 0.5rem 1rem;
  font-family: 'Cinzel', serif;
  font-size: 1rem;
  color: #f4e4d3;
  border: 1px solid #8b4513;
  transition: background-color 0.3s ease, color 0.3s ease;
}

.auth-link:hover {
  background-color: #8b4513;
  color: #f4e4d3;
}

.logout-button {
  background-color: transparent;
  border: 1px solid #8b4513;
  color: #f4e4d3;
  cursor: pointer;
  padding: 0.5rem 1rem;
  font-family: 'Cinzel', serif;
  transition: background-color 0.3s ease, color 0.3s ease;
}

.logout-button:hover {
  background-color: #8b4513;
  color: #f4e4d3;
}
</style>