<template>
  <section>
    <h2>Crie sua conta</h2>
    <transition mode="out-in">
      <button v-if="!criar" class="btn" @click="criar = true">
        Criar Usuario
      </button>
      <UsuarioForm v-else>
        <button @click.prevent="criarUser" class="btn btn-form">
          Criar Usuario
        </button>
        <a @click="cancelarCadastro" class="voltar">Cancelar</a>
      </UsuarioForm>
    </transition>
  </section>
</template>

<script>
import UsuarioForm from "@/components/UsuarioForm.vue";
import { mapActions, mapState } from "vuex";
export default {
  name: "LoginCriar",
  data() {
    return {
      criar: false,
    };
  },
  components: {
    UsuarioForm,
  },
  computed: {
    ...mapState(["usuario"]),
  },
  methods: {
    ...mapActions(["clearUsuario", "createUsuario", "getUsuario"]),
    async criarUser() {
      try {
        await this.createUsuario(this.usuario);
        await this.getUsuario(this.usuario.email);
        this.$router.push({ name: "Usuario" });
      } catch (e) {
        console.log(e);
      }
    },
    cancelarCadastro() {
      this.criar = false;
      this.clearUsuario();
    },
  },
};
</script>

<style scoped>
h2 {
  text-align: center;
  margin-top: 40px;
  margin-bottom: 10px;
}
.btn {
  max-width: 300px;
  width: 100%;
  margin-right: auto;
  margin-left: auto;
}
.btn-form {
  max-width: 100%;
}
.voltar {
  display: block;
  max-width: 100%;
  text-align: center;
  cursor: pointer;
  margin-top: 10px;
}
</style>