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
          <button @click.prevent="deslogar">Sair</button>
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
@media screen and (max-width: 500px) {
  .usuario {
    grid-template: 1fr;
    margin: 0 auto;
  }
}
.usuario {
  display: grid;
  grid-template-columns: minmax(140px, 200px) 1fr;
  margin: 40px auto;
  grid-gap: 120px;
  padding: 20px;
  max-width: 100%;
}
.sidenav a,
.sidenav button {
  padding: 10px;
  display: block;
  width: 200px;
  max-width: 100%;
  margin-bottom: 10px;
  border-radius: 4px;
  background: #f4f7fc;
}
.sidenav a.router-link-exact-active,
.sidenav a:hover,
.sidenav button:hover {
  background: #87f;
  color: #ffffff;
}
.sidenav button {
  border: none;
  width: 200px;
  max-width: 100%;
  font-size: 1rem;
  text-align: left;
  font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
  cursor: pointer;
}
</style>