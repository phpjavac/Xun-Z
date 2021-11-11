<template lang="pug">
el-container.index
  el-header.flex.justify-between.align-items-center.box-shadow
    div.msg 今天，又是充满希望的一天
    .enum.flex
      .info.your name
      .pointer(@click='reset()') 退出
  el-aside.left
    el-menu(:default-active='activeIndex',router)
      el-menu-item(index="index")
        i(class="el-icon-menu")
        span(slot="title")  首页
      el-submenu(index="2")
        template(slot="title")
          i(class="el-icon-edit")
          span  文章管理
        el-menu-item(index='/article/create') 新建文章
        el-menu-item(index='/article/list') 文章列表
        el-menu-item(index='/tag') 标签
        el-menu-item(index='2-3') 评论
      el-submenu(index="3")
        template(slot="title")
          i(class="el-icon-box")
          span  小工具
        el-menu-item(index="/tool/wh")  工时管理
      el-menu-item(index="4")
        i(class="el-icon-s-tools")
        span(slot="title")  系统管理
  el-main.main
      router-view
</template>
<script>
export default {
  data() {
    return {
      activeIndex: "index"
    };
  },
  methods: {
    reset() {
      localStorage.clear();
      this.$router.push("/");
    }
  },
  created() {}
};
</script>
<style lang="stylus" scoped>
.index
  text-align: left;
  padding-left 300px
  .left
    position fixed
    left 0
    height 100vh
    >>> .el-menu
      height 100%
  .main
    text-align left
    // width 1366px
    display inline-block
</style>
