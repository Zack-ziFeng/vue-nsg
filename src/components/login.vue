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

    <mt-button type="primary" size="large">登录</mt-button>
  </div>
</template>
<script>
export default {
  data() {
    return {
      username: "",
      password: ""
    };
  },
  methods: {
      jumpReg() {
          this.$router.replace({path: '/regis'});
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
</style>
