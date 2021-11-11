const vm = new Vue({
  el: "#app",
  data: {
    produtos: [],
    produto: false
  },
  filters: {
    precoFormat(valor) {
      return valor.toLocaleString("pt-br", { style: "currency", currency: "BRL" })
    }
  },
  methods: {
    fetchProdutos() {
      fetch("./api/produtos.json")
        .then(r => r.json())
        .then(r => this.produtos = r)
    },
    fecthProduto(id) {
      fetch(`./api/produtos/${id}/dados.json`)
        .then(r => r.json())
        .then(r => this.produto = r)
    }
  },
  created() {
    this.fetchProdutos()
  }
})
