<template>
  <v-container grid-list-xs>
    <v-layout row wrap>
      <v-flex xs12 text-xs-left>
        <v-layout row wrap>
          <v-flex xs12 sm6 md4 lg2 v-for="(pack, index) in packages" :key="index">
            <v-checkbox v-model="selected" :label="pack.name" :value="pack.name" hide-details></v-checkbox>
          </v-flex>
        </v-layout>
        <v-flex v-if="text">
          <pre v-highlightjs="text"><code class=" bash"></code></pre>

        </v-flex>

        <v-btn color="success" @click="saveFile(text)" :disabled="!text">Download</v-btn>
      </v-flex>
      <v-flex xs12 text-xs-left>
        <h1>Useful Stuff</h1>
        <v-flex v-for="(use, index) in useful" :key="index">
          <p class="subheading">{{use.function}}:
            <pre v-highlightjs="use.exec" v-if="_.isString(use.exec)"><code class="shell"></code></pre>
            <pre v-highlightjs="use.exec.join('\n')" v-if="_.isArray(use.exec)"><code class="shell"></code></pre>
          </p>

        </v-flex>
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
      packages: require('../assets/packages'),
      useful: require('../assets/useful')
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
