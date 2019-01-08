<template>
  <div id="app">
    <headerLy></headerLy>
    <router-view></router-view>
    <footerLy></footerLy>
  </div>
</template>

<script>
import footerLy from '@/components/footer.vue'
import headerLy from '@/components/header.vue'

export default {
  name: 'App',
  components: {
    headerLy,
    footerLy
  }
}
</script>

<style>
<<<<<<< HEAD
html, body, ul, li, ol, dl, dd, dt, p, h1, h2, h3, h4, h5, h6, form, fieldset, legend, img,input{ margin:0; padding:0; }
fieldset, img,input,button { border:0 none; padding:0;margin:0;outline-style:none; }   /*去掉input等聚焦时的蓝色边框*/
ul,li,ol{ list-style:none; }
select, input { vertical-align:middle;}
/*select, input, textarea { font-size:12px; margin:0; }*/
textarea { resize:none; } /*防止拖动*/
img {border:0; vertical-align:middle; }
/*  去掉图片低测默认的3像素空白缝隙，或者用display：block也可以*/
table { border-collapse:collapse; }
a {text-decoration:none; }
html,body{ height: 100%; }
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  /* text-align: center;
  color: #2c3e50; */
  margin-top: 0.82rem;
}
=======

>>>>>>> bc4271d5428858ad15dc5ca17642b937678fbc21
</style>
