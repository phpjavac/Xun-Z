<template lang="pug">
div.login
    div.box
        h1.title 登录
        input(v-model='code').input
        input(v-model='password',type='password').input
        button(@click='login').login-button 登录
</template>
<script>
export default {
  data() {
    return {
      code: "",
      password: ""
    };
  },
  methods: {
    login() {
      this.$http
        .login({ code: this.code, password: this.password })
        .then(res => {
          if (res.data.code === 0) {
            localStorage.token = res.data.token;
            localStorage.code = this.code
            this.$router.push("/index");
          }
        })
        .catch(error=>{
          this.$message.error(error.errorText);
        })
    }
  },
  created() {}
};
</script>
<style lang="stylus" scoped>
.login
  height 100vh
  width 100vw
  display flex
  align-items center
  justify-content center
  background url('../assets/login.png')
  .box
    width 380px
    height 428px
    background rgba(255, 255, 255, 1)
    border-radius 8px
    .title
      font-size 20px
      font-family MicrosoftYaHeiUI
      color rgba(42, 46, 54, 1)
    .input
      margin 12px
      width 320px
      height 40px
      background rgba(255, 255, 255, 1)
      border-radius 4px
      border 1px solid rgba(204, 204, 204, 1)
      font-size 14px
      font-family MicrosoftYaHeiUI
      width 304px
      height 24px
      padding 8px
    .login-button
      width 320px
      height 40px
      background rgba(74, 144, 226, 1)
      box-shadow 0px 2px 4px 0px rgba(74, 144, 226, 1)
      border-radius 4px
      border none
      outline none
      font-size 16px
      font-family MicrosoftYaHeiUI
      color rgba(255, 255, 255, 1)
      cursor pointer
</style>
