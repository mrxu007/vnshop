<template>
  <div class="orderSuccess">
    <Header/>
    <NavBread><span>订单支付成功</span></NavBread>
    <div class="container">
      <div class="page-title-normal">
        <h2 class="page-title-h2"><span>check out</span></h2>
      </div>
      <!-- 进度条 -->
      <div class="check-step">
        <ul>
          <li class="cur"><span>确认</span> 地址</li>
          <li class="cur"><span>查看</span> 订单</li>
          <li  class="cur"><span>确认</span>支付</li>
          <li  class="cur"><span>订单</span> 详情</li>
        </ul>
      </div>

      <div class="order-create">
        <div class="order-create-pic"><img src="../assets/img/ok-2.png" alt=""></div>
        <div class="order-create-main">
          <h3>小姐姐/小哥哥 <br>您的订单已经交易完成哦</h3>
          <p>
            <span>订单 ID：{{orderId}}</span>
            <span>订单金额 ：{{orderTotal}}</span>
          </p>
          <div class="order-create-btn-wrap">
            <div class="btn-l-wrap">

              <router-link class="btn btn--m " :to="{ path : '/'}">商品首页</router-link>
            </div>
            <div class="btn-r-wrap">
              <router-link class="btn btn--m " :to="{ path : '/cartList'}">购物车</router-link>
            </div>
          </div>
        </div>
      </div>
    </div>
    <Footer/>
  </div>
</template>

<script>
  import Header from '@/components/Header.vue'
  import NavBread from '@/components/NavBread.vue'
  import Footer from '@/components/Footer.vue'
    export default {
      name: "orderSuccess",
      components: {
        Header,
        NavBread,
        Footer
      },
      data() {
        return {
          orderId: '',
          orderTotal : 0

        }
      },
      created(){
        this.init()
      },
      methods: {
        init(){
          var orderId = this.$route.query.orderId ;
          if(!orderId){
            return
          }
          this.$http.get('/users/orderDetail',{
            params : {
              orderId : orderId
            }
          }).then((res)=>{
            let results = res.data
            if(results.status == 0){
              this.orderId = results.result.orderId
              this.orderTotal = results.result.orderTotal
            }
          })
        }


      }
    }
</script>

<style scoped>

</style>
