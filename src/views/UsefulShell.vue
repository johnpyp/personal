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
            <v-layout row wrap>

              <v-flex xs12 md6 v-for="(use, index) in formatted" :key="index">
                <v-divider></v-divider>
                <v-card class="elevation-6">
                  <v-card-title>
                    <div>
                      <h3 class="headline mb-0">{{use.function}}</h3>
                    </div>
                  </v-card-title>
                  <v-card-text>
                    <pre v-highlightjs="use.exec"><code class="shell"></code></pre>

                  </v-card-text>
                  <v-card-actions>
                    <v-btn flat color="primary" @click="$copyText(use.exec)">Copy &nbsp;
                      <v-icon>file_copy</v-icon>
                    </v-btn>
                  </v-card-actions>
                </v-card>

              </v-flex>
            </v-layout>

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
    },
    formatted() {
      return _.map(
        this.useful,
        x => (_.isArray(x.exec) ? { ...x, exec: x.exec.join('\n') } : x)
      )
    }
  }
}
</script>

<style>
</style>
