<template>
  <div class="Header">
    <div class="site-header" style="clear:both;">
      <div class="container">
        <div class="header-logo">
          <a href="#" title="仿小米官网"
            ><img src="../assets/img/vn-logo.png"
          /></a>
        </div>
        <div class="header-nav">
          <ul class="nav-list">
            <li class="nav-category">
              <a class="btn-category-list" href="#" style="display:none;"
                >全部商品分类</a
              >
            </li>
            <li class="nav-item">
              <a class="link" href="category.php?id=76"
                ><span class="titleTip">本网站为自学学习小项目并无经营性质</span></a
              >
              <div class="item-children">
                <div class="container">
                  <ul class="children-list clearfix">
                    <li class="first">
                      <div class="figure figure-thumb">
                        <a href="#"><img src="" alt="小米电视2 40英寸"/></a>
                      </div>
                      <div class="title"><a href="#">小米电视2 40英寸</a></div>
                      <p class="price">2200<em>元</em>元</p>
                    </li>
                  </ul>
                </div>
              </div>
            </li>
          </ul>
        </div>
        <!-- <div class="container-user"> -->
        <div class="topbar-cart" id="ECS_CARTINFO">
          <a class="cart-mini " href="#">
            <i class="iconfont">&#xe60c;</i>
            <router-link to="/cartList">购物车</router-link>
            <span class="mini-cart-num J_cartNum" id="hd_cartnum"></span>
          </a>
        </div>
        <div class="topbar-info J_userInfo" id="ECS_MEMBERZONE">
          <div v-if="nickName">
            <el-link v-text="nickName" class="link"></el-link>
            <span class="sep">|</span>
            <el-link class="link" v-if="nickName" @click="loginOut()"
              >退出</el-link
            >
          </div>

          <div>
            <el-link
              icon="el-icon-user-solid"
              class="link"
              type="button"
              @click="formAll.dialogFormVisible = true"
              v-if="!nickName"
              >登录</el-link
            >
            <span class="sep" v-if="!nickName">|</span>
            <el-link
              icon="el-icon-unlock"
              class="link"
              type="button"
              v-if="!nickName"
              >注册</el-link
            >
          </div>
        </div>
        <!-- </div> -->
      </div>
      <div id="J_navMenu" class="header-nav-menu" style="display: none;">
        <div class="container"></div>
      </div>
    </div>
    <!--登录框模块-->
    <el-dialog
      title="登录"
      :visible.sync="formAll.dialogFormVisible"
      v-if="formAll.dialogFormVisible"
    >
      <el-form :model="formAll.form" id="login_form">
        <el-form-item label="用户名" :label-width="formAll.formLabelWidth">
          <el-input v-model="formAll.form.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="密码" :label-width="formAll.formLabelWidth">
          <el-input
            v-model="formAll.form.password"
            autocomplete="off"
          ></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="formAll.dlogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="checkData">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "Header",
  data() {
    return {
      nickName: false,
      formAll: {
        dialogTableVisible: false,
        dialogFormVisible: false,
        form: {
          name: "",
          password: "",
          delivery: false
        },
        formLabelWidth: "120px"
      }
    };
  },
  mounted() {
    this.checkLogin();
  },
  methods: {
    checkData() {
      // console.log(this.formAll.form.name,this.formAll.form.password)
      axios
        .post("/users/login", {
          userName: this.formAll.form.name,
          userPwd: this.formAll.form.password
        })
        .then(res => {
          let results = res.data;
          if (results.status == 0) {
            this.nickName = results.result.userName;
            this.formAll.dialogFormVisible = false;
            if (this.formAll.dialogFormVisible == false) {
              this.$notify({
                title: "成功",
                message: `用户${this.nickName}登录成功`,
                type: "success",
                duration: 3000
              });
              this.$router.push("/cartList");
            }
          }
        });
    },
    checkLogin() {
      axios.post("/users/checkLogin").then(res => {
        this.nickName = res.data.result;
        // console.log(res.data.result);
      });
    },
    loginOut() {
      axios.post("/users/loginOut").then(res => {
        this.nickName = false;
        this.$router.push("/");
        this.$notify({
          title: "成功",
          message: `用户已退出`,
          type: "success",
          duration: 3000
        });
        // console.log(res.data.result);
      });
    }
  }
};
</script>

<style scoped>
#login_form {
  width: 400px;
}
.titletip {
  font-size:  35px
}
</style>
