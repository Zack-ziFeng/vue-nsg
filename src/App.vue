<template>
  <div id="app">
    <router-view></router-view>
    <footerLy></footerLy>
  </div>
</template>

<script>
import footerLy from '@/components/footer.vue'
import { Indicator } from 'mint-ui'
import axios from 'axios'
console.log(axios)
// 添加请求拦截器
axios.interceptors.request.use(config => {
  // 在发送请求之前做某事，比如说 设置loading动画显示
  Indicator.open()
  return config
}, error => {
  // 请求错误时做些事
  Indicator.close()
  return Promise.reject(error)
})

// 添加响应拦截器
axios.interceptors.response.use(response => {
  // 对响应数据做些事，比如说把loading动画关掉
  Indicator.close()
  return response
}, error => {
  // 请求错误时做些事
  Indicator.close()
  return Promise.reject(error)
})
export default {
  name: 'App',
  components: {
    footerLy
  }
}
</script>

<style>
html,
body,
ul,
li,
ol,
dl,
dd,
dt,
p,
h1,
h2,
h3,
h4,
h5,
h6,
form,
fieldset,
legend,
img,
input {
  margin: 0;
  padding: 0;
}
fieldset,
img,
input,
button {
  border: 0 none;
  padding: 0;
  margin: 0;
  outline-style: none;
} /*去掉input等聚焦时的蓝色边框*/
ul,
li,
ol {
  list-style: none;
}
select,
input {
  vertical-align: middle;
}
/*select, input, textarea { font-size:12px; margin:0; }*/
textarea {
  resize: none;
} /*防止拖动*/
img {
  border: 0;
  vertical-align: middle;
}
/*  去掉图片低测默认的3像素空白缝隙，或者用display：block也可以*/
table {
  border-collapse: collapse;
}
a {
  text-decoration: none;
  -webkit-tap-highlight-color: rgba(255, 255, 255, 0);
  -webkit-user-select: none;
  -moz-user-focus: none;
  -moz-user-select: none;
}
/* html,body{ height: 100%; } */
body {
  background: #f5f5f5;
}
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  /* text-align: center;
  color: #2c3e50; */
}
</style>
