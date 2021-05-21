<template>
  <v-app light>
    <Appbar/>
    <v-container class="mt-7 pt-7">
      <h1 class=" mt-5 invoices_tittle text-center">INVOICES</h1> 
      <Invoices/>
      <v-btn
          
            class="mx-5 mt-4"
            outlined
            color="indigo"
            @click="invoice_list"
            
        >
          Update Table
        </v-btn>
      <v-data-table
        dense
        :headers="headers"
        :items="invoices"
        item-key="id"
        class="elevation-1 mt-7"
      >
      
        <template v-slot:[`item.actions`]="{ item }">
          <v-btn
            color=" white--text"
            icon text
            @click="view_more(item.id);passingInvoiceSelected({invoiceSelected: [], show: true,id:item.id});"
          ><v-icon color="primary" class="far fa-file-alt"></v-icon></v-btn>
         
        </template>
      </v-data-table>
       <InvoiceDetails/>

    </v-container>
    
  </v-app>
</template>

<script>
import Appbar from '../components/App_bar.vue';
import Invoices from '../components/Invoices.vue';
import InvoiceDetails from '../components/Invoice_details.vue';
import {mapActions,mapState} from 'vuex';
import vuex from 'vuex'
import {mapFields} from 'vuex-map-fields'
  export default {
    name: 'Home',

    components: {
      Appbar,Invoices,InvoiceDetails
    },
    data:()=>({
      id:0,
      headers: [
        {
          text: 'Invoice Number',
          align: 'start',
          value: 'id',
        },
        { text: 'Client', value: 'client' },
        { text: 'Subtotal', value: 'subtotal' },
        { text: 'Discount', value: 'discount' },
        { text: 'Total', value: 'total' },
        { text: 'View More', value: 'actions',align: 'center', sortable: false}
      ],
    }),
    methods:{
      ...vuex.mapMutations(['passingInvoiceSelected']),
      ...mapActions(['invoice_list','view_more'])
    },
    computed: {...mapState([
        'invoices','products_array'
    ]),
    ...mapFields(['invopiceSelected', 'dialogInvoiceSelected'])
    },
    created() {
      
    },
    mounted(){
      this.$store.dispatch('invoice_list')
      this.invoice_list()
    }
  }
</script>

<style scoped>
.title_appbar{
  letter-spacing: 3px;
 
}
.invoices_tittle{ 
  font-size: 2.5rem !important;
  background: -webkit-linear-gradient(#039BE5, #d6d6d6);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  overflow: hidden;
  line-height: 3rem;
  white-space: nowrap;
  border-right: 4px solid #ffffffbf;
  animation: typerwrite 1.2s steps(26, end), cursor 500ms steps(26) infinite normal;
}
@keyframes cursor {
    from {
        border-right-color: transparent;
    }
    to {
        border-right-color: transparent;
    }
}
@keyframes typerwrite {
    from {
        width: 0;
    }
    to {
        width: 100%;
    }
}
</style>