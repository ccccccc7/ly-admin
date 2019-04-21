<template>
  <div class="createPost-container">
    <el-form :model="form" :rules="rules" ref="form" label-width="80px">
      <el-form-item prop="createDate" label="时间">
        <el-date-picker type="date" v-model="form.createDate" value-format="yyyy-MM-dd"></el-date-picker>
      </el-form-item>

      <el-form-item prop="title" label="标题">
        <el-input v-model="form.title" auto-complete="off"></el-input>
      </el-form-item>

      <el-form-item label="记录">
        <tinymce ref="editor" placeholder="请输入内容" v-model="form.content"></tinymce>
      </el-form-item>

      <el-form-item>
        <el-button size="small" type="primary">确 定</el-button>
        <el-button size="small" @click="cancel()">取 消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
  import Tinymce from '@/components/Tinymce'

  export default {
    name: "AddReplay",
    components: {Tinymce},
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
    }, methods: {
      cancel: function () {
        this.$router.push('/replay')
      }
    }
  }
</script>
