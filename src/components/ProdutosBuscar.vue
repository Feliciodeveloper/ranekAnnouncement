<template>
  <form>
    <input
      type="text"
      name="busca"
      id="busca"
      v-model="busca"
      placeholder="Buscar..."
    />
    <input
      type="submit"
      value="Buscar"
      id="lupa"
      @click.prevent="buscaProduto(busca)"
    />
  </form>
</template>

<script>
export default {
  name: "ProdutosBuscar",
  data() {
    return {
      busca: "",
    };
  },
  methods: {
    buscaProduto(param) {
      this.$router.push({ query: { q: param } });
      this.busca = "";
    },
  },
};
</script>

<style>
form {
  margin: 30px auto 60px auto;
  max-width: 600px;
  position: relative;
}
#busca {
  width: 100%;
  padding: 20px;
  border: none;
}
#busca:focus,
#busca:hover {
  transform: scale(1.1);
}
#lupa {
  width: 62px;
  height: 62px;
  background: url(../assets/search.svg) no-repeat center center;
  text-indent: 150px;
  border: none;
  cursor: pointer;
  position: absolute;
  top: 0px;
  right: 0px;
  box-shadow: none;
}
#lupa:hover,
#lupa:focus {
  border: none;
}
</style>
