<template>
    <div class="NavBread">
        <div class="nav-breadcrumb-wrap">
            <div class="container">
                <nav class="nav-breadcrumb">
                  <a href="/">首页</a>
                  <!--<span>Goods</span>-->
                  <slot></slot>
                </nav>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "NavBread"
    }
</script>

<style scoped>
  .nav-breadcrumb {
    width: 200px;
  }

</style>
