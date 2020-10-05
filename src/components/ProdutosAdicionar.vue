<template>
  <div>
    <transition mode="out-in">
      <button v-if="!adicionar" class="btn" @click.prevent="adicionar = true">
        Clique para adicionar
      </button>
      <form v-if="adicionar" class="adicionar-produto">
        <label for="nome">Nome do produto</label>
        <input type="text" name="nome" id="nome" v-model="produto.nome" />
        <label for="preco">Preco (R$)</label>
        <input type="number" name="preco" id="preco" v-model="produto.preco" />
        <label for="fotos">Fotos</label>
        <input type="file" name="fotos" id="fotos" ref="fotos" />
        <label for="descricao">Descrição</label>
        <textarea
          name="descricao"
          id="descricao"
          cols="20"
          rows="5"
          v-model="produto.descricao"
        ></textarea>
        <input
          type="button"
          value="Adicionar produto"
          class="btn"
          @click.prevent="adicionarProdutos"
        />
        <input
          type="button"
          value="cancelar"
          class="btn"
          @click.prevent="adicionar = false"
        />
      </form>
    </transition>
  </div>
</template>

<script>
import { api } from "@/services.js";
import { mapActions, mapState } from "vuex";
export default {
  name: "ProdutosAdicionar",
  data() {
    return {
      adicionar: false,
      produto: {
        nome: "",
        preco: "",
        descricao: null,
        fotos: null,
        id: null,
        usuario_id: null,
      },
    };
  },
  computed: {
    ...mapState(["usuario"]),
  },
  methods: {
    ...mapActions(["getUsuarioProdutos"]),
    adicionarProdutos() {
      if (this.produto.nome.length > 0 && this.produto.preco.length > 0) {
        this.produto.id = this.produto.nome;
        api.post("/produto", this.produto).then(() => {
          this.getUsuarioProdutos();
        });
        this.produto.nome = "";
        this.produto.preco = "";
        this.produto.descricao = "";
        window.alert("Produto adicionado");
        this.adicionar = false;
      } else {
        window.alert("Preencha os campos obrigatorios");
      }
    },
  },
  created() {
    this.produto.usuario_id = this.usuario.id;
  },
};
</script>

<style scoped>
.adicionar-produto {
  display: grid;
  grid-template-columns: 100px 1fr;
  align-items: center;
  margin-bottom: 100px;
}
.btn {
  max-width: 50vh;
  grid-column: 2;
}
button {
  margin-bottom: 50px;
  margin-top: 50px;
}
</style>