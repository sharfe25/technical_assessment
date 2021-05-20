import Vue from 'vue'
import Vuex from 'vuex'
import axios from "axios"

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    invoices:[],
    clients:[],
    products:[],
    products_invoice:[],
    quantity:0,
    products_array:[],
  },
  getters:{
    getInvoices(state){
      return state.invoices
    },
    getClients(state){
      return state.clients
    },
    getProducts(state){
      return state.products
    },
    getProductsInvoice(state){
      console.log(state.products_invoice)
      return state.products_invoice
    }
  },
  mutations: {
    setCount(state,items){
      state.quantity=items
    },
    setInvoices(state,items){
      state.invoices=items
    },
    setClients(state,items){
      state.clients=items
    },
    setProducts(state,items){
      state.products=items
    },
    setProductsInvoice(state,items){
      let stay=false;
      
      if(state.products_invoice.length==0){
        state.products_invoice.push(items)
        stay=true;
        
      }else{
        state.products_invoice.forEach((product)=>{
          if (product.id==items.id) {
            stay=true;
          }
        })
      }
      if(stay==false){
        state.products_invoice.push(items)
      }
      
      // localStorage.setItem('invoice_products',JSON.stringify(state.products_invoice))
    },
    setProductsArray(state,items){
      state.products_array=items
    }
  },
  actions: {
    invoice_list({commit}) {
      const path = 'http://localhost:4000/invoices/invoicesList';
      axios.get(path).then((res) => res.data.data.invoices)
      .then((items)=>{
        commit('setInvoices',items) 
      })
      .catch((error) => {
          console.log(error)
      })
    },
    client_list({commit}) {
      const path = 'http://localhost:4000/clients/clientList';
      axios.get(path).then((res) => res.data.data.clients)
      .then((items)=>{
        commit('setClients',items) 
      })
      .catch((error) => {
          console.log(error)
      })
    },
    product_list({commit}) {
      const path = 'http://localhost:4000/products/productList';
      axios.get(path).then((res) => res.data.data.products)
      .then((items)=>{
        commit('setProducts',items) 
      })
      .catch((error) => {
          console.log(error)
      })
    },
    add_product({commit},products) {
      commit('setProductsInvoice',products)   
    },
    add_count({commit},count){
      commit('setCount',count)   
    },
    add_products_array({commit},products){
      commit('setProductsArray',products)
    },
    add_invoice({commit},new_invoice) {
      const path = 'http://localhost:4000/invoices/new_invoice';
      axios.post(path,new_invoice).then((res) => res.data.data.products)
      .then((items)=>{
        commit('setProducts',items) 
      })
      .catch((error) => {
          console.log(error)
      })
    },
  },
  modules: {
  }
})
