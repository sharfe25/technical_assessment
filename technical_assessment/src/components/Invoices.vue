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
            @click="clean_fields()"
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
              <v-select
                v-model="client"
                  label="Clients"
                  :items="clients"
                  :rules="clientRules"
                  required
              ></v-select>
  
              </v-col>
              <v-col
                cols="12"
                sm="12"
              >
                 <v-text-field 
                  v-model="discount"
                 label="Discount"
                 suffix="%"
                 type="number"
                 :min="0"
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
        </v-card-text>
        <v-alert
          dense
          outlined
          type="error"
          v-model="alert"
          class="mx-3"
        >
          The number of articles must be greater than 0 and less than or equals to 10
        </v-alert>
        <v-alert
          dense
          outlined
          type="error"
          v-model="alert_no_client"
          class="mx-3"
        >
          {{message}}
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
import {mapActions,mapState,mapMutations} from 'vuex';
import AddProducts from './Add_products.vue';
import ProductInvoice from './Products_invoice.vue';
export default {
    name: 'Invoices',

    components: {
      AddProducts,ProductInvoice
    },
    data:()=>({
      
      message:'',
      num_product:0,
      discount:0,
      client:'',
      date:`${new Date().getDate()}/${new Date().getMonth() + 1}/${new Date().getFullYear()}`,
      alert:false,
      alert_no_client:false,
      dialog:false,
      clientRules: [
            v => !!v || 'The client is required',
      ],
    }),
    methods:{
      ...mapMutations(['setProductsArray']),
      clean_fields(){
        this.products_array.forEach(e => {
            e.quantity=''
        });
        this.setProductsArray([])
      },
      ...mapActions(['add_invoice']),
      save(){
        if (this.client==='' || this.client===' ') {
          this.alert_no_client=true;
          this.message='The client is requerid'
        }else{
          this.alert_no_client=false;
          if(this.products_array.length>0){
            let array_p=[]
            this.products_array.forEach(element => {
              
              if (element.quantity!="0") {
                if (element.quantity!="" && element.quantity!=0 && !isNaN(element.quantity)) {
                  array_p.push(element)
                }
              }
                
            });
            let subtotal=0;
            this.num_product=0;
            array_p.forEach(product => {
                this.num_product+=parseInt(product.quantity)
                subtotal+=parseInt(product.quantity)*parseInt(product.price)
            });
            let total=0
            if (parseInt(this.discount)>0) {
              total= subtotal-(subtotal*(parseInt(this.discount)/100))
            }else{
              total= subtotal
            }
            if (this.num_product>10 || this.num_product===0) {
              this.alert=true
            }else{
              this.alert=false
              if (this.discount == "") {
                this.discount=0
              }
              let invoice={
                invoice_number:this.invoices.length+1,
                date:`${new Date().getDate()}/${new Date().getMonth() + 1}/${new Date().getFullYear()}`,
                client:this.client,
                subtotal,
                discount:this.discount,
                products:array_p,
                total,
              }
              this.add_invoice(invoice);
              this.dialog=false;
              this.client=' '
              this.discount=0
            }
          }else{
              this.alert_no_client=true;
            this.message='You must enter at least one product'
          }
            
          
        }
      },
    },
    created() {
      
    },
    computed: {
      ...mapState([
        'clients','invoices','quantity','products_array'
      ]),
      products_A: {
           get(){
             return this.products_array
           },
          set(newArray){
            return newArray
          } 
      }
    },
    mounted(){
      this.$store.dispatch('client_list')
    }
  }
</script>

<style scoped>

</style>