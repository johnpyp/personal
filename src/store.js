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
      }
    ]
  },
  mutations: {},
  actions: {}
})
