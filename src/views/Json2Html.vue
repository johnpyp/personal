<template>
  <v-container grid-list-xl fluid class="ma-0 pa-0">
    <v-layout row wrap justify-center>
      <v-flex xs12 md10 lg8 text-xs-left>
        <v-card>
          <v-toolbar color="primary" dark>
            <v-toolbar-title>Json2Html</v-toolbar-title>
            <v-spacer></v-spacer>
            <v-btn icon :to="{name: 'Home'}" exact>
              <v-icon>home</v-icon>
            </v-btn>
          </v-toolbar>
        </v-card>

      </v-flex>
    </v-layout>
  </v-container>

</template>

<script>
import _ from 'lodash'
export default {
  computed: {
    _() {
      return _
    }
  }
}
</script>

<style>
</style>
