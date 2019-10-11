<template>
  <div class="register">
    <div class="r_topic">
      <div>
        <h1 class="left">超级管理-智慧工程管理系统</h1>
        <a class="right">
          已有账号? 请登录
          <i class="el-icon-arrow-right"/>
        </a>
      </div>
    </div>
    <h2>免费注册智慧工程管理系统登录账号</h2>
    <div class="r_form">
      <div class="imgbox">
        <div class="left">
          <img src="../../../assets/img/user/register/zc.png">
          <p class="gray">注册账号</p>
        </div>
        <div class="left"><span>●●●●●●●●●●</span></div>
        <div class="right">
          <img src="../../../assets/img/user/register/dz_s.png">
          <p class="blue">平台定制</p>
        </div>
      </div>
      <p class="caption">根据您的使用场景，定制您的专属办公系统，可多选</p>
      <ul class="choose_list">
        <li v-for="(item,index) in list" :class="{'active':isActive==item.ident}" :key="index"
            @click="pitch(item.ident)">
          <div :class="[item.label]" class="sign">标准版</div>
          <p>{{ item.name }}</p>
          <span>{{ item.intro }}</span>
        </li>
      </ul>
      <div class="inputbox ">
        <button class="submit_btn" @click="use">免费试用</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      list: [{
        label: 'synth',
        name: '业主项目管理系统1',
        ident: 1,
        intro: '用于高校院校，生产商贸企业(基建处)，生产商贸企业(基建处)，生产商贸企业(基建处)，初次使用信息化管理的城投企业等'
      }, {
        label: 'synth',
        name: '业主项目管理系统2',
        ident: 2,
        intro: '用于高校院校，生产商贸企业(基建处)，生产商贸企业(基建处)，生产商贸企业(基建处)，初次使用信息化管理的城投企业等'
      }, {
        label: 'norm',
        name: '业主项目管理系统3',
        ident: 3,
        intro: '用于高校院校，生产商贸企业(基建处)，生产商贸企业(基建处)，生产商贸企业(基建处)，初次使用信息化管理的城投企业等'
      }, {
        label: 'norm',
        name: '业主项目管理系统4',
        ident: 4,
        intro: '用于高校院校，生产商贸企业(基建处)，生产商贸企业(基建处)，生产商贸企业(基建处)，初次使用信息化管理的城投企业等'
      }, {
        label: 'synth',
        name: '业主项目管理系统5',
        ident: 5,
        intro: '用于高校院校，生产商贸企业(基建处)，生产商贸企业(基建处)，生产商贸企业(基建处)，初次使用信息化管理的城投企业等'
      }, {
        label: 'synth',
        name: '业主项目管理系统6',
        ident: 6,
        intro: '用于高校院校，生产商贸企业(基建处)，生产商贸企业(基建处)，生产商贸企业(基建处)，初次使用信息化管理的城投企业等'
      }],
      isActive: 1
    }
  },
  mounted() {

  },
  methods: {
    pitch(id) {
      this.isActive = id
    },
    use() {
      this.$router.push({
        path: '/'
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
ul,ol,li{
    list-style: none;
}
.register{
    min-width: 1200px;
    height: auto;
    overflow: hidden;
    background-image: url(../../../assets/img/user/register/bg.jpg);
    background-repeat: no-repeat;
    background-color: #ebf5ff;
    padding-bottom: 100px;
    .r_topic{
        width: 100%;
        height: 100px;
        background: rgba(0,0,0,0.4);
        .center{
            width: 1200px;
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
                margin-top: 30px;
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
        width: 1200px;
        height: 640px;
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
            width: 800px;
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
        .choose_list{
            width: 1000px;
            height: auto;
            margin: auto;
            overflow: hidden;
            display: -webkit-flex;
            display: flex;
            -webkit-justify-content: space-between;
            justify-content: space-between;
            flex-wrap: wrap;
            li{
                width: 320px;
                height: 160px;
                border-radius: 6px;
                background: #f4f4f4;
                display: block;
                position: relative;
                box-sizing: border-box;
                padding: 20px;
                margin-top: 20px;
                .sign{
                    width: 70px;
                    height: 30px;
                    position: absolute;
                    top: 0;
                    right: 0;
                    @extend .white;
                    border-bottom-left-radius: 6px;
                    border-top-right-radius: 6px;
                    font-size: 14px;
                    line-height: 30px;
                    text-align: center;
                }
                .norm{
                    background: #49c993;
                }
                .synth{
                    background: #fec786;
                }
                p{
                    font-size: 22px;
                    margin: 0 0 20px 0;
                }
                span{
                    font-size: 14px;
                    line-height: 24px;
                }
                &:hover{
                   background: #4287ff;
                   color: #fff;
                   cursor: pointer;
                }
            }
            .active{
                background: #4287ff;
                color: #fff;
                cursor: pointer;
            }
        }
    }
}
</style>
