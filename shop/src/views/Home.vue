<template>
  <div class="home">
    <!--导航模块-->
    <Header/>
    <!--面包屑模块-->
    <NavBread><span>商品111</span></NavBread>

    <div class="accessory-result-page accessory-page">
      <div class="container">
        <!--筛选导航栏模块-->
        <div class="filter-nav">
          <span class="sortby">筛选:</span>
          <a href="javascript:void(0)" class="default cur" >Default</a>
          <a href="javascript:void(0)" class="price" @click="sortGoods()">价格高低<svg class="icon icon-arrow-short"><use xlink:href="#icon-arrow-short"></use></svg></a>
          <a href="javascript:void(0)" class="filterby stopPop">Filter by</a>
        </div>
        <div class="accessory-result">
          <!-- 左侧筛选模块 -->
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

          <!-- 商品列表模块 -->
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
                        <a href="javascript:;" class="btn btn--m" @click="addCart(item.productId)">加入购物车</a>
                      </div>
                    </div>
                  </div>
                </li>
                <!--懒加载模块-->
                <div v-infinite-scroll="loadMore" infinite-scroll-disabled="busy" infinite-scroll-distance="10">
                  ...
                </div>
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
  // import axios from 'axios'
  export default {
    name: 'home',
    data() {
      return {
        lists : '',
        sortFlag : true,
        priceChecked : 'All',
        page : 1,
        pageSize : 8,
        busy : true,
        flag : false,
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
      this.page = 1;
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
      getGoods(flag) {
        let sort = this.sortFlag ? 1 : -1;
        let params = {
          sort : sort,
          priceLevel:this.priceChecked,
          page : this.page,
          pageSize : this.pageSize
        };
        this.axios.get('/goods/list',{params : params})
          .then(res=>{
            let results = res.data;
            // 判断是否是第一次请求
            if(flag){
              //分页数据累积在一起
              this.lists = this.lists.concat(results.result);
              if(results.result.length == 0){
                this.busy = true;
              }else{
                this.busy = false;
              }

            }else{
              this.lists = results.result;
              this.busy = false;
            }

          })
      },
      sortGoods() {
        this.sortFlag = !this.sortFlag;
        this.page = 1;
        this.getGoods();

      },
      setPriceFilter(index){
        this.priceChecked = index;
        this.page = 1;
        this.getGoods();

      },
      loadMore: function() {
        this.busy = true;
        setTimeout(() => {
          this.page++;
          this.getGoods(true);
        }, 1000)
      },
      addCart(productId){
        this.axios.post("/goods/addCart",{
          productId : productId
        }).then(res => {
          // console.log(res);
          let result = res.data;

          if(result.status == 1){
            alert('加入购物车失败')
          }else{
            alert('加入购物车成功')
          }
        })
      }
    }
  }
</script>

