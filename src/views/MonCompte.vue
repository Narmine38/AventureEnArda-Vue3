<template>
  <div class="user-management-section">
    <h2>Mon Compte</h2>

    <form @submit.prevent="updateUser">
      <label>
        Nom:
        <input type="text" v-model="editableUser.name" :placeholder="editableUser.name || 'Nom'" required />
      </label>

      <label>
        Email:
        <input type="email" v-model="editableUser.email" :placeholder="editableUser.email || 'Email'" required />
      </label>

      <label>
        Adresse:
        <input type="text" v-model="editableUser.address" :placeholder="editableUser.address || 'Adresse'" required />
      </label>

      <label>
        Ville:
        <input type="text" v-model="editableUser.city" :placeholder="editableUser.city || 'Ville'" required />
      </label>

      <label>
        Pays:
        <input type="text" v-model="editableUser.country" :placeholder="editableUser.country || 'Pays'" required />
      </label>

      <label>
        Code postal:
        <input type="text" v-model="editableUser.postal_code" :placeholder="editableUser.postal_code || 'Code postal'" required />
      </label>

      <label>
        Numéro de téléphone:
        <input type="text" v-model="editableUser.phone_number" :placeholder="editableUser.phone_number || 'Numéro de téléphone'" required />
      </label>

      <label>
        Mot de passe (laissez vide pour ne pas changer):
        <input type="password" v-model="editableUser.password" placeholder="Mot de passe" />
      </label>

      <button type="submit">Mettre à jour</button>
    </form>

    <button @click="confirmDeleteAccount">Supprimer mon compte</button>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router';
import { useUserProfileStore } from '@/stores/userProfileStore';
import { useAuthStore } from '@/stores/authStore';
import { ref } from "vue";

const userProfileStore = useUserProfileStore();
const authStore = useAuthStore();
const router = useRouter();

// Utilisation de userData depuis userProfileStore pour initialiser editableUser
const editableUser = ref({ ...userProfileStore.userData, password: '' });

const updateUser = async () => {
  try {
    await userProfileStore.updateUserProfile(editableUser.value);
    console.log('User updated successfully!');
    window.location.reload();
  } catch (error) {
    console.error('Error updating user:', error);
  }
};

const confirmDeleteAccount = () => {
  if (window.confirm("Êtes-vous sûr de vouloir supprimer votre compte? Cette action est irréversible.")) {
    archiveAccount();
  }
};

const archiveAccount = async () => {
  try {
    await userProfileStore.archiveUser(authStore.user.id);
    console.log('User archived successfully!');
    await authStore.clearAuthData();
    await router.push('/connexion');
    window.location.reload();
  } catch (error) {
    console.error('Error archiving account:', error);
  }
};
</script>

<style scoped>
.user-management-section {
  padding: 20px;
}
label {
  display: block;
  margin-bottom: 10px;
}
input {
  padding: 8px;
  border: 1px solid #e0e0e0;
  border-radius: 5px;
  width: 100%;
  box-sizing: border-box;
}
button {
  margin-top: 20px;
  padding: 8px 12px;
  border: none;
  background-color: #007BFF;
  color: #ffffff;
  border-radius: 5px;
  cursor: pointer;
}
button:hover {
  background-color: #0056b3;
}
</style>
