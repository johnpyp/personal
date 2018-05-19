<template>
  <v-container grid-list-xl fluid class="ma-0 pa-0">
    <v-layout row wrap justify-center>
      <v-flex xs12 md10 lg8 text-xs-left>
        <v-card>
          <v-toolbar color="primary" dark>
            <v-toolbar-title>Mtg Estimated Value</v-toolbar-title>
            <v-spacer></v-spacer>
            <v-toolbar-items>
              <v-btn @click="clearCache" flat>Clear Cache
                <v-icon>delete</v-icon>
              </v-btn>
            </v-toolbar-items>
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
            <v-flex xs1>
              <v-text-field label="Min" id="id" type="number" v-model="min"></v-text-field>

            </v-flex>
            <p>Ev: ${{_.round(ev)}}</p>
          </v-card-actions>
        </v-card>
        <v-data-table :headers="setDataHeaders" :items="setData" hide-actions class="elevation-1" v-if="setData">
          <template slot="items" slot-scope="props">
            <td>{{ props.item.name }}</td>
            <td class="text-xs-left">{{ props.item.set }}</td>
            <td class="text-xs-left">{{ props.item.usd }}</td>
            <td class="text-xs-left">{{ props.item.rarity }}</td>
          </template>
        </v-data-table>

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
  store
})

export default {
  data() {
    return {
      remaining: null,
      value: '',
      sets: [],
      min: 1,
      setData: null,
      setDataHeaders: [
        { text: 'Name', value: 'name', align: 'left' },
        { text: 'Set', value: 'set', align: 'left' },
        { text: 'Price (TCG Low)', value: 'usd', align: 'left' },
        { text: 'Rarity', value: 'rarity', align: 'left' }
      ]
    }
  },
  computed: {
    _() {
      return _
    },
    ev() {
      let evTotal = 0
      const average = (arr, s) =>
        arr.reduce((p, c) => p + (c > this.min ? c : s), 0) / arr.length
      let avg = (string, s) =>
        average(
          _.map(_.filter(this.setData, { rarity: string }), x =>
            parseFloat(x.usd)
          ),
          s
        )
      if (this.setData) {
        let mythics = avg('mythic', 0.2) * 4.5
        let rares = avg('rare', 0.1) * 31.5
        let uncommons = avg('uncommon', 0.0006) * 108
        let commons = avg('common', 0.0004) * 396
        console.log(mythics, rares, uncommons, commons)
        evTotal = mythics + rares + uncommons + commons
      }
      return evTotal
    }
  },
  methods: {
    async clearCache() {
      return store.clear()
    },
    async getSetData() {
      if (!this.value || this.value === '') return false
      let res = await api.getFollow(
        'https://api.scryfall.com/cards/search?q=s%3A' + this.value,
        'next_page',
        'has_more',
        x => ({
          ...x,
          data: _.map(x.data, y => _.pick(y, ['name', 'set', 'usd', 'rarity']))
        }),
        50
      )

      this.setData = res
    },
    async getRemaining() {
      let res = await navigator.storage.estimate()
      return res
    }
  },
  async mounted() {
    let res = await api.get('https://api.scryfall.com/sets/', x => ({
      ...x,
      data: _.map(x.data, y => _.pick(y, ['name', 'code']))
    }))

    this.sets = res.data
  }
}
</script>

<style>
</style>
