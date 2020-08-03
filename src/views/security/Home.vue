<template>
    <div>
      <Card :items = "securityList" :title = "currentTime"/>
    </div>
</template>

<script>
    import Card from '@/components/Share/Card'
    import ajax from '../../util/ajax'

    export default {
        components: {ajax, Card},
        data() {
            return {
                timer: "",
                currentTime: new Date(),
                securityList: [
                  '北上数据'
                ]
            }
        },
        created() {
          let _this = this; //声明一个变量指向Vue实例this，保证作用域一致
          this.timer = setInterval(function() {
            let m = new Date().getMinutes();
            let s = new Date().getSeconds();
            _this.currentTime = new Date().getFullYear() +
              "-" +
              (new Date().getMonth() + 1) +
              "-" +
              new Date().getDate() +
              " " +
              new Date().getHours() +
              ":" +
              (m < 10 ? "0" + m : m) +
              ":" +
              (s < 10 ? "0" + s : s)
              ;
          }, 1000);
        },
        beforeDestroy() {
          if (this.timer) {
            clearInterval(this.timer); // 在Vue实例销毁前，清除我们的定时器
          }
        },
        methods : {
        },
    }
</script>

<style scoped>

</style>
