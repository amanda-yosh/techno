const vm = new Vue({
  el: "#app",

  data: {
    produtos: [],
    produto: false,
    carrinho: [],
  },

  filters: {
    precoFormat(valor) {
      return valor.toLocaleString("pt-br", { style: "currency", currency: "BRL" })
    }
  },

  computed: {
    carrinhoTotal() {
      let total = 0

      if (this.carrinho.length > 0) {
        this.carrinho.forEach(item => {
          total += item.preco
        })
      }

      return total
    },
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
    },

    abrirProduto(id) {
      this.fecthProduto(id)
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      })
    },

    fecharModal({ target, currentTarget }) {
      if (target === currentTarget) this.produto = false
    },

    adicionarItem() {
      if (this.produto.estoque > 0) {
        const { id, nome, preco } = this.produto

        this.produto.estoque--
        this.carrinho.push({ id, nome, preco })
      }
    },

    removerItem(index) {
      if (this.carrinho.length > 0) {
        this.carrinho.splice(index, 1)
      }
    },

    checarLocalStorage() {
      if (window.localStorage.carrinho)
        this.carrinho = JSON.parse(window.localStorage.carrinho)
    }
  },

  watch: {
    //sempre que eu quiser ficar de olho nas mudanças de uma propriedade eu coloco dentro do watch
    carrinho() {
      window.localStorage.carrinho = JSON.stringify(this.carrinho)
    }
  },

  created() {
    // quando a instancia do Vue for criada
    this.fetchProdutos()
    this.checarLocalStorage()
  }
})
