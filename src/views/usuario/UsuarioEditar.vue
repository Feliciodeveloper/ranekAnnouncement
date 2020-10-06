<template>
  <section>
    <h1>Perfil</h1>
    <UsuarioForm>
      <button class="btn" @click.prevent="atualizarUsuario">Atualizar</button>
    </UsuarioForm>
  </section>
</template>

<script>
import UsuarioForm from "@/components/UsuarioForm.vue";
import { api } from "@/services.js";
import { mapState, mapActions } from "vuex";
export default {
  name: "UsuarioEditar",
  computed: {
    ...mapState(["usuario"]),
  },
  methods: {
    ...mapActions(["getUsuario"]),
    atualizarUsuario() {
      api
        .put(`/usuario/${this.usuario.id}`, this.usuario)
        .then(() => {
          this.getUsuario();
          window.alert("Usuario atualizado");
          this.$router.push({ name: "Usuario" });
        })
        .catch((e) => {
          console.log(e);
        });
    },
  },
  components: {
    UsuarioForm,
  },
};
</script>

<style>
</style>