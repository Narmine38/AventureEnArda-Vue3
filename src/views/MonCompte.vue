<template>
  <form @submit.prevent="updateProfile">

    <label>Nom:
      <input type="text" v-model="updatedData.name" :placeholder="userData.name || 'Entrez votre nom'" />
    </label>
    <label>Email:
      <input type="email" v-model="updatedData.email" :placeholder="userData.email || 'Entrez votre email'" />
    </label>
    <label>Ville:
      <input type="text" v-model="updatedData.city" :placeholder="userData.city || 'Entrez votre ville'" />
    </label>
    <label>Pays:
      <input type="text" v-model="updatedData.country" :placeholder="userData.country || 'Entrez votre pays'" />
    </label>
    <label>Numéro de téléphone:
      <input type="tel" v-model="updatedData.phone_number" :placeholder="userData.phone_number || 'Entrez votre numéro de téléphone'" />
    </label>
    <label>Code postal:
      <input type="text" v-model="updatedData.postal_code" :placeholder="userData.postal_code || 'Entrez votre code postal'" />
    </label>
    <label>Adresse:
      <input type="text" v-model="updatedData.address" :placeholder="userData.address || 'Entrez votre adresse'" />
    </label>
    <button type="submit">Mettre à jour</button>
    <button @click="archiveProfile">Supprimer mon compte</button>
  </form>

    <!-- Bouton pour archiver le profil -->


</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useUserProfileStore } from '@/stores/userProfileStore';

const userProfile = useUserProfileStore();
const userData = userProfile.userData;

// Les données mises à jour sont stockées ici
const updatedData = ref({
  name: userData.name || '',
  email: userData.email || '',
  city: userData.city || '',
  country: userData.country || '',
  phone_number: userData.phone_number || '',
  postal_code: userData.postal_code || '',
  address: userData.address || '',
  // Ajoutez d'autres champs ici selon vos besoins
});

onMounted(async () => {
  await userProfile.fetchUserProfile();
});

const updateProfile = async () => {
  await userProfile.updateUserProfile(updatedData.value);
  alert("Profil mis à jour avec succès !");
};

const archiveProfile = async () => {
  const confirmArchive = confirm("Êtes-vous sûr de vouloir supprimer votre compte ?");
  if (confirmArchive) {
    await userProfile.archiveUserProfile();
    alert("Votre compte a été supprimé avec succès !");
    // Rediriger vers la page d'accueil ou de connexion
    // this.$router.push({ name: 'home' });
  }
};
</script>

<style scoped>
form {
  max-width: 600px;
  margin: 2rem auto;
  padding: 2rem;
  border: 1px solid #e1e1e1;
  border-radius: 4px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

label {
  display: block;
  margin-bottom: 1rem;
  font-weight: bold;
}

input {
  width: 100%;
  padding: 0.5rem;
  margin-top: 0.5rem;
  border: 1px solid #e1e1e1;
  border-radius: 4px;
  font-size: 1rem;
}

button {
  display: inline-block;
  padding: 0.5rem 1rem;
  margin-top: 1rem;
  color: white;
  background-color: #007BFF;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.2s;
}

button:hover {
  background-color: #0056b3;
}

/* Bouton pour archiver le profil */
button:last-of-type {
  margin-top: 2rem;
  background-color: #dc3545;
}

button:last-of-type:hover {
  background-color: #c82333;
}
</style>