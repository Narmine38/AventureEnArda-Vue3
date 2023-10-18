<template>
  <div>
    <UserCard v-for="user in users.data" :key="user.id" :user="user" />
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useAdminStore } from '@/stores/adminStore';
import UserCard from "@/components/UserCard.vue";  // Assurez-vous que le chemin d'import est correct

const adminStore = useAdminStore();

onMounted(async () => {
  await adminStore.fetchUsers();
});

// Si vous avez besoin d'accéder à la liste des utilisateurs dans le template :
const users = ref(adminStore.users);
</script>
