import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import Install from './views/Install.vue'
import UsefulShell from './views/UsefulShell'
import VueClipboard from 'vue-clipboard2'
import MtgEv from './views/MtgEv'
Vue.use(Router)
Vue.use(VueClipboard)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/install',
      name: 'Install',
      component: Install
    },
    {
      path: '/usefulshell',
      name: 'UsefulShell',
      component: UsefulShell
    },
    {
      path: '/mtgev',
      name: 'MtgEv',
      component: MtgEv
    }
  ]
})
