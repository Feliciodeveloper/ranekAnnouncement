<template>
  <section class="login">
    <h1>Login</h1>
    <form>
      <label for="email">Email</label>
      <input type="email" name="email" id="email" v-model="login.email" />
      <label for="senha">Senha</label>
      <input type="password" name="senha" id="senha" v-model="login.senha" />
      <button class="btn" @click.prevent="logar">Entrar</button>
    </form>
    <p class="perdeu">
      <a href target="_blank">Perdeu a senha? clique aqui.</a>
    </p>
    <LoginCriar />
  </section>
</template>

<script>
import LoginCriar from "@/components/LoginCriar.vue";
import { mapActions } from "vuex";
import { api } from "@/services.js";
export default {
  name: "Login",
  data() {
    return {
      login: {
        email: "",
        senha: "",
      },
    };
  },
  components: {
    LoginCriar,
  },
  methods: {
    ...mapActions(["getUsuario"]),
    logar() {
      api.get(`/usuario?email=${this.login.email}&senha=${this.login.senha}`)
      .then(e=>{
        if(e.data.length > 0){
          this.getUsuario(e.data[0].id);
          this.$router.push({ name: "Usuario" });
          } else window.alert("Email ou Senha invalido")
      });
    },
  },
};
</script>

<style scoped>
h1 {
  text-align: center;
  font-size: 2rem;
  margin-top: 40px;
  color: #87f;
}
.login {
  max-width: 500px;
  margin: 0 auto;
  padding: 0 20px;
}
form {
  display: grid;
}
.btn {
  width: 100%;
  max-width: 300px;
  margin-left: auto;
  margin-right: auto;
}
.perdeu {
  text-align: center;
  margin: 20px auto 0 auto;
}
.perdeu a:hover {
  color: #87f;
  text-decoration: underline;
}
</style>