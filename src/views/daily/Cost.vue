<template>
  <div>
    <div class="search-container">
      <div class="block">
        <el-date-picker v-model="weekParam" type="week" format="yyyy 第 WW 周" placeholder="选择周">
        </el-date-picker>
      </div>

      <div class="block">
        <el-date-picker v-model="mouthParam" type="month" placeholder="选择月">
        </el-date-picker>
      </div>

      <div class="block">
        <el-date-picker v-model="yearParam" type="year" placeholder="选择年"></el-date-picker>
      </div>
    </div>
    <el-table :data="tableData" stripe style="width: 100%">
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button type="text" size="small" @click="handleEdit(scope.$index,scope.row)">详情</el-button>
        </template>
      </el-table-column>
      <el-table-column prop="date" label="日期"/>
      <el-table-column prop="name" label="收入"/>
      <el-table-column prop="date" label="支出"/>
    </el-table>
    <div style="margin: 20px 0;">
      <el-button plain type="primary" @click="dialogFormVisible = true">新增</el-button>
    </div>

    <el-dialog title="新增收入支出" :visible.sync="dialogFormVisible" width="500px">
      <el-form :model="form">
        <el-form-item label="类型" v-model="form.type" :label-width="formLabelWidth">
          <el-select v-model="form.type" placeholder="请选择类型">
            <el-option v-for="item in typeOption" :key="item.value" :label="item.label" :value="item.value"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="日期" :label-width="formLabelWidth">
          <el-date-picker v-model="form.date" type="date" placeholder="选择日期">
          </el-date-picker>
        </el-form-item>

        <el-form-item label="金额" :label-width="formLabelWidth">
          <el-input v-model="form.amount" placeholder="请输入金额" ></el-input>
        </el-form-item>

      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        weekParam: '',
        mouthParam: '',
        yearParam: '',
        dialogFormVisible: false,
        typeOption: [{
          label: '收入',
          value: 1
        }, {
          label: '支出',
          value: 2
        }],
        tableData: [{
          date: '2016-10-12',
          name: 'xxx'
        }, {
          date: '2016-11-12',
          name: '事件2'
        }, {
          date: '2017-10-12',
          name: '事件3'
        }],
        form: {
          amount: 0,
          type: 1,
          date: ''
        },
        formLabelWidth: '120px',
        formInputWidth: '200px'
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
      addCost: function () {

      },
      handleEdit: function (index, row) {
        console.log(index)
        console.log(row)
      }
    }
  }
</script>

<style scoped>

</style>
