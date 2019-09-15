import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import '@/assets/css/app.css';
import VueLazyload from 'vue-lazyload';
import def_lazy_img from './assets/img/ok-2.png';
import infiniteScroll from 'vue-infinite-scroll';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import  apiConfig from '../config/api.config';
import Axios from 'axios';
import VueAxios from 'vue-axios';

Vue.config.productionTip = false;

Vue.use(infiniteScroll);
Vue.use(ElementUI);
Vue.use(VueLazyload,{
    loading: def_lazy_img
})

Vue.use(VueAxios,Axios);
// 自己配置的原型baseurl
Axios.defaults.baseURL = apiConfig.baseUrl

  new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
