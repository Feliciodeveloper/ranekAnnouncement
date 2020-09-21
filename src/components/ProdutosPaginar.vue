<template>
  <div>
    <ul v-if="paginacaoProdutos > 1">
      <router-link v-show="paginas.indexOf(1) == -1" :to="{query:query(1)}">←</router-link>
      <li v-for="pagina in paginas" :key="pagina">
        <router-link :to="{query:query(pagina)}">{{pagina}}</router-link>
      </li>
      <router-link :to="{query:query(paginacaoProdutos)}">→</router-link>
    </ul>
  </div>
</template>

<script>
export default {
  name: "ProdutosPaginar",
  props: {
    limiteProdutos: {
      type: Number,
      default: 1,
    },
    produtosTotal: {
      type: Number,
      default: 1,
    },
  },
  computed: {
    paginas() {
      const atual = Number(this.$route.query._page);
      const range = 9;
      const offrange = Math.ceil(range / 2);
      const total = this.paginacaoProdutos;
      const paginasArr = [];
      for (let i = 1; i <= total; i++) {
        paginasArr.push(i);
      }
      paginasArr.splice(0, atual - offrange);
      paginasArr.splice(range, total);
      return paginasArr;
    },
    paginacaoProdutos() {
      return Math.ceil(this.produtosTotal / this.limiteProdutos) !== Infinity
        ? Math.ceil(this.produtosTotal / this.limiteProdutos)
        : 0;
    },
  },
  methods: {
    query(param) {
      return {
        ...this.$route.query,
        _page: param,
      };
    },
  },
};
</script>

<style scoped>
li {
  display: inline-block;
}
li a {
  padding: 2px 8px;
  border-radius: 1px;
  margin: 4px;
}
li a.router-link-exact-active,
li a:hover {
  background: #87f;
  color: #fff;
}
</style>