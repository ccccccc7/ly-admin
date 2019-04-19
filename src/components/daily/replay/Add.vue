<template>
  <div>
    <el-form :model="form" :rules="rules" ref="form">
      <el-form-item prop="createDate" label="时间" :label-width="formLabelWidth">
        <el-date-picker type="date" v-model="form.createDate" value-format="yyyy-MM-dd"></el-date-picker>
      </el-form-item>

      <el-form-item prop="title" label="标题" :label-width="formLabelWidth">
        <el-input v-model="form.title" auto-complete="off"></el-input>
      </el-form-item>

      <el-form-item label="记录" :label-width="formLabelWidth">
        <el-input type="textarea" :rows="10" placeholder="请输入内容" v-model="form.content"></el-input>
      </el-form-item>
    </el-form>

    <div slot="footer">
      <el-button size="small">取 消</el-button>
      <el-button size="small" type="primary">确 定</el-button>
    </div>
  </div>
</template>

<script>
  export default {
    name: "AddReplay",
    data() {
      return {
        formLabelWidth: '120px',
        rules: {
          businessDate: [
            {required: true, message: '请选择日期', trigger: 'change'}
          ],
          title: [
            {required: true, message: '请填写标题', trigger: 'change'}
          ]
        },
        form: {
          title: (new Date()).getFullYear() + '年' + ((new Date()).getMonth() + 1) + '月' + (new Date()).getDate() + '日复盘',
          createDate: new Date(),
          content: ''
        }
      }
    }
  }
</script>
