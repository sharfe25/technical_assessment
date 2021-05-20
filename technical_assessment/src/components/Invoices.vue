<template>
    <v-dialog
      max-width="600px"
      v-model="dialog"
    >
      <template v-slot:activator="{ on, attrs }">
        <v-btn
            dark
            v-bind="attrs"
            v-on="on"
            class="mx-0 mt-4"
            outlined
            color="indigo"
            
        >
          Add invoice
        </v-btn>
        
      </template>
      <v-card>
        <v-card-title>
          <span class="overline">New Invoice</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12">
                <v-text-field
                  :value="this.invoices.length+1"
                  label="Invoice Number"
                  disabled
                ></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field
                  v-model="date"
                  label="Date"
                  prepend-icon="fas fa-calendar-week"
                  disabled
                ></v-text-field>
              </v-col>
              <v-col
                cols="12"
                sm="12"
              >
                <v-autocomplete
                v-model="client"
                  label="*Clients"
                  :items="clients"
                  :rules="clientRules"
                  required
                ></v-autocomplete>
              </v-col>
              <v-col
                cols="12"
                sm="12"
              >
                 <v-text-field 
                  v-model="discount"
                 label="Discount"
                 suffix="%"
                 ></v-text-field>
              </v-col>
              <v-col
                cols="12"
                sm="12"
              >
                 <AddProducts/>
              </v-col>
            </v-row>
          </v-container>
          <small>*indicates required field</small>
        </v-card-text>
        <v-alert
          dense
          outlined
          type="error"
          v-model="alert"
          class="mx-3"
        >
          The number of articles cannot be greater than 10
        </v-alert>
        <ProductInvoice/>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="blue darken-1"
            text
            @click="dialog = false"
          >
            Close
          </v-btn>
          <v-btn
            color="blue darken-1"
            text
            @click="save"
          >
            Save
          </v-btn>
        </v-card-actions>
      </v-card>
      
    </v-dialog> 

</template>

<script>
import {mapActions,mapState} from 'vuex';
import AddProducts from './Add_products.vue';
import ProductInvoice from './Products_invoice.vue';
export default {
    name: 'Invoices',

    components: {
      AddProducts,ProductInvoice
    },
    data:()=>({
      num_product:0,
      discount:0,
      client:'',
      date:`${new Date().getDate()}/${new Date().getMonth() + 1}/${new Date().getFullYear()}`,
      alert:false,
      dialog:false,
      clientRules: [
            v => !!v || 'The client is required',
      ],
    }),
    methods:{
      ...mapActions(['add_invoice']),
      save(){
        let subtotal=0;
        this.num_product=0;
        this.products_array.forEach(product => {
            this.num_product+=parseInt(product.quantity)
            subtotal+=parseInt(product.quantity)*parseInt(product.price)
        });
        if (this.num_product>10) {
          this.alert=true
        }else{
          this.alert=false
          let total=0
          if (parseInt(this.discount)>0) {
            total= subtotal*(parseInt(this.discount)/100)
          }else{
            total= subtotal
          }
          
          let invoice={
            invoice_number:this.invoices.length+1,
            date:`${new Date().getDate()}/${new Date().getMonth() + 1}/${new Date().getFullYear()}`,
            client:this.client,
            subtotal,
            discount:this.discount,
            products:this.products_array,
            total,
          }
          this.add_invoice(invoice);
          this.dialog=false;
        }
          
      }
    },
    created() {
      
    },
    computed: mapState([
        'clients','invoices','quantity','products_array'
    ]),
    mounted(){
      this.$store.dispatch('client_list')
    }
  }
</script>

<style scoped>

</style>