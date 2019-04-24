<template>
  <div class="detail-container" v-html="form.content">
  </div>
</template>

<script>
  export default {
    name: "ReplayDetail",
    created() {
      const id = this.$route.params && this.$route.params.id;
      this.fetchData(id);
    },
    data() {
      return {
        form: {
          title: '',
          createDate: '',
          content: ''
        }
      }
    },
    methods: {
      fetchData(id) {
        let that = this;
        this.$fetch('/api/replay/' + id).then(response => {
          that.form = response.result
        }).catch(err => {
          that.$alert(err, '获取复盘详情失败', {type: 'error'})
        })
      }
    }
  }
</script>

<style scoped>

</style>
