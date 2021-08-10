<template>
  <div class="createPost-container">
    <el-form :model="form" :rules="rules" ref="form" label-width="80px">
      <el-form-item prop="createDate" label="时间">
        <el-date-picker type="date" v-model="form.createDate" value-format="yyyy-MM-dd"></el-date-picker>
      </el-form-item>

      <el-form-item prop="timeCount" label="做题时间">
        <el-input-number v-model="form.timeCount" :min="1" :max="60" label="做题时间"></el-input-number>
      </el-form-item>

      <el-form-item prop="count" label="错题数量">
        <el-input-number v-model="form.count" :min="0" :max="60" label="错题数量"></el-input-number>
      </el-form-item>

      <el-form-item label="错题类型" prop="typeId">
        <el-select v-model="form.typeId" filterable @change="onSelectType" placeholder="请选择">
          <el-option
            v-for="item in typeOptions"
            :key="item.id"
            :label="item.name"
            :value="item.id">
          </el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="错题详情" prop="detailId">
        <el-select v-model="form.detailId" filterable placeholder="请选择">
          <el-option
            v-for="item in detailOptions"
            :key="item.id"
            :label="item.name"
            :value="item.id">
          </el-option>
        </el-select>
        <el-button size="small" @click="addDetail()" type="primary">新增</el-button>
      </el-form-item>

      <el-form-item>
        <el-button size="small" @click="save()" type="primary">确 定</el-button>
        <el-button size="small" @click="cancel()">取 消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>

  const defaultForm = {
    title: (new Date()).getFullYear() + '年' + ((new Date()).getMonth() + 1) + '月' + (new Date()).getDate() + '日复盘',
    createDate: new Date(),
    content: '',
    keyword: ''
  }
  export default {
    name: "MistakeComponent",
    props: {
      isEdit: {
        type: Boolean,
        default: false
      }
    },
    created() {
      this.fetchType();
      if (this.isEdit) {
        const id = this.$route.params && this.$route.params.id;
        this.fetchData(id);
      } else {
        this.form = Object.assign({}, defaultForm)
      }
    },
    data() {
      return {
        formLabelWidth: '120px',
        rules: {
          createDate: [
            {required: true, message: '请选择日期', trigger: 'change'}
          ],
          timeCount: [
            {required: true, message: '请填写做题时间', trigger: 'change', type: 'number'}
          ],
          count: [
            {required: true, message: '请填写错题数量', trigger: 'change', type: 'number'}
          ],
          typeId: [
            {required: true, message: '请填写错题类型', trigger: 'change', type: 'number'}
          ]
        },
        typeOptions: [],
        detailOptions: [],
        form: {}
      }
    },
    methods: {
      fetchType: function () {
        let that = this;
        this.$post('/api/exam/type').then(response => {
          that.typeOptions = response.result
        }).catch(err => {
          that.$alert(err, '获取错题类型失败', {type: 'error'})
        })
      },
      onSelectType(item) {
        let that = this;
        this.$post('/api/exam/details', {typeId: that.form.typeId}).then(response => {
          that.detailOptions = response.result;
        }).catch(err => {
          that.$alert(err, '获取错题类型失败', {type: 'error'})
        })
      },
      fetchData(id) {
        let that = this;
        this.$fetch('/api/replay/' + id).then(response => {
          that.form = response.result
        }).catch(err => {
          that.$alert(err, '获取复盘详情失败', {type: 'error'})
        })
      },
      addDetail() {
        let that = this;
        if (!that.form.typeId) {
          that.$refs["form"].validateField('typeId');
          return;
        }
        this.$prompt('请输入错题详情', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消'
        }).then(({value}) => {
          let detailJson = {name: value, typeId: this.form.typeId};
          this.$post("/api/exam/detail/add", detailJson);
          this.$post('/api/exam/details', {typeId: that.form.typeId}).then(response => {
            that.detailOptions = response.result;
          }).catch(err => {
            that.$alert(err, '获取错题类型失败', {type: 'error'})
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '取消输入'
          });
        });
      },
      save: function () {
        const that = this;
        this.$refs.form.validate(valid => {
          if (valid) {
            let formJson = this.form;
            if (!this.isEdit) {
              this.$post("/api/exam/add", formJson)
                .then(response => {
                  that.$message({
                    message: response.message,
                    type: "success"
                  });
                  that.$router.push('/mistake')
                })
                .catch(err => that.$alert(err, "添加错题", {type: "error"}))
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
