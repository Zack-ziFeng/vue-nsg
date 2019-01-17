<template>
  <div>
    <mt-field label="用户名" placeholder="请输入用户名" v-model="username"></mt-field>
    <mt-field label="密码" placeholder="请输入密码" type="password" v-model="password"></mt-field>

    <mt-button type="primary" size="large">登录</mt-button>
  </div>
</template>
<script>
export default {
    data () {
        return {
            username: "",
            password: ""
        }
    }
};
</script>

<style lang="scss" scoped>
.mint-button--primary {
    background-color: #ff5001;
    margin-top: 0.5rem;
}
</style>
