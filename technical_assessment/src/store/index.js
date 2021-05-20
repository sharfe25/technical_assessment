import Vue from 'vue'
import Vuex from 'vuex'
import axios from "axios"

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    invoices:[]
  },
  getters:{
    getInvoices(state){
      return state.invoices
    }
  },
  mutations: {
    setInvoices(state,items){
      state.invoices=items
    },
    

  },
  actions: {
    invoice_list({commit}) {
      // let invoices=[]
      const path = 'http://localhost:4000/invoices/invoicesList';
      axios.get(path).then((res) => res.data.data.invoices)
      .then((items)=>{
        commit('setInvoices',items) 
      })
      .catch((error) => {
          console.log(error)
      })
            
      
      
    }
  },
  modules: {
  }
})
