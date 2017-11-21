<template>
  <div>
    <el-table :data="tableData" stripe style="width: 100%">
      <el-table-column prop="date" label="日期"/>
      <el-table-column prop="name" label="姓名"/>
    </el-table>
    <el-button plain @click="getUser">新增</el-button>
  </div>
</template>

<script>
  import ajax from '../../util/ajax'
  export default {
    components: ajax,
    data (){
      return {
        tableData: [{
          date: '2016-9-12',
          name: 'xxx'
        }]
      }
    },
    methods: {
      getUser: function () {
        ajax.get('/home', function (result) {
          console.log(result)
        },function(){})
      }
    }
  }
</script>
<style scoped>
</style>
