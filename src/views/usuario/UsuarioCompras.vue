<template>
  <section>
    <h2>Suas Compras</h2>
    <div v-if="compras">
      <div
        class="produtos-wrapper"
        v-for="(compra, index) in compras"
        :key="index"
      >
        <ProdutoItem v-if="compra.produto" :produto="compra.produto">
          <p class="vendedor">
            <span>Vendedor: </span>{{ compra.vendendor_id }}
          </p>
        </ProdutoItem>
      </div>
    </div>
    <div v-else>
      <p>Nenhuma compra realizada</p>
    </div>
  </section>
</template>

<script>
import ProdutoItem from "@/components/ProdutoItem.vue";
import { mapState } from "vuex";
import { api } from "@/services.js";
export default {
  name: "UsuarioCompras",
  data() {
    return {
      compras: null,
    };
  },
  components: {
    ProdutoItem,
  },
  computed: {
    ...mapState(["login", "usuario"]),
  },
  methods: {
    getCompras() {
      api.get(`/transacao?comprador_id=${this.usuario.id}`).then((e) => {
        if (e.data.length > 0) this.compras = e.data;
      });
    },
  },
  created() {
    if (this.login) this.getCompras();
  },
  watch: {
    login() {
      this.getCompras();
    },
  },
};
</script>

<style scoped>
.produto-wrapper {
  margin-bottom: 40px;
}
.vendedor span {
  color: #e80;
}
h2 {
  margin-bottom: 20px;
}
</style>