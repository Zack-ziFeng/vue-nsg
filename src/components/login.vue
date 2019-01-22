<template>
  <div>
    <mt-header title="登录">
      <router-link to="/manger" slot="left">
        <mt-button icon="back"></mt-button>
      </router-link>
      <mt-button slot="right" @click="jumpReg()">注册</mt-button>
    </mt-header>

    <mt-field label="用户名" placeholder="请输入用户名" v-model="username"></mt-field>
    <mt-field label="密码" placeholder="请输入密码" type="password" v-model="password"></mt-field>

    <mt-button type="primary" size="large" @click="login()">登录</mt-button>

    <mt-popup v-model="popupVisible" position="top">用户名或密码错误</mt-popup>
  </div>
</template>
<script>
export default {
  data() {
    return {
      username: "",
      password: "",
      popupVisible: false
    };
  },
  methods: {
    jumpReg() {
      this.$router.replace({ path: "/regis" });
    },
    login() {
      if (document.cookie !== "") {
        let obj = JSON.parse(document.cookie.split("=")[1]);
        if (this.username === obj.name && this.password === obj.psw) {
          this.$router.replace({ path: "/manger", query: { name: obj.name } });
        } else {
          this.popupVisible = true;
        }
      } else {
        this.popupVisible = true;
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.mint-header {
  background-color: #ff5001;
}
.mint-button--primary {
  background-color: #ff5001;
  margin-top: 0.5rem;
}
.mint-popup-top {
  width: 100%;
  font-size: 0.45rem;
  text-align: center;
  padding: 0.15rem 0;
  background-color: #000;
  color: #fff;
}
</style>
