<template>
  <div class="register">
    <div class="r_topic">
      <div class="middle">
        <h1 class="left">超级管理-智慧工程管理系统</h1>
        <router-link to="/" class="right">
          登录
          <i class="el-icon-arrow-right"/>
        </router-link>
      </div>
    </div>
    <h2>使用手机号重新设置密码</h2>
    <div class="r_form">
      <div class="imgbox">
        <div class="left">
          <img src="../../../assets/img/user/register/zc_s.png">
          <p class="blue">忘记密码</p>
        </div>
      </div>
      <el-form ref="refForgetPasswordForm" :model="modelForm" :rules="rules" :show-message="false" auto-complete="off" autocomplete="off">
        <div class="inputbox">
          <el-form-item prop="mobilePhone">
            <el-input ref="refMobilePhone" v-model="modelForm.mobilePhone" clearable size="large"
                      placeholder="请输入手机号码，以11位手机号格式标准"/>
            <div class="hint margin-top10">
              <span><i class="red">*</i>要找回密码的手机号码</span>
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
          <el-form-item label="旧密码" prop="oldPassword" style="display: none;">
            <input type="text" class="test" id="test" autocomplete="off" onfocus="this.type='password'"
                   style="display: none">
            <el-input ref="refOldPassword" v-model="modelForm.oldPassword" clearable size="small" type="password"
                      placeholder="请输入旧密码"
                      auto-complete="off"
                      autocomplete="off"
            />
          </el-form-item>
          <el-form-item prop="newPassword">
            <el-input ref="refNewPassword" v-model="modelForm.newPassword" clearable size="large" type="password"
                      placeholder="请输入新密码"
                      auto-complete="off"
                      autocomplete="off"
            />
            <div class="hint">
              <span><i class="red">*</i>至少为字母、数字、下划线两种组合</span>
              <span>&nbsp;&nbsp;&nbsp;密码长度6-18位</span>
            </div>
          </el-form-item>
        </div>
        <div class="inputbox">
          <el-form-item prop="newPasswordConfirm">
            <el-input ref="refNewPasswordConfirm" v-model="modelForm.newPasswordConfirm" clearable size="large"
                      type="password"
                      placeholder="请再次输入确认新密码"
                      auto-complete="off"
                      autocomplete="off"
            />
            <div class="hint">
              <span><i class="red">*</i>至少为字母、数字、下划线两种组合</span>
              <span>&nbsp;&nbsp;&nbsp;密码长度6-18位</span>
            </div>
          </el-form-item>
        </div>
        <div class="inputbox">
          <el-button
            class="submit_btn"
            type="primary"
            @click="submitForm()">
            提交
          </el-button>
        </div>
      </el-form>
    </div>
  </div>
</template>

<script>
  import { validatePhone, validateLength, validateRegex, isValidEleven } from '@/utilsCom/validate'
  import { staticDataBasic } from '@/assets/data/basic'
  import {
    sendCode, checkCode
  } from '@/api/user/register'
  import {
    forgetPasswordObj
  } from '@/api/user/forgetPassword'

  // 定时器全局变量
  let time = ''
  export default {
    data() {
      return {
        modelForm: {
          mobilePhone: '',
          verifyCode: '',
          newPassword: '',
          newPasswordConfirm: '',
          smsMode: '2'
        }, // 表单信息
        rules: {
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
          newPassword: [
            {
              required: false,
              validator: (rule, value, callback) => {
                validateRegex(rule, value, callback, false, ['新密码', 6, 18], isValidEleven)
              },
              trigger: 'change'
            }
          ],
          newPasswordConfirm: [
            {
              required: false,
              validator: (rule, value, callback) => {
                validateRegex(rule, value, callback, false, ['确认新密码', 6, 18], isValidEleven)
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
        this.$refs.refForgetPasswordForm.validate((valid) => {
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
            return this.$utilsBasic.valideFocus(this, ['refMobilePhone'])
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
        this.rules['newPassword'] = [
          {
            required: true,
            validator: (rule, value, callback) => {
              validateRegex(rule, value, callback, true, ['新密码', 6, 18], isValidEleven)
            },
            trigger: 'change'
          }
        ]
        this.rules['newPasswordConfirm'] = [
          {
            required: true,
            validator: (rule, value, callback) => {
              validateRegex(rule, value, callback, true, ['确认新密码', 6, 18], isValidEleven)
            },
            trigger: 'change'
          }
        ]
        this.$refs.refForgetPasswordForm.validate((valid) => {
          if (valid) {
            if (this.modelForm.newPassword != this.modelForm.newPasswordConfirm) {
              this.$message({ message: '亲，【新密码】与【确认新密码】不相等！', type: 'warning' })
              return
            }
            forgetPasswordObj(this.modelForm).then((response) => {
              if (response.status === 200) {
                this.$alert(staticDataBasic.info.forgetPasswordInfo, '提示', {
                  confirmButtonText: '登录',
                  showClose: false,
                  type: 'success'
                }).then(() => {
                  this.$router.push({
                    path: '/login'
                  })
                })
              }
            }).catch((err) => {
              console.log(err)
              this.$set(this.modelForm, 'verifyCode', '')
              return this.$utilsBasic.valideFocus(this, ['refVerifyCode'])
            })
          } else {
            this.$message({ message: staticDataBasic.info.updateEmptyError, type: 'warning' })
            return this.$utilsBasic.valideFocus(this, ['refMobilePhone', 'refVerifyCode', 'refNewPassword', 'refNewPasswordConfirm'])
          }
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
