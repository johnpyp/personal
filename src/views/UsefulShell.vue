<template>
  <v-container grid-list-xl fluid class="ma-0 pa-0">
    <v-layout row wrap justify-center>
      <v-flex xs12 md10 lg8 text-xs-left>
        <v-card>
          <v-toolbar color="primary" dark>
            <v-toolbar-title>Useful Shell</v-toolbar-title>
            <v-spacer></v-spacer>
            <v-btn icon :to="{name: 'Home'}" exact>
              <v-icon>home</v-icon>
            </v-btn>
          </v-toolbar>
          <v-card-text>
            <v-flex v-for="(use, index) in useful" :key="index">
              <v-layout row wrap>
                <v-flex xs12>
                  <p class="subheading mb-0">{{use.function}}:</p>
                </v-flex>
                <v-flex xs11>
                  <pre v-highlightjs="use.exec" v-if="_.isString(use.exec)"><code class="shell"></code></pre>
                  <pre v-highlightjs="use.exec.join('\n')" v-if="_.isArray(use.exec)"><code class="shell"></code></pre>

                </v-flex>

                <v-btn icon @click="$copyText(use.exec)" v-if="_.isString(use.exec)">
                  <v-icon>file_copy</v-icon>
                </v-btn>
                <v-btn icon @click="$copyText(use.exec.join('\n'))" v-if="_.isArray(use.exec)">
                  <v-icon>file_copy</v-icon>
                </v-btn>

              </v-layout>

            </v-flex>

          </v-card-text>
        </v-card>
      </v-flex>

    </v-layout>
  </v-container>
</template>

<script>
import _ from 'lodash'
export default {
  data() {
    return {
      useful: require('../assets/useful')
    }
  },
  computed: {
    _() {
      return _
    }
  }
}
</script>

<style>
</style>
