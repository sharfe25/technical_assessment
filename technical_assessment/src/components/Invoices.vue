<template>
    <v-dialog
      v-model="dialog"
      persistent
      max-width="600px"
    >
      <template v-slot:activator="{ on, attrs }">
        <v-btn
            dark
            v-bind="attrs"
            v-on="on"
            class="mx-0 mt-4"
            outlined
            color="indigo"
            @click="add_invoices"
        >
          Add invoice
        </v-btn>
        
      </template>
      <v-card>
        <v-card-title>
          <span class="headline">New Invoice</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12">
                <v-text-field
                  label="Invoice Number"
                  
                ></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field
                  label="Date"
                ></v-text-field>
              </v-col>
              <v-col
                cols="12"
                sm="6"
              >
                <v-select
                  :items="['0-17', '18-29', '30-54', '54+']"
                  label="Discount"
                  required
                ></v-select>
              </v-col>
              <v-col
                cols="12"
                sm="6"
              >
                <v-autocomplete
                  :items="['Skiing', 'Ice hockey', 'Soccer', 'Basketball', 'Hockey', 'Reading', 'Writing', 'Coding', 'Basejump']"
                  label="Interests"
                  multiple
                ></v-autocomplete>
              </v-col>
            </v-row>
          </v-container>
          <small>*indicates required field</small>
        </v-card-text>
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
            @click="dialog = false"
          >
            Save
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog> 

</template>

<script>

export default {
    name: 'Invoices',

    components: {
      
    },
    data:()=>({
      
    }),
    methods:{
     
    },
    
    created() {
      
    },
    mounted(){
     
    }
  }
</script>

<style scoped>

</style>