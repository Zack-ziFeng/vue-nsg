<template>
  <div>
    <mt-header title="注册">
      <router-link to="/manger" slot="left">
        <mt-button icon="back"></mt-button>
      </router-link>
      <mt-button slot="right" @click="jumpLogin()">登录</mt-button>
    </mt-header>

    <mt-field
      label="用户名"
      placeholder="英文数字组成,英文开头"
      v-model="username"
      state
      @blur.native.capture="checkU()"
    ></mt-field>
    <mt-field
      label="邮箱"
      placeholder="请输入邮箱"
      type="email"
      v-model="email"
      state
      @blur.native.capture="checkE()"
    ></mt-field>
    <mt-field
      label="密码"
      placeholder="英文与数字组成,8位到20位"
      type="password"
      v-model="password"
      state
      @blur.native.capture="checkP()"
    ></mt-field>
    <mt-field
      label="重复密码"
      placeholder="再一次输入密码"
      type="password"
      v-model="password2"
      state
      @blur.native.capture="checkP2()"
    ></mt-field>
    <mt-field
      label="手机号"
      placeholder="请输入手机号"
      type="tel"
      v-model="phone"
      state
      @blur.native.capture="checkPH()"
    ></mt-field>
    <mt-button plain type="primary" size="large" @click="reg()">注册</mt-button>

    <mt-popup v-model="popupVisible" position="top">注册信息错误</mt-popup>
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
      checkTrue: [false, false, false, false, false],
      popupVisible: false
    };
  },
  methods: {
    checkU() {
      if (/^[a-zA-Z][a-zA-Z0-9]{5,15}$/.test(this.username)) {
        this.checkTrue.splice(0, 1, true);
      } else {
        this.checkTrue.splice(0, 1, false);
      }
    },
    checkE() {
      if (/^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/.test(this.email)) {
        this.checkTrue.splice(1, 1, true);
      } else {
        this.checkTrue.splice(1, 1, false);
      }
    },
    checkP() {
      if (/^(?=.*\d)(?=.*[a-zA-Z]).{8,20}$/.test(this.password)) {
        this.checkTrue.splice(2, 1, true);
      } else {
        this.checkTrue.splice(2, 1, false);
      }
    },
    checkP2() {
      if (this.password === this.password2) {
        this.checkTrue.splice(3, 1, true);
      } else {
        this.checkTrue.splice(3, 1, false);
      }
    },
    checkPH() {
      if (/^1[34578]\d{9}$/.test(this.phone)) {
        this.checkTrue.splice(4, 1, true);
      } else {
        this.checkTrue.splice(4, 1, false);
      }
    },
    jumpLogin() {
      this.$router.replace({ path: "/login" });
    },
    reg() {
      function check(item) {
        return item;
      }
      if (this.checkTrue.every(check)) {
        let obj = {
          name: this.username,
          psw: this.password
        };
        document.cookie = `user=${JSON.stringify(obj)}`;
        this.$router.replace({ path: "/login" });
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
.mint-button--primary.is-plain {
  border: 1px solid #ff5001;
  background-color: transparent;
  color: #ff5001;
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
