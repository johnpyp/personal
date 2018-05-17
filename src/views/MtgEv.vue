<template>
  <v-container grid-list-xl fluid class="ma-0 pa-0">
    <v-layout row wrap justify-center>
      <v-flex xs12 md10 lg8 text-xs-left>
        <v-card>
          <v-toolbar color="primary" dark>
            <v-toolbar-title>Mtg Estimated Value</v-toolbar-title>
            <v-spacer></v-spacer>
            <v-btn icon :to="{name: 'Home'}" exact>
              <v-icon>home</v-icon>
            </v-btn>
          </v-toolbar>
          <v-card-text>
            <v-select :items="sets" item-value="code" item-text="name" v-model="value" label="Choose a set" autocomplete></v-select>
          </v-card-text>
          <v-card-actions>
            <v-btn color="green" @click="getSetData" dark>Get EV</v-btn>
            <v-btn color="blue" @click="remaining = getRemaining()" dark>Calculate Remaining</v-btn>
            <p>Remaining: {{remaining}}</p>
          </v-card-actions>
        </v-card>
        <div v-if="setData">
          {{setData}}
        </div>

      </v-flex>
    </v-layout>
  </v-container>

</template>

<script>
import _ from 'lodash'
import { Cache } from '../Utils/Cache'
// import { setup } from 'axios-cache-adapter'
import localforage from 'localforage'
import memoryDriver from 'localforage-memoryStorageDriver'
// import _ from 'lodash'
const store = localforage.createInstance({
  // List of drivers used
  driver: [localforage.INDEXEDDB, localforage.LOCALSTORAGE, memoryDriver],
  // Prefix all storage keys to prevent conflicts
  name: 'mtg-ev'
})
const api = Cache({
  timeout: 24 * 60 * 60 * 1000,
  store,
  format: x => {
    return _.map(x.data, y => _.pick(y, ['name', 'set', 'usd']))
  }
})

export default {
  data() {
    return {
      remaining: null,
      value: '',
      sets: [],
      setData: null
    }
  },
  methods: {
    async getSetData() {
      if (!this.value || this.value === '') return false
      let res = await api.batchGet(
        _.map(
          _.range(231),
          (x, index) => 'https://api.scryfall.com/cards?page=' + (index + 1)
        ),
        x => _.map(x.data, y => _.pick(y, ['name', 'set', 'usd'])),
        true,
        50
      )

      this.setData = res.slice(0, 10)
    },
    async getRemaining() {
      let res = await navigator.storage.estimate()
      return res
    }
  },
  async mounted() {
    let res = await api.get('https://api.scryfall.com/sets/', x =>
      _.map(x.data, y => _.pick(y, ['name', 'code']))
    )

    this.sets = res
  },
  computed: {}
}
</script>

<style>
</style>
