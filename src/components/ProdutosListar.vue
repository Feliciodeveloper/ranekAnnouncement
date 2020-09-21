<template>
  <section class="produtos-container">
    <div v-if="produtos && produtos.length" class="produtos">
      <div v-for="(produto,index) in produtos" :key="index" class="produto">
        <router-link to="/">
          <img v-if="produto.fotos" :src="produto.fotos[0].src" :alt="produto.fotos[0].titulo" />
          <p class="preco">{{ produto.preco}}</p>
          <h2 class="titulo">{{ produto.nome }}</h2>
          <p>{{ produto.descricao }}</p>
        </router-link>
      </div>
      <ProdutosPaginar
        :produtosTotal="produtosTotal"
        :limiteProdutos="limiteProdutos"
        class="paginacao"
      />
    </div>
    <div v-else class="sem-resultados">
      <p>Nenhum produto encontrado</p>
    </div>
  </section>
</template>

<script>
import { api } from "@/services";
import { serealize } from "@/helpers.js";
import ProdutosPaginar from "@/components/ProdutosPaginar.vue";
export default {
  name: "ProdutosListar",
  data() {
    return {
      produtos: null,
      limiteProdutos: 3,
      produtosTotal: 0,
    };
  },
  components: {
    ProdutosPaginar,
  },
  computed: {
    url() {
      let query = serealize(this.$route.query);
      return `/produto?_limit=${this.limiteProdutos}${query}`;
    },
  },
  methods: {
    getProdutos() {
      api.get(this.url).then((json) => {
        this.produtos = json.data;
        this.produtosTotal = Number(json.headers["x-total-count"]);
      });
    },
  },
  watch: {
    url() {
      this.getProdutos();
    },
  },
  filters: {
    numeroPreco(param) {
      return param.toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL",
      });
    },
  },
  created() {
    this.getProdutos();
  },
};
</script>

<style scoped>
.produtos-container {
  max-width: 1000px;
  margin: 0 auto;
}
.produtos {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 30px;
  margin: 30px;
}
.produto {
  box-shadow: 0 4px 8px rgba(30, 60, 90, 0.1);
  padding: 10px;
  background: #fff;
  border-radius: 4px;
  transition: all 0.3s;
}
.produto:hover {
  box-shadow: 0 6px 12px rgba(30, 60, 90, 0.2);
  transform: scale(1.1);
  position: relative;
  z-index: 1;
}
.produto img {
  border-radius: 4px;
  margin-bottom: 20px;
}
.titulo {
  margin-bottom: 10px;
}
.preco {
  font-weight: bold;
  color: #e80;
}
.sem-resultados {
  text-align: center;
}
.paginacao {
  grid-column: 1 / -1;
}
</style>
