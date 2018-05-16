import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import Install from './views/Install.vue'
import UsefulShell from './views/UsefulShell'
Vue.use(Router)

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
    }
  ]
})
