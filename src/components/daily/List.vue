<template>
  <div>
    <el-table :data="tableData" stripe style="width: 100%">
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button type="text" size="small" @click="handleEdit(scope.$index,scope.row)">详情</el-button>
          <el-button type="text" size="small" @click="handleEdit(scope.$index,scope.row)">编辑</el-button>
          <el-button type="text" size="small" @click="sucInfo">删除</el-button>
        </template>
      </el-table-column>
      <el-table-column prop="name" label="事件名称"/>
      <el-table-column prop="date" label="事件日期"/>
      <el-table-column prop="date" label="记录日期"/>
    </el-table>
    <div style="margin: 20px 0;">
      <el-button plain type="primary" @click="addUser">新增</el-button>
    </div>
  </div>
</template>

<script>
  export default {
    data (){
      return {
        tableData: [{
          date: '2016-10-12',
          name: 'xxx'
        },{
          date: '2016-11-12',
          name: '事件2'
        },{
          date: '2017-10-12',
          name: '事件3'
        }]
      }
    },
    methods: {
      sucInfo: function () {
        ajax.get('/api/home', function (result) {
          console.log(result)
        }, function () {
        })
      },
      errInfo: function () {
        ajax.post('/api/error', {}, function (result) {
          console.log(result)
        }, function () {
        })
      },
      addUser: function () {

      },
      handleEdit: function(index,row) {
        console.log(index)
        console.log(row)
      }
    }
  }
</script>

<style scoped>

</style>
