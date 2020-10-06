<template>
  <section>
    <h1>Endereco de envio</h1>
    <UsuarioForm>
      <button class="btn" @click.prevent="finalizarCompra()">
        Finalizar compra
      </button>
    </UsuarioForm>
  </section>
</template>

<script>
import UsuarioForm from "@/components/UsuarioForm";
import { mapState, mapActions } from "vuex";
import { api } from "@/services.js";
export default {
  name: "FinalizarCompra",
  props: ["produto"],
  components: {
    UsuarioForm,
  },
  computed: {
    ...mapState(["usuario", "login"]),
    compra() {
      return {
        comprador_id: this.usuario.id,
        vendendor_id: this.produto.usuario_id,
        produto: this.produto,
        endereco: {
          cep: this.usuario.cep,
          rua: this.usuario.rua,
          cidade: this.usuario.cidade,
          estado: this.usuario.estado,
          numero: this.usuario.numero,
          bairro: this.usuario.bairro,
        },
      };
    },
  },
  methods: {
    ...mapActions(["clearUsuario", "createUsuario", "getUsuario"]),
    criarTransacao() {
      return api.post("/transacao", this.compra).then(() => {
        api.put(
          `/produto/${this.produto.id}`,
          Object.assign(this.produto, { vendido: "true" })
        );
        this.$router.push({ name: "Compras" });
      });
    },
    async criarUser() {
      try {
        await this.createUsuario(this.usuario);
        await this.getUsuario(this.usuario.email);
        await this.criarTransacao();
      } catch (e) {
        console.log(e);
      }
    },
    finalizarCompra() {
      if (this.login) this.criarTransacao();
      else this.criarUser();
    },
  },
};
</script>

<style scoped>
</style>