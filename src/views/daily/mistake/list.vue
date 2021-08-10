<template>
  <div>
    <div class="search-container">
      <div class="block">
        <el-date-picker type="date" size="small" v-model="form.createDate" value-format="yyyy-MM-dd"
                        placeholder="选择日期"></el-date-picker>
      </div>
      <el-button plain type="primary" size="small" @click="fetchData()">搜索</el-button>
    </div>
    <el-table :data="tableData" stripe style="width: 100%">
      <el-table-column label="操作">
        <template slot-scope="scope">
          <router-link :to="'/replay/edit/' + scope.row.id">
            <el-button type="text" size="small">编辑</el-button>
          </router-link>
          <el-button type="text" size="small" @click="del(scope.$index,scope.row)">删除</el-button>
        </template>
      </el-table-column>
      <el-table-column prop="typeName" label="错题类型"/>
      <el-table-column prop="count" label="错题个数"/>
      <el-table-column prop="timeCount" label="做题时间"/>
      <el-table-column prop="detailName" label="错题详情"/>
      <el-table-column prop="createDate" label="日期"/>

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
      <router-link :to="'/mistake/add'">
        <el-button plain type="primary" size="small">新增</el-button>
      </router-link>
    </div>
  </div>
</template>

<script>
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
        query: {},
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
        this.$fetchList("/api/exam/page", {
          current: this.current,
          size: this.size,
          descs: this.descs
        }).then(response => {
          that.tableData = response.result.records;
          that.total = response.result.total;
        }).catch(response => {
          that.$alert(response.body.message, "错题集", {type: 'error'})
        })
      },
      add: function () {
        this.$router.push({path: '/api/exam/add', query: {isEdit: false}});
      },
      del: function (index, row) {
        this.$confirm("是否确认删除?", "警告", {type: 'warning'})
          .then(() => {
            this.$del("/api/exam/" + row.id)
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
