<template>
  <div class="activite">
    <strong>{{ activite.nom }}</strong>
    <p>{{ activite.description }}</p>
    <p>Lieu: {{ activite.lieu.nom }}</p> <!-- Nouvelle ligne pour afficher le lieu -->
    <img :src="activite.photo" alt="Photo de l'activité {{ activite.nom }}" width="200" />
  </div>
</template>

<script>
export default {
  props: {
    activite: {
      type: Object,
      required: true
    }
  }
}
</script>

<style scoped>
.activite {
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
