<template>
  <div class="cartList">
    <Header/>
    <NavBread><span>购物车</span></NavBread>
    <div class="container">
      <div class="cart">
        <div class="page-title-normal">
          <h2 class="page-title-h2"><span>购物车</span></h2>
        </div>
        <div class="item-list-wrap">
          <div class="cart-item">
            <div class="cart-item-head">
              <ul>
                <li>商品信息</li>
                <li>单价(元)</li>
                <li>数量</li>
                <li>金额(元)</li>
                <li>操作</li>
              </ul>
            </div>
            <ul class="cart-item-list">
              <li v-for="(item , index) in cartList" :key="index">
                <div class="cart-tab-1">
                  <div class="cart-item-check">
                    <a class="checkbox-btn item-check-btn" :class="{'check': item.checked }"
                       @click="editCart('checked',item)">
                      <svg class="icon icon-ok">
                        <use xlink:href="#icon-ok"></use>
                      </svg>
                    </a>
                  </div>
                  <div class="cart-item-pic">
                    <img :src="require('../assets/img/'+item.productImage)" >
                  </div>
                  <div class="cart-item-title">
                    <div class="item-name">{{item.productName}}</div>
                  </div>
                </div>
                <div class="cart-tab-2">
                  <div class="item-price">{{item.salePrice}}</div>
                </div>
                <div class="cart-tab-3">
                  <div class="item-quantity">
                    <div class="select-self select-self-open">
                      <div class="select-self-area">
                        <button class="input-sub" @click="editCart('reduce',item)">-</button>
                        <!--<span class="select-ipt" ><span/>-->
                        <span class="select-ipt">{{item.productNum}}</span>
                        <button class="input-add" @click="editCart('add',item)">+</button>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="cart-tab-4">
                  <div class="item-price-total">{{item.salePrice*item.productNum}}</div>
                </div>
                <div class="cart-tab-5">
                  <div class="cart-item-opration">
                    <a href="javascript:;" class="item-edit-btn">
                      <svg class="icon icon-del">
                        <use xlink:href="#icon-del"></use>
                      </svg>
                    </a>
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </div>
        <div class="cart-foot-wrap">
          <div class="cart-foot-inner">
            <div class="cart-foot-l">
              <div class="item-all-check">

                <a class="checkbox-btn item-check-btn" :class="{'check' : checkAllFlag }" @click="toggleCheckAll">
                  <svg class="icon icon-ok"><use xlink:href="#icon-ok"/></svg>
                </a>
                <span>全选</span>

              </div>
            </div>
            <div class="cart-foot-r">
              <div class="item-total">
                总金额(不含运费): <span class="total-price">{{saleTotalPrice}}</span>
              </div>
              <div class="btn-wrap">
                <a class="btn btn--red totalMoney">结算</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="cart_footer">
      <Footer/>
    </div>
  </div>


</template>

<script>
  import Header from '@/components/Header.vue'
  import NavBread from '@/components/NavBread.vue'
  import Footer from '@/components/Footer.vue'
  export default {
    name: "cartList",
    data(){
      return {
        cartList: [],
        checked: '',
        allChecked: false,
      }
    },
    // 两个监听类{
    //   computed属性能缓存，但不适合大量数据缓存
    //   watch 也能监听，但不缓存，适合监听大量数据
    // }
    computed:{
      //被选中的数量
      checkCount(){
        var i = 0 ;
        this.cartList.forEach((item)=>{
          if(item.checked){
            i++
          }
        })
        return i;
      },
      //商品是否全选判断
      checkAllFlag(){
        return this.checkCount == this.cartList.length;
      },
      //计算商品的实时总价
      saleTotalPrice(){
        // 每次遍历商品之前将总价清零
        let totalMoney = 0;
        this.cartList.forEach((item,index) => {
          if(item.checked){
            totalMoney += item.salePrice * item.productNum
          }
        })
        return totalMoney;
      }


    },
    components: {
      Header,
      NavBread,
      Footer
    },
    created(){
      this.getCartList()

    },
    methods:{
      getCartList(){
        this.$http.post('/users/cartList').then((res)=>{
          // console.log(res)
          let results = res.data.result;
          this.cartList = results;

        })
      },
      editCart(flag,item){
        if(flag == 'reduce'){
          if(item.productNum <= 1){
            return;
          }
          item.productNum--;
        }else if(flag == 'add'){
          item.productNum++;
        }else{
          item.checked =  !item.checked
        }
        this.$http.post('/users/cartEdit',{
          productId: item.productId,
          productNum: item.productNum,
          checked:item.checked
        }).then((res)=>{
          let results = res.data.result;
        })
      },
      // checkedAll(){
      //   this.allChecked = !this.allChecked;
      //   this.cartList.forEach((item,index) => {
      //     item.checked = this.allChecked;
      //   })
      // },
      toggleCheckAll(){
        let flag = !this.checkAllFlag;
        this.cartList.forEach((item)=>{
          item.checked = flag ? true : false
        })
        this.$http.post('/users/editCheckedAll',{
          checkedAll: this.checkAllFlag
        }).then((res)=>{
          let results = res.data;

        })
      }
    }
  }
</script>

<style scoped>
  .cart_footer{
    margin-top: 250px;
  }
  .input-sub,
  .input-add {
    min-width: 40px;
    position:absolute;
    height: 100%;
    border: 0;
    color: #605F5F;
    text-align: center;
    font-size: 16px;
    overflow: hidden;
    display: inline-block;
    background: #f0f0f0;
  }
  .input-sub{
    left: -42px;
  }
  .input-add{
    left: 50px;
  }

  .item-quantity .select-self-area {
    background: none;
    border: 1px solid #f0f0f0;
    position: relative;
  }
  .item-quantity .select-self-area .select-ipt {
    display: inline-block;
    padding: 0 3px;
    width: 30px;
    min-width: 40px;
    text-align: center;
  }
  .cart-item-list .cart-tab-3{
    padding-top: 60px;
  }
  .totalMoney{
    height: 55px;
    font-size: 17px;
    line-height: 48px;
  }

</style>
