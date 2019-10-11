<!--授权信息-->
<!--参考页面：src\views\sysManager\sysInitialization\dataClean\index.vue-->
<template>
  <el-form label-width="120px" class="form-container auth-info">
    <el-row :gutter="10" ype="flex" justify="space-around">
      <el-col :span="8">
        <el-form-item label="唯一授权码">
          <el-input v-model="form.authCode" :disabled="true" clearable size="small"/>
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item label="单位名称">
          <el-input v-model="form.name" :disabled="true" clearable size="small"/>
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item label="登录手机号">
          <el-input v-model="form.mobile" :disabled="true" clearable size="small"/>
        </el-form-item>
      </el-col>
    </el-row>
  </el-form>
</template>

<script>
  export default {
    name: 'PageFormAuthInfo',
    data() {
      return {
        form: {}
      }
    },
    created() {
      this.getCompanyMsg()
    },
    methods: {
      getCompanyMsg() {
        this.$store.dispatch('GetCompanyMsg', this.$store.state.user.login.sysUserId).then((response) => {
          if (!this.$utils.isEmpty(response.data)) {
            this.form = response.data
          } else {
            this.form = {}
          }
        }).catch((error) => {
          console.log(error)
        })
    }
  }
  };
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
  .auth-info.form-container {
   height: 48px;
  }
</style>
