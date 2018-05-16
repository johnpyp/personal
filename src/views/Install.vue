<template>
  <v-container grid-list-xl fluid class="ma-0 pa-0">
    <v-layout row wrap justify-center>
      <v-flex xs12 md10 lg8 text-xs-left>
        <v-card>
          <v-toolbar color="primary" dark>
            <v-toolbar-title>Install</v-toolbar-title>
            <v-spacer></v-spacer>
            <v-btn icon :to="{name: 'Home'}" exact>
              <v-icon>home</v-icon>
            </v-btn>
          </v-toolbar>
          <v-card-text>
            <v-layout row wrap v-for="(packages, index) in _.map(_.groupBy(packages, 'cat'), (x, cat) => ({packages: x, cat}))" :key="index">
              <v-flex xs12>

                <h2>{{packages.cat}}</h2>
              </v-flex>

              <v-flex xs12 sm6 md4 lg2 v-for="(pack, index2) in packages.packages" :key="index2">
                <v-checkbox v-model="selected" :label="pack.name" :value="pack.name" hide-details></v-checkbox>
              </v-flex>
            </v-layout>

          </v-card-text>
          <v-divider v-if="text"></v-divider>
          <v-card-text v-if="text">
            <pre v-highlightjs="text"><code class=" bash"></code></pre>

          </v-card-text>
          <v-divider></v-divider>
          <v-card-actions>
            <v-btn color="success" @click="saveFile(text)" :disabled="!text">Download</v-btn>

          </v-card-actions>

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
      install: '',
      selected: [],
      packages: require('../assets/packages')
    }
  },
  computed: {
    _() {
      return _
    },
    text() {
      let chosen = _.filter(this.packages, p => this.selected.includes(p.name))
      let res = ''

      let aptList = _.map(_.filter(chosen, { manager: 'apt' }), 'exec').join(
        ' '
      )
      let snapList = _.map(_.filter(chosen, { manager: 'snap' }), 'exec').join(
        ' '
      )
      let customList = _.map(_.filter(chosen, { manager: 'custom' }), 'exec')
      if (aptList.length > 0) res += '\n\n#apt\nsudo apt-get install ' + aptList
      if (snapList.length > 0) res += '\n\n#snap\nsudo snap install ' + snapList
      if (customList.length > 0) {
        res += '\n\n#custom\n' + _.flattenDeep(customList).join('\n')
      }
      return res.length > 0 ? '#!/bin/bash' + res : null
    }
  },
  methods: {
    saveFile(data) {
      const blob = new Blob([data], { type: 'text/plain' })
      const e = document.createEvent('MouseEvents')
      const a = document.createElement('a')
      a.download = 'install.sh'
      a.href = window.URL.createObjectURL(blob)
      a.dataset.downloadurl = ['text/plain', a.download, a.href].join(':')
      e.initEvent(
        'click',
        true,
        false,
        window,
        0,
        0,
        0,
        0,
        0,
        false,
        false,
        false,
        false,
        0,
        null
      )
      a.dispatchEvent(e)
    }
  }
}
</script>

<style>
</style>
