<template>
    <v-dialog
        transition="dialog-bottom-transition"
        max-width="600"
        v-model="dialogInvoiceSelected"
        persistent
      >
        
        <template>
          <v-card>
              
            <v-toolbar
              color="blue darken-1"
              dark
            >INVOICE - {{info_invoise.invoice==undefined?0:info_invoise.invoice.id}}</v-toolbar>
            <v-card-text class="mt-5">
            <div class="icon">
                <v-icon x-large color="primary" class="">fas fa-user-tie</v-icon>    
            </div> 
            <h1 class="display-1 text-center my-3">{{info_invoise.invoice==undefined?0:info_invoise.invoice.client}}</h1>
             <strong> Date:</strong> {{info_invoise.invoice==undefined?0:info_invoise.invoice.date}} <br>
             <strong> Discount:</strong> {{info_invoise.invoice==undefined?0:info_invoise.invoice.discount}} <br>
              
            </v-card-text>
            <v-divider class="mx-2"></v-divider>
            <v-data-table
                dense
                :headers="headers"
                :items="info_invoise.products"
                item-key="description_product"
                class="elevation-1 mt-7 mx-4"
            > 
            </v-data-table>
            <v-footer padless class="mt-2">
                <v-col
                class="text-right"
                cols="12"
                >
                <strong>Subotal:</strong> {{info_invoise.invoice==undefined?0:info_invoise.invoice.subtotal}} <br>
                <strong>Total:</strong> {{info_invoise.invoice==undefined?0:info_invoise.invoice.total}}
                </v-col>
            </v-footer>
            <v-card-actions class="justify-end">
              <v-btn
                text
                @click="passingInvoiceSelected({invoiceSelected: [], show: false})"
              >Close</v-btn>
            </v-card-actions>
          </v-card>
        </template>
      </v-dialog>

</template>

<script>
import {mapActions,mapState} from 'vuex';
import vuex from 'vuex'
import {mapFields} from 'vuex-map-fields'
export default {
    name: 'Invoices',

    components: {
      
    },
    data:()=>({
        headers: [
        {
          text: 'Quantity',
          align: 'center',
          value: 'quantity',
        },
        { text: 'Product Description', align: 'center',value: 'description_product' },
        { text: 'Price',align: 'center', value: 'price' },
      ],
    }),
    methods:{
        ...vuex.mapMutations(['passingInvoiceSelected']),
        ...mapActions(['view_more']),
    },
    created() {
        
      
    },
    computed:{...mapState([
        'products','products_invoice','id', 'dialogInvoiceSelected','info_invoise'
    ]),
     ...mapFields(['invoiceSelected'])
    } ,
    mounted(){
      this.$store.dispatch('product_list')
      
    }
  }
</script>

<style scoped>
.icon{
    display: flex !important;
    justify-content:center !important;
}
</style>