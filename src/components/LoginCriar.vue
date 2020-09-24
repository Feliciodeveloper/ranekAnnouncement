<template>
  <section>
    <h2>Crie sua conta</h2>
    <transition mode="out-in">
      <button v-if="!criar" class="btn" @click="criar = true">
        Criar Usuario
      </button>
      <UsuarioForm v-else>
        <button class="btn btn-form">Criar Usuario</button>
        <a @click="criar = false" class="voltar">Cancelar</a>
      </UsuarioForm>
    </transition>
  </section>
</template>

<script>
import UsuarioForm from "@/components/UsuarioForm.vue";
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