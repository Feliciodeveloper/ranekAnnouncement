<template>
  <section>
    <h2>Adicionar Produtos</h2>
    <ProdutosAdicionar />
    <h2>Seus Produtos</h2>
    <transition-group v-if="usuario_produtos" name="list" tag="ul">
      <li v-for="(produto, index) in usuario_produtos" :key="index">
        <ProdutoItem :produto="produto">
          <p>{{ produto.descricao }}</p>
          <button class="deletar" @click.prevent="removerProduto(produto.id)">
            Deletar
          </button>
        </ProdutoItem>
      </li>
    </transition-group>
  </section>
</template>

<script>
import ProdutosAdicionar from "@/components/ProdutosAdicionar.vue";
import ProdutoItem from "@/components/ProdutoItem.vue";
import { api } from "@/services.js";
import { mapState, mapActions } from "vuex";
export default {
  name: "UsuarioProdutos",
  components: {
    ProdutosAdicionar,
    ProdutoItem,
  },
  computed: {
    ...mapState(["login", "usuario_produtos", "usuario"]),
  },
  methods: {
    ...mapActions(["getUsuarioProdutos"]),
    removerProduto(id) {
      const confirmar = window.confirm("Desejar remover este produto?");
      if (confirmar)
        api.delete(`/produto/${id}`).then(() => {
          this.getUsuarioProdutos();
        });
    },
  },
  watch: {
    login() {
      this.getUsuarioProdutos();
    },
  },
  created() {
    if (this.login) this.getUsuarioProdutos();
  },
};
</script>

<style scoped>
ul li {
  display: block;
}
.deletar {
  position: absolute;
  top: 0px;
  right: 0px;
  background: url("../../assets/remove.svg") no-repeat center center;
  width: 24px;
  height: 24px;
  text-indent: -140px;
  overflow: hidden;
  cursor: pointer;
  border: none;
}
.list-enter-active,
.list-leave-active {
  transition: all 0.3s;
}
.list-enter,
.list-leave-to {
  opacity: 0;
  transform: translate3d(20px, 0, 0);
}
</style>