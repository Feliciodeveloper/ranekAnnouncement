<template>
  <div class="produto" v-if="produto">
    <router-link :to="{ name: 'Produto', params: { id: produto.id } }">
      <img
        class="produto-img"
        :src="produto.fontos[0].src"
        :alt="produto.fontos[0].titulo"
        v-if="produto.fotos"
      />
      <p>Ver Produto</p>
    </router-link>
    <div class="info">
      <h2 class="titulo">{{ produto.nome }}</h2>
      <p>{{ produto.preco | numeroPreco }}</p>
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: "ProdutoItem",
  props: ["produto"],
};
</script>

<style scoped>
.produto {
  display: grid;
  grid-template-columns: minmax(100px, 200px) 1fr;
  grid-gap: 20px;
  margin-bottom: 40px;
  position: relative;
}
li a:hover {
  background: none;
  color: none;
  color: #000000;
}
.info {
  align-self: end;
}
.produto-img {
  border-radius: 4px;
  overflow: hidden;
  height: 100px;
}
</style>