<template>
  <section class="produtos-container">
    <transition mode="out-in">
      <div v-if="produtos && produtos.length" class="produtos" key="produto-carregado">
        <div v-for="(produto,index) in produtos" :key="index" class="produto">
          <router-link :to="{name:'Produto', params:{id:produto.id}}">
            <img v-if="produto.fotos" :src="produto.fotos[0].src" :alt="produto.fotos[0].titulo" />
            <p class="preco">{{ produto.preco | numeroPreco}}</p>
            <h2 :class="{vendido:produto.vendido === 'true'}" class="titulo">
              {{ produto.nome }}
              <span
                v-if="produto.vendido === 'true'"
                class="produto-vendido"
              >Vendido</span>
            </h2>
            <p>{{ produto.descricao }}</p>
          </router-link>
        </div>
        <ProdutosPaginar
          :produtosTotal="produtosTotal"
          :limiteProdutos="limiteProdutos"
          class="paginacao"
        />
      </div>
      <div
        v-else-if="produtos && produtos.length === 0"
        class="sem-resultados"
        key="nenhum-produto"
      >
        <p>Nenhum produto encontrado</p>
      </div>
      <div v-else key="carregando">
        <PaginaCarregando />
      </div>
    </transition>
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
      limiteProdutos: 9,
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
      this.produtos = null;
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
.vendido {
  position: relative;
}
.produto-vendido {
  position: absolute;
  font-size: 0.725rem;
  top: 0;
  right: 0;
  color: #fff;
  background: #ff540d;
  display: inline-block;
  padding: 5px;
  border-radius: 5px;
}
</style>
