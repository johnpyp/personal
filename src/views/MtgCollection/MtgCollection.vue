<template>
  <v-container grid-list-xl fluid class="ma-0 pa-0">
    <v-layout row wrap justify-center>
      <v-flex xs12 md10 lg8>
        <v-card>
          <v-toolbar dark color="primary">
            <v-toolbar-title>
              Mtg Collection Manager

            </v-toolbar-title>
            <v-spacer></v-spacer>
            <v-btn icon @click="clearCache">
              <v-icon>delete</v-icon>
            </v-btn>
            <v-btn icon :to="{name: 'Home'}" exact>
              <v-icon>home</v-icon>
            </v-btn>

          </v-toolbar>
          <v-card-text>
            <v-select label="Search for card" :items="cardList" v-model="chosenName" autocomplete browser-autocomplete="off"> </v-select>
          </v-card-text>
          <v-card-text>
            <p v-for="(card, index) in chosenFull" :key="index" v-if="card.image_uris">
              <v-tooltip right open-delay="0" close-delay="0" content-class="vtooltip">
                <a slot="activator" :href="card.image_uris.small" class="tooltip-target b3">{{card.name + ' - ' + (card.usd ? '$' + card.usd : 'Price unavailable') + ' - ' + _.upperCase(card.set)}}</a>
                <img :src="card.image_uris.small" alt="">

              </v-tooltip>

            </p>

            <pre>{{JSON.stringify(chosenFull, null, 2)}}</pre>

            <img src="" alt="">
          </v-card-text>
        </v-card>

      </v-flex>
    </v-layout>
  </v-container>

</template>

<script>
import _ from 'lodash'
import { Cache } from '@/Utils/Cache'
import localforage from 'localforage'
import memoryDriver from 'localforage-memoryStorageDriver'

// import _ from 'lodash'
export default {
  data() {
    return {
      cardList: [],
      chosenName: null,
      chosenFull: null
    }
  },
  methods: {
    clearCache() {
      return store.clear()
    }
  },
  async mounted() {
    let res = await api.get(
      'https://api.scryfall.com/catalog/card-names',
      x => x
    )
    this.cardList = res.data
  },
  computed: {
    _() {
      return _
    }
  },
  watch: {
    async chosenName() {
      let combined =
        'https://api.scryfall.com/cards/search?q=%21“' +
        this.chosenName.replace(' ', '+') +
        '”&unique=prints'
      let format = x => ({
        ...x,
        data: _.map(x.data, y =>
          _.pick(y, ['name', 'image_uris', 'usd', 'mtgo', 'legalities', 'set'])
        )
      })

      console.log(combined)
      let res = await api.getFollow(combined, 'next_page', 'has_more', format)
      console.log(await api.get(combined, format))
      return (this.chosenFull = res)
    }
  }
}
const store = localforage.createInstance({
  // List of drivers used
  driver: [localforage.INDEXEDDB, localforage.LOCALSTORAGE, memoryDriver],
  // Prefix all storage keys to prevent conflicts
  name: 'mtg-collection'
})
const api = Cache({
  timeout: 24 * 60 * 60 * 1000,
  store
})
</script>

<style>
.vtooltip {
  opacity: 1;
}
</style>
