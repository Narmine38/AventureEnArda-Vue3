<template>
  <div class="user-management-section">
    <!-- Liste des utilisateurs -->
    <div class="users-list">
      <h3>Utilisateurs</h3>
      <table>
        <thead>
        <tr>
          <th>ID</th>
          <th>Nom</th>
          <th>Email</th>
          <th>Actions</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="user in userProfileStore.users" :key="user.id">
          <td>{{ user.id }}</td>
          <td>{{ user.name }}</td>
          <td>{{ user.email }}</td>
          <td>
            <button @click="archiveUser(user.id)">Archiver</button>
          </td>
        </tr>
        </tbody>
      </table>
    </div>

    <!-- Liste des utilisateurs archivés -->
    <div class="archived-users-list" v-if="userProfileStore.archivedUsers.length">
      <h3>Utilisateurs archivés</h3>
      <table>
        <thead>
        <tr>
          <th>ID</th>
          <th>Nom</th>
          <th>Email</th>
          <th>Actions</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="user in userProfileStore.archivedUsers" :key="user.id">
          <td>{{ user.id }}</td>
          <td>{{ user.name }}</td>
          <td>{{ user.email }}</td>
          <td>
            <button @click="restoreUser(user.id)">Restaurer</button>
          </td>
        </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup>
import { useUserProfileStore } from '@/stores/userProfileStore';

const userProfileStore = useUserProfileStore();
userProfileStore.fetchUsers();
userProfileStore.fetchArchivedUsers();

const archiveUser = async (id) => {
  try {
    await userProfileStore.archiveUser(id);
    // Rafraîchir la liste des lieux après l'archivage
    await userProfileStore.fetchUsers();
    window.location.reload();

  } catch (error) {
    console.error("Erreur lors de l'archivage de l'utilisateur:", error);
  }
};

const restoreUser = async (id) => {
  await userProfileStore.restoreUser(id);
};
</script>

<style scoped>
.user-management-section {
  padding: 20px;
}
table {
  width: 100%;
  border-collapse: collapse;
}
th, td {
  padding: 8px 12px;
  border: 1px solid #e0e0e0;
}
.users-list, .archived-users-list {
  margin-top: 20px;
  padding: 15px;
  border: 1px solid #e0e0e0;
  border-radius: 5px;
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
</style>

