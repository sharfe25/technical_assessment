<template>
    <v-app-bar
      absolute
      color="#039BE5"
      elevate-on-scroll
      scroll-target="#scrolling-techniques-7"
      class="px-7"
    >

      <v-toolbar-title class="white--text title_appbar">TECHNICAL ASSESSMENT</v-toolbar-title>

      <v-spacer></v-spacer>
      <v-btn text class="white--text">
        Invoices
      </v-btn >
      <v-btn text class="white--text">
        Clients
      </v-btn>
      <v-btn text class="white--text">
        Products
      </v-btn>
      <!-- <v-app-bar-nav-icon></v-app-bar-nav-icon> -->
    </v-app-bar>
</template>

<script>


  export default {
    name: 'Appbar',

    components: {
      
    },
  }
</script>

<style scoped>
.title_appbar{
  letter-spacing: 3px;
}
</style>