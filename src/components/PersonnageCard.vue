<template>
  <div class="personnage">
    <strong>{{ personnage.nom }}</strong>
    <p>{{ personnage.description }}</p>
    <p>Lieu: {{ personnage.lieu.nom }}</p> <!-- Nouvelle ligne pour afficher le lieu associé -->
    <img :src="personnage.photo" alt="Image du personnage {{ personnage.nom }}" width="200" />
  </div>
</template>

<script>
export default {
  props: {
    personnage: {
      type: Object,
      required: true
    }
  }
}
</script>

<style scoped>
.personnage {
  border: 1px solid #e0e0e0;
  padding: 15px;
  margin: 10px 0;
  border-radius: 5px;
}

img {
  border-radius: 5px;
  margin-top: 10px;
}
</style>
