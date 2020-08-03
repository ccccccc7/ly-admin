<template>
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>{{title}}</span>
        <el-button style="float: right; padding: 3px 0" type="text">操作</el-button>
      </div>
      <div v-for="c in items" :key = "c" class = "text item">
        {{c}}
      </div>
    </el-card>
</template>

<script>
    export default {
        props: {
          items: {
            type: Array,
            default: function () {
              return [];
            }
          },
          title: {
            type: String,
            default: '今日数据'
          }
        }
    }
</script>

<style scoped>
  .text {
    font-size: 14px;
  }

  .item {
    margin-bottom: 18px;
  }

  .clearfix:before,
  .clearfix:after {
    display: table;
    content: '';
  }

  .clearfix:after {
    clear: both;
  }

  .box-card {
    width: 480px;
  }
</style>
