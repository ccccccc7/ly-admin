<template>
  <div>
    <el-table :data="tableData" stripe style="width: 100%">
      <el-table-column label="操作" width="100px">
        <template slot-scope="scope">
          <el-button type="text" size="small" @click="handleEdit(scope.$index,scope.row)">编辑</el-button>
          <el-button type="text" size="small" @click="sucInfo">删除</el-button>
        </template>
      </el-table-column>
      <el-table-column prop="date" label="日期"/>
      <el-table-column prop="name" label="姓名"/>
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
          date: '2016-9-12',
          name: 'xxx'
        }]
      }
    },
    methods: {
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
