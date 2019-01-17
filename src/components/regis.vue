<template>
  <div>
    <mt-field label="用户名" placeholder="请输入用户名" v-model="username" state=""></mt-field>
    <mt-field label="邮箱" placeholder="请输入邮箱" type="email" v-model="email" state=""></mt-field>
    <mt-field label="密码" placeholder="请输入密码" type="password" v-model="password" state=""></mt-field>
    <mt-field label="重复密码" placeholder="再一次输入密码" type="password" v-model="password2" state=""></mt-field>
    <mt-field label="手机号" placeholder="请输入手机号" type="tel" v-model="phone" state=""></mt-field>
    <mt-button plain type="primary" size="large">注册</mt-button>
  </div>
</template>
<script>
export default {
  data() {
    return {
      username: "",
      email: "",
      password: "",
      password2: "",
      phone: "",
      checkTrue:[false, false, false, false, false]
    };
  },
  methods: {
      checkU(){},
      checkE(){},
      checkP(){},
      checkP2(){},
      checkPH(){}
  }
};
</script>

<style lang="scss" scoped>
.mint-button--primary.is-plain {
  border: 1px solid #ff5001;
  background-color: transparent;
  color: #ff5001;
  margin-top: 0.5rem;
}
</style>
