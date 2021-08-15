<template>
  <div>
    <div class="search-container">
      <div class="block">
        <el-select size="small" v-model="form.typeId" filterable clearable placeholder="题目类型" @change="fetchData()">
          <el-option v-for="item in typeOptions" :key="item.id" :label="item.name" :value="item.id"></el-option>
        </el-select>
        <el-select size="small" v-model="form.size" clearable placeholder="条数" @change="fetchData()">
          <el-option v-for="item in limitOptions" :key="item.value" :value="item.value" :label="item.value"></el-option>
        </el-select>
      </div>
    </div>
    <div id="chartColumn" style="width: 100%; height: 400px;"></div>
  </div>
</template>

<script>
  import * as echarts from 'echarts'

  export default {
    data() {
      return {
        chartColumn: null,
        form: {
          typeId: 1,
        },
        typeOptions: [],
        limitOptions: [
          {value : 7},
          {value : 30},
          {value : 60}
        ]
      }
    },
    methods: {
      drawLine: function () {
        this.chartColumn = this.chartColumn = echarts.init(document.getElementById('chartColumn'))

        this.chartColumn.setOption({
          tooltip: {},
          xAxis: {
            data: []
          },
          yAxis: {
            type: 'value'
          },
          series: [{
            data: [],
            type: 'line'
          }]
        });
      },
      fetchType: function () {
        let that = this;
        this.$post('/api/exam/type').then(response => {
          that.typeOptions = response.result
        }).catch(err => {
          that.$alert(err, '获取错题类型失败', {type: 'error'})
        })
      },
      handleChartData: function (list) {
        let length = list.length;
        let xData = [], yData = [];
        for (let i = 0; i < length; i++) {
          xData.push(list[i]['createDate'])
          yData.push(list[i]['count'])
        }
        let options;
        options = {
          xAxis: {
            data: xData
          },
          series: {
            data: yData
          }
        };
        return options;
      },
      fetchData: function () {
        let that = this;
        this.$fetchList("/api/exam/page", Object.assign({
          current: 1,
          size: 30,
          descs: this.descs
        }, that.form)).then(response => {
          let chartColumnData = that.handleChartData(response.result.records);
          console.log(chartColumnData)
          that.chartColumn.setOption(chartColumnData)
        }).catch(response => {
          that.$alert(response.body.message, "错题集", {type: 'error'})
        })
      },
    },
    created() {
      this.fetchType();
    },
    mounted() {
      this.fetchData();
      this.drawLine();
    },
  }
</script>

<style scoped>

</style>
