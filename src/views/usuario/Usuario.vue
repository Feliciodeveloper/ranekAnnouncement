<template>
  <section v-if="login">
    <h1>Usuario</h1>
    <p>{{usuario}}</p>
  </section>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "Usuario",
  computed: {
    ...mapState(["usuario", "login"]),
  },
};
</script>

<style>
</style>