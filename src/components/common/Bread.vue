<template>
  <div class="bread">
    <el-row>
      <el-col>
        <el-breadcrumb separator="/">
          <el-breadcrumb-item :to="{ path: '/'}" class="el-bread">首页</el-breadcrumb-item>
          <el-breadcrumb-item v-for="(item,index) in $route.matched" :key="item.path" class="el-bread" :to="{path:item.path}" v-if="item.name != '首页'">{{item.name}}
          </el-breadcrumb-item>
        </el-breadcrumb>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  export default {
    name: 'bread'
  }
</script>


<style scoped>
  .bread {
    margin-bottom: 20px;
  }

  .bread .el-bread {
    display: inline-block;
    line-height: 28px;
  }

  .bread .el-bread :hover {
    cursor: pointer;
  }
</style>
