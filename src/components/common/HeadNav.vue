<template>
  <div>
    <header class="head-nav">
      <el-row>
        <el-col class='logo-container'>
          <el-progress :text-inside="true" :stroke-width="18" :percentage="datePercent"></el-progress>
        </el-col>
      </el-row>
    </header>
  </div>
</template>

<script>
  export default {
    name: 'head-nav',
    data() {
      return {
        datePercent: 10
      }
    }
  }
</script>

<style scoped>

</style>
