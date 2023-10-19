<template>
  <div class="lieu">
    <strong>{{ lieu.nom }}</strong>
    <p>{{ lieu.description }}</p>
    <p>Anecdote: {{ lieu.anecdote }}</p>
    <img :src="lieu.photo" alt="Photo de {{ lieu.nom }}" width="200" />
  </div>
</template>

<script>
export default {
  props: {
    lieu: {
      type: Object,
      required: true
    }
  }
}
</script>

<style scoped>
.lieu {
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
