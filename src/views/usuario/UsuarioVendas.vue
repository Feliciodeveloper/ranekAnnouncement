<template>
  <section>
    <h2>Suas Vendas</h2>
    <div v-if="vendas">
      <div
        class="produtos-wrapper"
        v-for="(venda, index) in vendas"
        :key="index"
      >
        <ProdutoItem v-if="venda.produto" :produto="venda.produto">
          <p class="vendedor">
            <span>Comprador: </span>{{ venda.comprador_id }}
          </p>
        </ProdutoItem>
        <div class="entrega">
          <h3>Entrega:</h3>
          <ul v-if="venda.endereco">
            <li v-for="(endereco, key) in venda.endereco" :key="key">
              {{ key }}: {{ endereco }}
            </li>
          </ul>
        </div>
      </div>
    </div>
    <div v-else>
      <p>Nenhuma venda realizada</p>
    </div>
  </section>
</template>

<script>
import ProdutoItem from "@/components/ProdutoItem.vue";
import { mapState } from "vuex";
import { api } from "@/services.js";
export default {
  name: "UsuarioVendas",
  data() {
    return {
      vendas: null,
    };
  },
  components: {
    ProdutoItem,
  },
  computed: {
    ...mapState(["login", "usuario"]),
  },
  methods: {
    getVendas() {
      api.get(`/transacao?vendedor_id=${this.usuario.id}`).then((e) => {
        if (e.data.length > 0) this.vendas = e.data;
      });
    },
  },
  created() {
    if (this.login) this.getVendas();
  },
  watch: {
    login() {
      this.getVendas();
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
.entrega {
  display: grid;
  grid-template-columns: minmax(100px, 200px) 1fr;
  grid-gap: 20px;
  margin-bottom: 60px;
}
h3 {
  margin: 0;
}
</style>