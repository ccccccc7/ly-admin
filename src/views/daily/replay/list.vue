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
      <el-button plain type="primary" size="small" @click="add()">新增</el-button>
    </div>
  </div>
</template>

<script>
  import request from '@/util/request'

  export default {
    created: function () {
      this.fetchData();
    },
    data() {
      return {
        isAdd: true,
        formLabelWidth: '120px',
        formVisible: false,
        tableData: [],
        form: {},
        current: 1,
        size: 10,
        total: 10,
        descs: [`id`],
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
        let that = this;
        this.$fetchList("/api/replay/page", {
          current: this.current,
          size: this.size,
          descs: this.descs
        }).then(response => {
          that.tableData = response.result.records;
          that.total = response.result.total;
        }).catch(response => {
          that.$alert(response.body.message, "每日复盘", {type: 'error'})
        })
      },
      add: function () {
        this.$router.push({path: '/replay/add', params: {isEdit: false}});
      },
      edit: function (index, row) {
        let currentDairy = this.tableData.find(x => x.id === row.id);
        let data = JSON.parse(JSON.stringify(currentDairy));
        data.createDate = new Date(this.form.createDate);
        this.$router.push({path: '/replay/edit/:id', params: {daily: data, isEdit: true}})
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
                  this.$alert(err.body.message, "添加复盘", {type: "error"});
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
      del: function (index, row) {
        this.$confirm("是否确认删除?", "警告", {type: 'warning'})
          .then(() => {
            this.$del("/api/replay/" + row.id)
              .then(response => {
                  this.$message({
                    message: response.message,
                    type: 'success'
                  });
                  this.fetchData();
                }
              )
              .catch(err => {
                this.$alert(err.body.message, '删除复盘记录', {type: 'error'})
              })
          })
      },
      editDialog: function (index, row) {
        let currentDairy = this.tableData.find(x => x.id === row.id);
        this.form = JSON.parse(JSON.stringify(currentDairy));
        this.form.createDate = new Date(this.form.createDate);
        this.formVisible = true;
        this.isAdd = false;
      },
      detail: function (index, row) {

      },
      handleSizeChange: function (val) {
        this.size = val;
        this.fetchData();
      },
      handleCurrentChange: function (val) {
        this.current = val;
        this.fetchData();
      }
    }
  }
</script>

<style scoped>

</style>
