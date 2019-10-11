<template>
  <div class="register">
    <div class="r_topic">
      <div class="middle">
        <h1 class="left">超级管理-智慧工程管理系统</h1>
        <router-link to="/" class="right">
          已有账号? 请登录
          <i class="el-icon-arrow-right"/>
        </router-link>
      </div>
    </div>
    <h2>免费注册智慧工程管理系统登录账号</h2>
    <div class="r_form">
      <div class="imgbox">
        <div class="left">
          <img src="../../../assets/img/user/register/zc_s.png">
          <p class="blue">注册账号</p>
        </div>
        <div class="left"><span>●●●●●●●●●●</span></div>
        <div class="right">
          <img src="../../../assets/img/user/register/dz.png">
          <p class="gray">平台定制</p>
        </div>
      </div>
      <el-form ref="refRegisterForm" :model="modelForm" :rules="rules" :show-message="false">
        <div class="inputbox">
          <el-form-item prop="username">
            <el-input ref="refUserName" v-model="modelForm.username" clearable size="large"
                      placeholder="请输入联系人姓名,最大长度10字符"/>
            <div class="hint margin-top10">
              <span><i class="red">*</i>联系人姓名建议输入真实姓名</span>
            </div>
          </el-form-item>
        </div>
        <div class="inputbox">
          <el-form-item prop="mobilePhone">
            <el-input ref="refMobilePhone" v-model="modelForm.mobilePhone" clearable size="large"
                      placeholder="请输入手机号码，以11位手机号格式标准"/>
            <div class="hint">
              <span><i class="red">*</i>手机号码为系统管理员登录账号</span>
              <span>&nbsp;&nbsp;&nbsp;默认密码为：123456</span>
            </div>
          </el-form-item>
        </div>
        <div class="inputbox">
          <el-form-item prop="verifyCode">
            <el-input ref="refVerifyCode" v-model="modelForm.verifyCode" clearable size="large" class="code"
                      placeholder="请输入短信验证码，6位验证码"/>
            <el-button :disabled="!this.canClick" size="large" class="get-code" type="primary" @click="clickSendCode">{{
              cutNUm }}
            </el-button>
            <div class="hint">
              <span><i class="red">*</i>短信验证码长度默认为6位</span>
              <span>&nbsp;&nbsp;&nbsp;短信验证码失效时间为10分钟</span>
            </div>
          </el-form-item>
        </div>
        <div class="inputbox">
          <el-form-item prop="name">
            <el-input v-model="modelForm.name" clearable size="large" placeholder="请输入单位名称,最大长度50字符"/>
            <div class="hint margin-top10">
              <span>&nbsp;&nbsp;&nbsp;单位名称为联系人所在的单位</span>
            </div>
          </el-form-item>
        </div>
        <div class="inputbox">
          <el-button
            class="submit_btn"
            type="primary"
            @click="submitForm()">
            立即注册
          </el-button>
        </div>
      </el-form>
    </div>
  </div>
</template>

<script>
  import { validatePhone, validateLength } from '@/utilsCom/validate'
  import { staticDataBasic } from '@/assets/data/basic'
  import { Message } from 'element-ui'
  import {
    sendCode, checkCode
  } from '@/api/user/register'

  // 定时器全局变量
  let time = ''
  export default {
    data() {
      return {
        modelForm: {
          username: '',
          mobilePhone: '',
          verifyCode: '',
          name: '',
          smsMode: '1'
        }, // 表单信息
        rules: {
          username: [
            { required: true, message: '请输入联系人姓名', trigger: 'change' },
            { min: 1, max: 10, message: '长度在 1 到 10 个字符', trigger: 'change' }
          ],
          mobilePhone: [
            {
              required: true,
              validator: (rule, value, callback) => {
                validatePhone(rule, value, callback, true, ['手机号'])
              },
              trigger: 'change'
            }
          ],
          verifyCode: [
            {
              required: false,
              validator: (rule, value, callback) => {
                validateLength(rule, value, callback, false, ['验证码', 6, 6])
              },
              trigger: 'change'
            }
          ],
          name: [
            {
              validator: (rule, value, callback) => {
                validateLength(rule, value, callback, false, ['单位名称', 1, 50])
              },
              trigger: 'change'
            }
          ]
        },
        // 验证信息
        cutNUm: '获取验证码',
        canClick: true,
        timeMax: 60
      }
    },
    mounted() {

    },
    methods: {
      // 短信验证码
      getCode() {
        if (!this.canClick) return
        this.canClick = false
        this.timeMax = 60
        time = setInterval(() => {
          this.timeMax--
          this.cutNUm = '剩余' + this.timeMax + '秒'
          if (this.timeMax === 0) {
            this.cutNUm = '重新获取验证码'
            this.canClick = true
            clearInterval(time)
          }
        }, 1000)
      },
      clickSendCode() {
        this.rules['verifyCode'] = [
          {
            required: false,
            validator: (rule, value, callback) => {
              validateLength(rule, value, callback, false, ['验证码', 6, 6])
            },
            trigger: 'change'
          }
        ]
        this.$set(this.modelForm, 'verifyCode', '')
        this.$refs.refRegisterForm.validate((valid) => {
          if (valid) {
            sendCode(this.modelForm).then((response) => {
              if (response.status === 200) {
                this.$message({
                  message: response.message,
                  type: 'success'
                })
                this.getCode()
              }
            }).catch((err) => {
              console.log(err)
            })
          } else {
            this.$message({ message: staticDataBasic.info.updateEmptyError, type: 'warning' })
            return this.$utilsBasic.valideFocus(this, ['refUserName', 'refMobilePhone'])
          }
        })
      },
      submitForm() {
        this.rules['verifyCode'] = [
          {
            required: true,
            validator: (rule, value, callback) => {
              validateLength(rule, value, callback, true, ['验证码', 6, 6])
            },
            trigger: 'change'
          }
        ]
        this.$refs.refRegisterForm.validate((valid) => {
          if (valid) {
            checkCode(this.modelForm).then((response) => {
              if (response.status === 200) {
                this.registerMsg()
              }
            }).catch((err) => {
              console.log(err)
              this.$set(this.modelForm, 'verifyCode', '')
              return this.$utilsBasic.valideFocus(this, ['refVerifyCode'])
            })
          } else {
            this.$message({ message: staticDataBasic.info.updateEmptyError, type: 'warning' })
            return this.$utilsBasic.valideFocus(this, ['refUserName', 'refMobilePhone', 'refVerifyCode'])
          }
        })
      },
      registerMsg() {
        this.$store.dispatch('RegisterMsg', this.modelForm).then((response) => {
          if (response.status === 200) {
            this.$alert(staticDataBasic.info.registerInfo, '提示', {
              confirmButtonText: '登录',
              showClose: false,
              type: 'success'
            }).then(() => {
              this.$router.push({
                path: '/'
              })
            })
          } else {
            this.$message({ message: response.message, type: 'error' })
          }
        }).catch((error) => {
          console.log(error)
        })
    }
  }
  };
</script>

<style rel="stylesheet/scss" lang="scss" scoped="scoped">
.fl{
    float: left;
}
.fr{
    float: right;
}
.white{
    color: #fff;
}
.blue{
    color: #4287FF;
}
.gray{
    color: #9ba3b9;
}
.register{
    min-width: 900px;
    height: 100%;
    overflow: auto;
    background-image: url(../../../assets/img/user/register/bg.jpg);
    background-repeat: no-repeat;
    background-color: #ebf5ff;
    padding-bottom: 100px;
    background-size: 100% 45%;
    .r_topic{
        width: 100%;
        height: 100px;
        background: rgba(0,0,0,0.4);
        .middle{
            width: 1000px;
            height: 100%;
            margin: auto;
            .left{
                font-size: 42px!important;
                @extend .white;
                @extend .fl;
                margin:20px 0;
            }
            .right{
                font-size: 20px !important;
                @extend .white;
                display: block;
                @extend .fr;
                margin-top: 36px;
            }
        }
    }
    h2{
        @extend .white;
        font-size: 36px !important;
        font-weight: 100;
        text-align: center;
        margin: 50px 0;
    }
    .r_form{
        width: 1000px;
        height: 590px;
        margin: auto;
        background: #fff;
        box-shadow: 0 2px 12px 0 rgba(0,0,0,0.1);
        .imgbox{
            width: 420px;
            height: 140px;
            margin: auto;
            box-sizing: border-box;
            overflow: hidden;
            padding: 50px 30px 0 30px;
            display: -webkit-flex;
            display: flex;
            -webkit-justify-content: space-around;
            justify-content: space-around;
            .left,.right{
                display: inline-block;
                text-align: center;
            }
            .left{
                p{
                   font-size: 14px;
                }
            }
            .right{
                p{
                   font-size: 14px;
                }
            }
            span{
                font-size: 10px;
                color: #9fa4bc;
                letter-spacing: 6px;
                line-height: 60px;
                display: inline-block;
            }
        }
        .caption{
            @extend .gray;
            font-size: 16px !important;
            text-align: center;
            margin: 0;
        }
        .inputbox{
            width: 710px;
            height: auto;
            overflow: hidden;
            @extend .fr;
            margin-top: 20px;
            .el-form-item{
                .el-input{
                    @extend .fl;
                    width: 420px;
                    .el-input__inner{
                        width: 420px;
                    }
                }
                .hint{
                    @extend .fl;
                    margin-left: 20px;
                    span{
                        color: #9BA3B9;
                        font-size: 14px;
                        display: block;
                        line-height: 20px;
                      i{
                        margin-right: 5px;
                        font-style: normal;
                      }
                    }
                }
                .code{
                    @extend .fl;
                    width: 270px;
                    .el-input__inner{
                        width: 270px;
                    }
                }
            }
          .get-code {
            color: #fff;
            width: 140px;
            border: none;
            float: left;
            margin-left: 10px;
            border-radius: 0;
            background-color: #4287ff;
            height: 40px;
          }
            /*禁止点击并置灰样式*/
            .ban{
                background: #9ba3bb;
                cursor: not-allowed;
                outline: none;
            }
            /*提交样式*/
            .submit_btn{
                background: #4287ff;
                @extend .white;
                width: 420px;
                height: 42px;
                border: none;
                border-radius: 4px;
            }
        }
    }
}
</style>
