import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import '@/assets/css/app.css'
import VueLazyload from 'vue-lazyload'
import def_lazy_img from './assets/img/ok-2.png'
Vue.config.productionTip = false
Vue.use(VueLazyload,{
    loading: def_lazy_img
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
