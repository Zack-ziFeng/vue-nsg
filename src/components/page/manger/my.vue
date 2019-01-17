<template>
  <div>
    <mt-header title="我的">
      <mt-button slot="right" v-text="text" @click="change()"></mt-button>
    </mt-header>

    <mt-tab-container v-model="active">
      <mt-tab-container-item id="0">
        <my-login></my-login>
      </mt-tab-container-item>
      <mt-tab-container-item id="1">
        <my-reg></my-reg>
      </mt-tab-container-item>
    </mt-tab-container>
  </div>
</template>
<script>
import MyLogin from "@/components/login.vue";
import MyReg from "@/components/regis.vue";

export default {
  data() {
    return {
      active: "0",
      aCheck: false,
      text: "注册"
    };
  },
  components: {
    MyLogin,
    MyReg
  },
  methods: {
    change() {
      this.aCheck = !this.aCheck;
    }
  },
  watch: {
    aCheck(val) {
      if (val) {
        (this.active = "1"), (this.text = "登录");
      } else {
        (this.active = "0"), (this.text = "注册");
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
  margin: 0.8rem 0;
}
</style>
