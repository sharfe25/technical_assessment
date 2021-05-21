<template>
  <v-app light>
    <Appbar/>
    <v-container class="mt-7 pt-7">
      <h1 class=" mt-5 tittle text-center">PRODUCTS</h1> 
      <v-data-table
        dense
        :headers="headers"
        :items="products"
        item-key="id"
        class="elevation-1 mt-7"
      >
      </v-data-table>

    </v-container>
    
  </v-app>
</template>

<script>
import Appbar from '../components/App_bar.vue';
import {mapActions,mapState} from 'vuex';

  export default {
    name: 'Products',

    components: {
      Appbar
    },
    data:()=>({
      headers: [
        {
          text: 'Id',
          align: 'start',
          value: 'id',
        },
        { text: 'Description Product', value: 'description_product' },
        { text: 'Price', value: 'price' },
      ],
    }),
    methods:{
    },
    computed: {...mapState([
        'products'
    ]),
    
    },
    created() {
      
    },
    mounted(){
      this.$store.dispatch('product_list')
    }
  }
</script>

<style scoped>
.tittle{ 
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