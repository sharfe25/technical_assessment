<template>
<div>
    <v-app-bar
      
      absolute
      color="#039BE5"
      elevate-on-scroll
      scroll-target="#scrolling-techniques-7"
      class="px-7"
    >

      <v-toolbar-title class="white--text title_appbar">TECHNICAL ASSESSMENT</v-toolbar-title>
    
      <v-spacer></v-spacer>
      <v-btn text class="white--text" v-show="!height" @click="home">
        Invoices
      </v-btn>
      <v-btn text class="white--text" @click="products" v-show="!height">
        Products
      </v-btn>
      <v-app-bar-nav-icon color="white" v-show="height" @click="mobil_menu=true"></v-app-bar-nav-icon>
    </v-app-bar>
    <v-navigation-drawer
    absolute
    temporary
     v-model="mobil_menu"
     >
      <v-list-item>
        <v-list-item-content>
          <v-list-item-title class="title_appbar">
            TECHNICAL ASSESSMENT
          </v-list-item-title>
        </v-list-item-content>
      </v-list-item>

      <v-divider></v-divider>

      <v-list
        dense
        nav
      >
        <v-list-item
          link @click="home"
        >
          <v-list-item-icon>
            <v-icon>far fa-file-alt</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>Invoices</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item
          link @click="products"
        >
          <v-list-item-icon>
            <v-icon>fas fa-store</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>Products</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
</div>
</template>

<script>


  export default {
    name: 'Appbar',

    components: {
      
    },
    data:()=>({
      mobil_menu:false,
    }),
    methods:{
      home(){
        this.$router.push('/Home');
      },
      products(){
        this.$router.push('/Products');
      },
      clients(){
        this.$router.push('/Clients');
      }
    },
    computed: {
      height () {
        switch (this.$vuetify.breakpoint.name) {
          case 'xs': return true
          case 'sm': return true
          case 'md': return false
          case 'lg': return false
          case 'xl': return false
        }
      }
      },
  }
</script>

<style scoped>
.title_appbar{
  letter-spacing: 3px;
}
@media (max-width: 768px) {
  .title_appbar{
    letter-spacing: .5px;
    font-size: 1.1rem;
  }
}
</style>