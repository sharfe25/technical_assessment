<template>
    <v-dialog
        transition="dialog-bottom-transition"
        max-width="600"
      >
        <template v-slot:activator="{ on, attrs }">
          <v-btn
            color="blue darken-1 white--text"
            v-bind="attrs"
            v-on="on"
          >Add products</v-btn>
        </template>
        <template v-slot:default="dialog">
          <v-card>
            <v-toolbar
              color="blue darken-1"
              dark
            >Products</v-toolbar>
            <v-card-text>
              <v-data-table
                dense
                :headers="headers"
                :items="products"
                item-key="id"
                class="elevation-1 mt-7"
            >

            <template v-slot:[`item.actions`]="{ item }">
                <v-btn icon text color="primary" @click="add_product(item);">
                    <v-icon color="primary" class="fas fa-plus"></v-icon>
                </v-btn>
            </template>
            </v-data-table>
            </v-card-text>
            <v-card-actions class="justify-end">
              <v-btn
                text
                @click="dialog.value = false,products_invoice"
              >Close</v-btn>
            </v-card-actions>
          </v-card>
        </template>
      </v-dialog>

</template>

<script>
import {mapActions,mapState} from 'vuex';
export default {
    name: 'Invoices',

    components: {
      
    },
    data:()=>({
        list_products:[],
        quantity:{},
        counter_quantity:0,
        headers: [
        {
          text: 'Product ID',
          align: 'center',
          sortable: false,
          value: 'id',
        },
        { text: 'Description', align: 'center',value: 'description_product' },
        { text: 'Price',align: 'center', value: 'price' },
        { text: 'Add', value: 'actions',align: 'center', sortable: false},
      ],
      date: `${new Date().getDate()}/${new Date().getMonth() + 1}/${new Date().getFullYear()}`,
      clientRules: [
            v => !!v || 'The client is required',
      ],
    }),
    methods:{
        ...mapActions(['add_product']),
        // add_quantity(item){
        //   if (item.quantity===undefined) {
        //     item.quantity=parseInt(this.quantity[item.id])
        //   }else{
        //     item.quantity=parseInt(item.quantity)+parseInt(this.quantity[item.id])
            
        //   }
        //   return item;
          
        // }
    },
    created() {
      
    },
    computed: mapState([
        'products','products_invoice'
    ]),
    mounted(){
      this.$store.dispatch('product_list')
    }
  }
</script>

<style scoped>

</style>