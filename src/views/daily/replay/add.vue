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
        <el-button size="small" @click="save()" type="primary">确 定</el-button>
        <el-button size="small" @click="cancel()">取 消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
  import Tinymce from '@/components/Tinymce'

  const defaultForm = {
    title: (new Date()).getFullYear() + '年' + ((new Date()).getMonth() + 1) + '月' + (new Date()).getDate() + '日复盘',
    createDate: new Date(),
    content: ''
  }
  export default {
    name: "AddReplay",
    created() {
      if (this.isEdit) {
        const id = this.$route.params && this.$route.params.id;
        this.fetchData();
      } else {
        this.form = Object.assign({}, defaultForm)
      }
    },
    components: {Tinymce},
    props: {
      isEdit: {
        type: Boolean,
        default: false
      },
      daily: {
        type: Object,
        defalut: {}
      }
    },
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
        form: {}
      }
    },
    methods: {
      fetchData(id) {
        this.$fetch().then(response => {
          this.form = response.data
        }).catch(err => {
          console.log(err)
        })
      },
      save: function () {
        const that = this;
        this.$refs.form.validate(valid => {
          if (valid) {
            let formJson = this.form;
            if (!this.isEdit) {
              this.$post("/api/replay", formJson)
                .then(response => {
                  that.$message({
                    message: response.message,
                    type: "success"
                  });
                  that.$router.push('/replay')
                })
                .catch(err => that.$alert(err, "添加复盘", {type: "error"}))
            } else {
              this.$http.put("/api/replay", formJson)
                .then(() => {
                  that.$message({
                    message: "修改成功",
                    type: "success"
                  });
                  that.$router.push('/replay')
                })
                .catch(err => {
                  that.$alert(err, "修改复盘", {type: "error"});
                })
            }
          } else {
            return false;
          }
        })
      },
      cancel: function () {
        this.$router.push('/replay')
      }
    }
  }
</script>
