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
      <el-table-column prop="createDate" label="记录日期"/>
    </el-table>
    <el-pagination small
                   :page-sizes="[10, 20, 50]"
                   @size-change="handleSizeChange"
                   @current-change="handleCurrentChange"
                   layout="prev, pager, next, jumper"
                   :current-page="current"
                   :page-size="size"
                   :total="total"></el-pagination>
    <div style="margin: 20px 0;">
      <el-button plain type="primary" size="small" @click="openDialog()">新增</el-button>
    </div>

    <el-dialog title="复盘记录" :visible.sync="formVisible">
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

      <div slot="footer" class="dialog-footer">
        <el-button size="small" @click="formVisible = false">取 消</el-button>
        <el-button size="small" type="primary" @click="save()">确 定</el-button>
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
        current: 1,
        size: 10,
        total: 10,
        descs:[`id`],
        rules: {
          businessDate: [
            {required: true, message: '请选择日期', trigger: 'change'}
          ],
          title: [
            {required: true, message: '请填写标题', trigger: 'change'}
          ]
        }
      }
    },
    methods: {
      fetchData: function () {
        this.$http.post("/api/replay/page", {
          current: this.current,
          size: this.size,
          descs: this.descs
        }).then(response => {
          this.tableData = response.body.result.records;
          this.total = response.body.result.total;
        }).catch(response => this.$alert(response.body.message, "每日复盘", {type: 'error'}))
      },
      openDialog: function () {
        this.formVisible = true;
        this.isAdd = true;
        this.form = {
          title: (new Date()).getFullYear() + '年' + ((new Date()).getMonth() + 1) + '月' + (new Date()).getDate() + '日复盘',
          createDate: new Date(),
          content: ''
        }
      },
      save: function () {
        this.$refs.form.validate(valid => {
          if (valid) {
            let formJson = this.form;
            if (this.isAdd) {
              this.$http.post("/api/replay", formJson)
                .then(() => {
                  this.$message({
                    message: "添加成功",
                    type: "success"
                  });
                  this.fetchData();
                  this.formVisible = false;
                })
                .catch(err => {
                  this.$alert(err.body.message, "添加复盘", { type: "error" });
                })
            } else {
              this.$http.put("/api/replay", formJson)
                .then(() => {
                  this.$message({
                    message: "修改成功",
                    type: "success"
                  });
                  this.fetchData();
                  this.formVisible = false;
                })
                .catch(err => {
                  this.$alert(err.body.message, "修改复盘", {type: "error"});
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
            this.$http.delete("/api/replay/" + row.id)
              .then(response => {
                  this.$message({
                    message: '删除成功',
                    type: 'success'
                  });
                  this.fetchData();
                }
              )
              .catch(err => {this.$alert(err.body.message, '删除复盘记录', {type: 'error'})})
          })
      },
      editDialog: function(index,row) {
        let currentDairy = this.tableData.find(x => x.id === row.id);
        this.form = JSON.parse(JSON.stringify(currentDairy));
        this.form.createDate = new Date(this.form.createDate);
        this.formVisible = true;
        this.isAdd = false;
      },
      detail: function(index, row) {

      },
      handleSizeChange: function(val) {
        this.size = val;
        this.fetchData();
      },
      handleCurrentChange: function(val) {
        this.current = val;
        this.fetchData();
      }
    }
  }
</script>

<style scoped>

</style>
