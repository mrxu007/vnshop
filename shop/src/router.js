import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import Address from './views/Address.vue'
import cartList from './views/cartList.vue'
import orderConfirm from './views/orderConfirm.vue'
import orderSuccess from './views/orderSuccess.vue'

Vue.use(Router)

export default new Router({
  mode : 'history',
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/cartList',
      name: 'cartList',
      component: cartList
    },
    {
      path: '/address',
      name: 'address',
      component: Address
    },
    {
      path: '/orderConfirm',
      name: 'orderConfirm',
      component:orderConfirm
    },
    {
      path: '/orderSuccess',
      name: 'orderSuccess',
      component:orderSuccess
    },
    // {
    //   path: '/about',
    //   name: 'about',
    //   // route level code-splitting
    //   // this generates a separate chunk (about.[hash].js) for this route
    //   // which is lazy-loaded when the route is visited.
    //   component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
    // },

  ]
})
