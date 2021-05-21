<template>
<div>
    <h1 class="overline ml-5">Product List</h1>
    <v-data-table
        dense
        :headers="headers"
        :items="products_invoice"
        item-key="id"
        class="elevation-1 mt-7 mx-4"
    >
    <template v-slot:[`item.quantity`]="{ item }">
        <v-text-field 
            v-model="item.quantity"
            type="number"
            :min="0"
            @change="count_quantity(item.quantity,item)"
        ></v-text-field>
    </template>
    </v-data-table>

 </div>      
      

</template>

<script>
import {mapActions,mapState} from 'vuex';
export default {
    name: 'Products_invoices',

    components: {
      
    },
    data:()=>({
        
        products:[],
        count:0,
        data:[],
        headers: [
        {
          text: 'Product ID',
          align: 'center',
          sortable: false,
          value: 'id',
        },
        { text: 'Description', align: 'center',value: 'description_product' },
        { text: 'Price',align: 'center', value: 'price' },
        { text: 'Quanity', value: 'quantity',align: 'center'}
      ],
      date: `${new Date().getDate()}/${new Date().getMonth() + 1}/${new Date().getFullYear()}`,
      clientRules: [
            v => !!v || 'The client is required',
      ],
    }),
    methods:{
        count_quantity(quantity,item){
            
            let stay=false;
            if(this.products.length>0){
                this.products.forEach((product)=>{
                    if(product.id==item.id){
                        product.quantity=parseInt(item.quantity)
                        stay=true;
                    }
                   
                })
            }
            if (stay==false) {
                this.products.push(item);
            }
            this.add_products_array(this.products)
            
        },
        ...mapActions(['add_count','add_products_array']),
    },
    created() {
        
    },
    watch:{
        
    },
    computed: {
        ...mapState(['products_invoice']),
       

    },
    mounted(){
        
    }
  }
</script>

<style scoped>

</style>