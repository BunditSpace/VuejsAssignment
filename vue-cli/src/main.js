import Vue from 'vue'
import App from './App.vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import BootstrapVue from 'bootstrap-vue'
import 'bootstrap'

import jQuery from 'jquery'
global.$ = jQuery
global.jQuery = jQuery




Vue.use(BootstrapVue);

Vue.config.productionTip = false

Vue.mixin({
  methods: {
    trimSpace: function (word) {
      return word.replace(/ +/g, "");
    }
  }
})

new Vue({
  render: h => h(App)
}).$mount('#app')
