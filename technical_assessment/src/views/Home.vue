<template>
  <v-app>
    <Appbar/>
    <v-container class="mt-8 pt-8">
      <h1 class="display-1 mt-5">INVOICES</h1> 
      <Invoices/>
      <v-data-table
        dense
        :headers="headers"
        :items="invoices"
        item-key="id"
        class="elevation-1 mt-7"
      ></v-data-table>
      

    </v-container>
    
  </v-app>
</template>

<script>
import Appbar from '../components/App_bar.vue';
import Invoices from '../components/Invoices.vue';
import {mapActions,mapState} from 'vuex';
  export default {
    name: 'Home',

    components: {
      Appbar,Invoices
    },
    data:()=>({
      headers: [
        {
          text: 'Invoice Number',
          align: 'start',
          sortable: false,
          value: 'id',
        },
        { text: 'Client', value: 'client' },
        { text: 'Subtotal', value: 'subtotal' },
        { text: 'Discount', value: 'discount' },
        { text: 'Total', value: 'total' },
      ],
    }),
    methods:{
    },
    computed: mapState([
        'invoices'
    ]),
    created() {
      
    },
    mounted(){
      this.$store.dispatch('invoice_list')
    }
  }
</script>

<style scoped>
.title_appbar{
  letter-spacing: 3px;
}
</style>