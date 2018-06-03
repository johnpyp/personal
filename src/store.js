import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    apps: [
      {
        type: 'subheader',
        content: 'Ubuntu'
      },
      {
        type: 'items',
        content: [
          {
            name: 'Install',
            route: { name: 'Install' },
            description:
              'Generator to create ubuntu install scripts for an opinionated list of packages.',
            icon: 'cloud_download'
          },
          {
            name: 'Useful Shell',
            route: { name: 'UsefulShell' },
            description: 'A list of useful shell commands for Ubuntu',
            icon: 'notes'
          }
        ]
      },
      {
        type: 'subheader',
        content: 'MTG'
      },
      {
        type: 'items',
        content: [
          {
            name: 'Mtg Estimated Value',
            route: { name: 'MtgEv' },
            description:
              'Calculate the Estimated Value of any Magic: The Gathering set.',
            icon: 'games'
          },
          {
            name: 'Mtg Collection Manager',
            route: { name: 'MtgCollection' },
            description: 'Track and manage your mtg collection',
            icon: 'games'
          }
        ]
      },
      {
        type: 'subheader',
        content: 'Pokemon Go'
      },
      {
        type: 'items',
        content: [
          {
            name: 'Json2Html',
            route: { name: 'Json2Html' },
            description: 'Convert GoManager Json to HTML',
            icon: 'compare_arrows'
          }
        ]
      }
    ]
  },
  mutations: {},
  actions: {}
})
