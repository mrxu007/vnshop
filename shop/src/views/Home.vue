<template>
  <div class="home">
      <Header/>
      <NavBread><span>商品111</span></NavBread>

      <div class="accessory-result-page accessory-page">
        <div class="container">
          <div class="filter-nav">
            <span class="sortby">筛选:</span>
            <a href="javascript:void(0)" class="default cur" >Default</a>
            <a href="javascript:void(0)" class="price" @click="sortGoods()">价格高低<svg class="icon icon-arrow-short"><use xlink:href="#icon-arrow-short"></use></svg></a>
            <a href="javascript:void(0)" class="filterby stopPop">Filter by</a>
          </div>
          <div class="accessory-result">
            <!-- filter -->
            <div class="filter stopPop" id="filter">
              <dl class="filter-price">
                <dt>价格:</dt>
                <dd><a href="javascript:void(0)" :class="{'cur':priceChecked == 'All'}" @click="setPriceFilter('All')">All</a></dd>
                <dd v-for="(item , index) in priceFilter" :key="index">
                  <a href="javascript:void(0)" @click="setPriceFilter(index)" :class="{'cur':priceChecked == index}">
                      {{item.startPrice}}-{{item.endPrice}}
                  </a>
                </dd>
              </dl>
            </div>

            <!-- search result accessories list -->
            <div class="accessory-list-wrap">
                <div class="accessory-list col-4">
                    <ul>
                      <li v-for="( item , index ) in lists" :key="index">
                        <div v-if="item.productImage">
                          <div class="pic">
                            <a href="#" ><img v-lazy="require('../assets/img/'+item.productImage)"></a>
                          </div>
                          <div class="main">
                            <div class="name">{{item.productName}}</div>
                            <div class="price">{{item.salePrice}}</div>
                            <div class="btn-area">
                              <a href="javascript:;" class="btn btn--m">加入购物车</a>
                            </div>
                          </div>
                        </div>
                      </li>
                    </ul>
                </div>
            </div>
          </div>
        </div>
      </div>
    <Footer/>
  </div>

</template>

<script>
// @ is an alias to /src
// import HelloWorld from '@/components/HelloWorld.vue'
import Header from '@/components/Header.vue'
import NavBread from '@/components/NavBread.vue'
import Footer from '@/components/Footer.vue'
import axios from 'axios'
export default {
  name: 'home',
  data() {
      return {
          lists : '',
          sortFlag : true,
          priceChecked : 'All',
          priceFilter: [
            {
              startPrice : 0,
              endPrice : 100
            },
            {
              startPrice : 100,
              endPrice : 500
            },
            {
              startPrice : 500,
              endPrice : 1000
            },
            {
              startPrice : 1000,
              endPrice : 5000
            }
          ]
      }
  },
  components: {
    // HelloWorld,
    Header,
    NavBread,
    Footer
  },
  created(){
    this.getGoods();
    // this.getGoodsList();
  },
  methods: {
     // getGoodsList() {
     //    axios.get('https://www.easy-mock.com/mock/5d6b99ebdcdabb3a15a5598a/example/goodlist')
     //      .then(res=>{
     //          this.lists = res.data
     //      })
     // },
     getGoods() {
       let sort = this.sortFlag ? 1 : -1;
        axios.get('/goods/list',{params: {sort : sort,priceLevel:this.priceChecked}})
          .then(res=>{
            this.lists = res.data.result
          })
     },
    sortGoods() {
       this.sortFlag = !this.sortFlag;
       this.getGoods();
    },
    setPriceFilter(index){
       this.priceChecked = index;
        this.getGoods();
    }
  }
}
</script>

