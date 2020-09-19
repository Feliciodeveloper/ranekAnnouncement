<template>
  <section class="produtos-container">
    <div v-if="produtos.length">
      <div v-for="produto in produtos" :key="produto.id">
        <img
          v-if="produto.fotos"
          :src="produto.fotos[0].src"
          :alt="produto.fotos[0].titulo"
        />
        <p class="preco">{{ produto.preco | numeroPreco }}</p>
        <h2 class="titulo">{{ produto.nome }}</h2>
        <p>{{ produto.descricao }}</p>
      </div>
    </div>
    <div v-else>
      <p>Nenhum produto encontrado</p>
    </div>
  </section>
</template>

<script>
import { api } from "@/services";
import { serealize } from "@/helpers.js";
export default {
  name: "ProdutosListar",
  data() {
    return {
      produtos: null,
      limiteProdutos: 9,
    };
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
      });
    },
  },
  watch: {
    produtos() {
      console.log(this.produtos);
    },
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

<style></style>
