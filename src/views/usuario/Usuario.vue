<template>
  <section v-if="login" class="usuario">
    <nav class="sidenav">
      <ul>
        <li>
          <router-link :to="{ name: 'Usuario' }">Produtos</router-link>
        </li>
        <li>
          <router-link :to="{ name: 'Compras' }">Compras</router-link>
        </li>
        <li>
          <router-link :to="{ name: 'Vendas' }">Vendas</router-link>
        </li>
        <li>
          <router-link :to="{ name: 'Usuario-editar' }">Perfil</router-link>
        </li>
        <li>
          <button @click.prevent="deslogar" class="btn">Sair</button>
        </li>
      </ul>
    </nav>
    <transition mode="out-in">
      <router-view />
    </transition>
  </section>
</template>

<script>
import { mapState, mapActions } from "vuex";
export default {
  name: "Usuario",
  computed: {
    ...mapState(["usuario", "login"]),
  },
  methods: {
    ...mapActions(["deslogarUser"]),
    deslogar() {
      this.deslogarUser();
      this.$router.push({ name: "Login" });
    },
  },
};
</script>

<style scoped>
</style>