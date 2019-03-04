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
      <el-button plain type="primary" @click="formVisible=true">新增</el-button>
    </div>

    <el-dialog title="事件记录" :visible.sync="formVisible">
      <el-form :model="form">
        <el-form-item label="事件时间" :label-width="formLabelWidth">
          <el-date-picker v-model="form.time"></el-date-picker>
        </el-form-item>

        <el-form-item label="事件标题" :label-width="formLabelWidth">
          <el-input v-model="form.title" auto-complete="off"></el-input>
        </el-form-item>

        <el-form-item label="事件记录" :label-width="formLabelWidth">
          <el-input type="textarea" :rows="10" placeholder="请输入内容" v-model="form.content"></el-input>
        </el-form-item>
      </el-form>

      <div slot="footer" class="dialog-footer">
        <el-button @click="formVisible = false">取 消</el-button>
        <el-button type="primary" @click="formVisible = false">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  export default {
    data (){
      return {
        formLabelWidth: '120px',
        formVisible: false,
        tableData: [{
          date: '2016-10-12',
          name: 'xxx'
        },{
          date: '2016-11-12',
          name: '事件2'
        },{
          date: '2017-10-12',
          name: '事件3'
        }],
        form: {
          title: '',
          time: '',
          content: ''
        }
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
