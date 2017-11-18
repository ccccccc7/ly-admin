<template>
  <div>
    <el-row class="container">
      <el-col :span="24" class="head">
        <head-nav></head-nav>
      </el-col>

      <el-col :span="24" class="content">
        <aside>
          <left-menu style="height: 100%"></left-menu>
        </aside>
        <section class="content-container">
          <div class="grid-content bg-purple-light">
            <el-col :span="24" class="content-wrapper">
              <transition name="fade" mode="out-in">
                <router-view></router-view>
              </transition>
            </el-col>
          </div>
        </section>
      </el-col>
    </el-row>

  </div>
</template>

<script>
  import Common from './common'
  export default {
    name: 'home',
    components: Common
  }
</script>

<style scoped>
</style>
