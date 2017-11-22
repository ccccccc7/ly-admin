<template>
  <div>
    <el-form :model="form">
      <el-form-item label="姓名" prop="name" :rules="[{ required: true,message: '姓名不能为空'}]">
        <el-input type="name" v-model="form.name"></el-input>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        form: {}
      }
    }
  }
</script>

<style scoped>
</style>
