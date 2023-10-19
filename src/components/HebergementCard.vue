<template>
  <div class="hebergement">
    <strong>{{ hebergement.nom }}</strong>
    <p>{{ hebergement.description }}</p>
    <p>Lieu: {{ hebergement.lieu.nom }}</p> <!-- Nouvelle ligne pour afficher le lieu -->

    <img :src="hebergement.photo" alt="Photo de {{ hebergement.nom }}" width="200" />
  </div>
</template>

<script>
export default {
  props: {
    hebergement: {
      type: Object,
      required: true
    }
  }
}
</script>

<style scoped>
.hebergement {
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
