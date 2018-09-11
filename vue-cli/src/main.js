import Vue from 'vue/dist/vue.js'
import App from './App.vue'
import Home from './components/Home.vue'

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import BootstrapVue from 'bootstrap-vue'
import 'bootstrap'
import VueRouter from 'vue-router'
import jQuery from 'jquery'
global.$ = jQuery
global.jQuery = jQuery




Vue.use(BootstrapVue);
Vue.use(VueRouter)
Vue.config.productionTip = false

const Bar = { template: '<div>bar</div>' }

// 2. Define some routes
// Each route should map to a component. The "component" can
// either be an actual component constructor created via
// `Vue.extend()`, or just a component options object.
// We'll talk about nested routes later.
const routes = [
  { path: '/', component: Home, name: 'home' },
  { path: '/bar', component: Bar }
]

// 3. Create the router instance and pass the `routes` option
// You can pass in additional options here, but let's
// keep it simple for now.
const router = new VueRouter({
  routes // short for `routes: routes`
})

Vue.mixin({
  methods: {
    trimSpace: function (word) {
      return word.replace(/ +/g, "");
    }
  }
})

// 4. Create and mount the root instance.
// Make sure to inject the router with the router option to make the
// whole app router-aware.
new Vue({
  router,
  render: h => h(App)
}).$mount('#app')


// new Vue({
//   render: h => h(App)
// }).$mount('#app')
