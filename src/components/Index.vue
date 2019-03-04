<template>
  <div>
    <el-row>
      <el-col :span="4">
        <!--<el-card :body-style="{ padding: '0px'}">-->
          <!--<img src="../../static/images/2.jpg" class="image">-->
          <!--<div style="padding: 14px">-->
            <!--<div class="bottom clearfix">-->
              <!--<time class="time">{{currentDate}}</time>-->
              <!--<el-button type="text" class="button">按钮</el-button>-->
            <!--</div>-->
          <!--</div>-->
        <!--</el-card>-->
        <!--<div style="height: 800px;">-->
          <!--<el-steps direction="vertical">-->
            <!--<el-step title="步骤 1" description="这是一段很长很长很长的描述性文字"></el-step>-->
            <!--<el-step title="步骤 2" description="这是一段很长很长很长的描述性文字"></el-step>-->
            <!--<el-step title="步骤 3" description="这是一段很长很长很长的描述性文字"></el-step>-->
            <!--<el-step title="步骤 3" description="这是一段很长很长很长的描述性文字"></el-step>-->
            <!--<el-step title="步骤 3" description="这是一段很长很长很长的描述性文字"></el-step>-->
            <!--<el-step title="步骤 3" description="这是一段很长很长很长的描述性文字"></el-step>-->
            <!--<el-step title="步骤 3" description="这是一段很长很长很长的描述性文字"></el-step>-->
            <!--<el-step title="步骤 3" description="这是一段很长很长很长的描述性文字"></el-step>-->
            <!--<el-step title="步骤 3" description="这是一段很长很长很长的描述性文字"></el-step>-->
            <!--<el-step title="步骤 3" description="这是一段很长很长很长的描述性文字"></el-step>-->
          <!--</el-steps>-->
        <!--</div>-->
      </el-col>
    </el-row>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        currentDate: new Date()
      };
    }
  }
</script>

<style scoped>
  .time {
    font-size: 13px;
    color: #999;
  }

  .bottom {
    margin-top: 13px;
    line-height: 12px;
  }

  .button {
    padding: 0;
    float: right;
  }

  .image {
    width: 100%;
    display: block;
  }

  .clearfix:before,
  .clearfix:after {
    display: table;
    content: "";
  }

  .clearfix:after {
    clear: both
  }
</style>
