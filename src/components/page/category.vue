<template>
  <div></div>
</template>
<script>
export default {
  data () {
    return {
      data: null
    }
  },
  mounted () {
    this.axios.get('https://www.nanshig.com/mobile/index.php', {
      params: {
        act: 'goods_class'
      }
    }).then(res => {
      this.data = res
      console.log(this.data)
    }).catch(err => {
      console.log(err)
    })
  }
}
</script>
