<template>
  <div class="admin-container">
    <h1>Administration</h1>

    <!-- Sous-navigation -->
    <nav>
      <ul>
        <li>
          <RouterLink to="/administration/usersmanagement">Gestion des utilisateurs</RouterLink>
        </li>
        <li>
          <RouterLink to="/administration/placesmanagement">Gestion des lieux</RouterLink>
        </li>
        <li>
          <RouterLink to="/administration/accommodationsmanagement">Gestion des hébergements</RouterLink>
        </li>
        <li>
          <RouterLink to="/administration/activitiesmanagement">Gestion des activités</RouterLink>
        </li>
        <li>
          <RouterLink to="/administration/charactersmanagement">Gestion des personnages</RouterLink>
        </li>
        <li>
          <RouterLink to="/administration/reservationsmanagement">Gestion des réservations</RouterLink>
        </li>
      </ul>
    </nav>

    <!-- Contenu de la sous-page actuellement active -->
    <div class="admin-content">
      <RouterView/>
    </div>
  </div>
</template>

<script setup>
import {RouterView} from 'vue-router'

</script>

<style scoped>
.admin-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
  font-family: 'Times New Roman', Times, serif;
  background-color: #f4e9d8; /* couleur parchemin */
  border: 2px solid #7b6c49;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
}

h1 {
  text-align: center;
  margin-bottom: 2rem;
  color: #3e3224;
  font-weight: bold;
  border-bottom: 2px solid #7b6c49;
  padding-bottom: 1rem;
}

/* Style pour la sous-navigation */
nav ul {
  display: flex;
  justify-content: space-between;
  list-style-type: none;
  padding: 0;
  background-color: #7b6c49; /* couleur bois sombre */
  border: 2px solid #3e3224;
  border-radius: 10px;
}

nav li {
  flex: 1;
  text-align: center;
  padding: 1rem 0;
  background: linear-gradient(#a89f7d, #7b6c49);
}

nav li:not(:last-child) {
  border-right: 2px solid #3e3224;
}

router-link {
  text-decoration: none;
  color: #f4e9d8; /* couleur parchemin */
  transition: background-color 0.3s, color 0.3s;
}

router-link-active {
  color: #7b6c49;
  background-color: #f4e9d8;
}

nav li:hover router-link {
  color: #7b6c49;
  background-color: #f4e9d8;
}

/* Contenu */
.admin-content {
  margin-top: 2rem;
  background-color: rgba(255, 255, 255, 0.8);
  padding: 1rem;
  border-radius: 5px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
}
</style>
