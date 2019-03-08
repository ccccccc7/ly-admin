<template>
  <div>
    <el-table :data="tableData" stripe style="width: 100%">
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button type="text" size="small" @click="detail(scope.$index,scope.row)">详情</el-button>
          <el-button type="text" size="small" @click="editDialog(scope.$index,scope.row)">编辑</el-button>
          <el-button type="text" size="small" @click="del(scope.$index,scope.row)">删除</el-button>
        </template>
      </el-table-column>
      <el-table-column prop="title" label="标题"/>
      <el-table-column prop="href" label="链接">
        <template slot-scope="scope">
          <a :href="scope.row.href" target="_blank">{{scope.row.href}}</a>
        </template>
      </el-table-column>
      <el-table-column prop="businessDate" label="事件日期"/>
      <el-table-column prop="createDate" label="记录日期"/>
    </el-table>
    <div style="margin: 20px 0;">
      <el-button plain type="primary" @click="openDialog()">新增</el-button>
    </div>

    <el-dialog title="事件记录" :visible.sync="formVisible">
      <el-form :model="form" :rules="rules" ref="form">
        <el-form-item prop="businessDate" label="时间" :label-width="formLabelWidth">
          <el-date-picker type="date" v-model="form.businessDate"></el-date-picker>
        </el-form-item>

        <el-form-item prop="title" label="标题" :label-width="formLabelWidth">
          <el-input v-model="form.title" auto-complete="off"></el-input>
        </el-form-item>

        <el-form-item label="链接" :label-width="formLabelWidth">
          <el-input v-model="form.href"></el-input>
        </el-form-item>

        <el-form-item label="记录" :label-width="formLabelWidth">
          <el-input type="textarea" :rows="10" placeholder="请输入内容" v-model="form.content"></el-input>
        </el-form-item>
      </el-form>

      <div slot="footer" class="dialog-footer">
        <el-button @click="formVisible = false">取 消</el-button>
        <el-button type="primary" @click="save()">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  export default {
    created: function () {
      this.fetchData();
    },
    data (){
      return {
        isAdd: true,
        formLabelWidth: '120px',
        formVisible: false,
        tableData: [],
        form: {},
        rules: {
          businessDate: [
            {type: "date", required: true, message: '请选择日期', trigger: 'change'}
          ],
          title: [
            {required: true, message: '请填写标题', trigger: 'change'}
          ]
        }
      }
    },
    methods: {
      fetchData: function () {
        this.$http.post("http://localhost:9020/api/diary/list", {

        }).then(response => {
          this.tableData = response.body.result;
        }).catch(response => this.$alert(response.body.message, "日常", {type: 'error'}))
      },
      openDialog: function () {
        this.formVisible = true;
        this.isAdd = true;
        this.form = {
          title: '',
          createDate: new Date(),
          businessDate: new Date(),
          content: '',
          href: ''
        }
      },
      save: function () {
        console.log(this.form)
        this.$refs.form.validate(valid => {
          if (valid) {
            let formJson = JSON.parse(JSON.stringify(this.form));
            if (this.isAdd) {
              this.$http.post("http://localhost:9020/api/diary/add", formJson)
                .then(() => {
                  this.$message({
                    message: "添加成功",
                    type: "success"
                  });
                  this.fetchData();
                  this.formVisible = false;
                })
                .catch(err => {
                  this.$alert(err.body.message, "添加日常事件", { type: "error" });
                })
            } else {
              this.$http.put("http://localhost:9020/api/diary", formJson)
                .then(() => {
                  this.$message({
                    message: "修改成功",
                    type: "success"
                  });
                  this.fetchData();
                  this.formVisible = false;
                })
                .catch(err => {
                  this.$alert(err.body.message, "修改日常事件", {type: "error"});
                })
            }

          } else {
            return false;
          }
        })
      },
      del: function(index, row) {
        this.$confirm("是否确认删除?","警告",{type: 'warning'})
          .then(() => {
            this.$http.delete("http://localhost:9020/api/diary/" + row.id)
              .then(response => {
                this.$message({
                  message: '删除成功',
                  type: 'success'
                });
                this.fetchData();
                }
              )
              .catch(err => {this.$alert(err.body.message, '删除日常', {type: 'error'})})
          })
      },
      editDialog: function(index,row) {
        let currentDairy = this.tableData.find(x => x.id === row.id);
        this.form = JSON.parse(JSON.stringify(currentDairy));
        this.form.businessDate = new Date(this.form.businessDate);
        this.form.createDate = new Date(this.form.createDate);
        this.formVisible = true;
        this.isAdd = false;
      },
      detail: function(index, row) {

      }
    }
  }
</script>

<style scoped>

</style>
