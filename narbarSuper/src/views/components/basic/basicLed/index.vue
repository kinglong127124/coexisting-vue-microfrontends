<template>
  <div class="num-wrap">
    <template v-for="(num, index) of numList">
      <ul v-if="!num.isPoint" :style="{width: (fontSize*3/3)+'px', height: (fontSize*5/2)+'px'}" class="num-box">
        <li v-for="(item, l) of num.list" :style="{width: item.width+'px', height: item.height+'px', left: item.left+'px', top: item.top+'px'}">
          <div v-if="l%2 != 0" :style="{width: item.width+'px',height: item.height+'px'}">

            <span
              :style="{borderWidth: item.height/2+'px ' + item.height/2 + 'px ' +item.height/2+'px 0', borderColor: 'transparent '+(item.isFront? frontColor : backColor) +' transparent transparent' }"
              style="display: inline-block; padding: 0; margin: 0; float: left; box-sizing: content-box;"
              class="numleft"/>

            <span
              :style="{width: (item.width-item.height) + 'px', height: item.height + 'px', background: item.isFront? frontColor : backColor}"
              style="display: inline-block; padding: 0; margin: 0; float: left;"/>

            <span
              :style="{borderWidth: item.height/2+'px  0 ' + item.height/2 + 'px ' +item.height/2+'px', borderColor: 'transparent transparent transparent '+(item.isFront? frontColor : backColor) }"
              style="display: inline-block; padding: 0; margin: 0; float: left; box-sizing: content-box;"
              class="numright"/>

          </div>
          <div v-if="l%2 == 0" :style="{width: item.width+'px',height: item.height+'px'}">

            <div
              :style="{borderWidth: '0 ' + item.width/2+'px ' + item.width/2 + 'px ' +item.width/2+'px', borderColor: 'transparent transparent '+(item.isFront? frontColor : backColor) +' transparent' }"
              style="padding: 0; margin: 0; box-sizing: content-box;" class="numtop"/>

            <div
              :style="{width: item.width + 'px', background: item.isFront? frontColor : backColor, height: (item.height-item.width) +'px'}"
              style="padding: 0; margin: 0px; box-sizing: content-box;"/>

            <div
              :style="{borderWidth: item.width/2+'px ' + item.width/2 + 'px 0 ' +item.width/2+'px', borderColor: (item.isFront? frontColor : backColor) +' transparent transparent transparent' }"
              style="padding: 0; margin: 0; box-sizing: content-box;" class="numbottom"/>

          </div>
        </li>
      </ul>
      <ul v-if="num.isPoint" :style="{height: (fontSize*5/2)+'px'}">
        <li v-for="(item, l) of num.list"
            :style="{marginTop: (fontSize*2 + item.height/2)+'px',height: item.height+'px', width: item.height+'px', background: item.color}">
          <span/></li>
      </ul>
    </template>
  </div>
</template>

<style>
  .num-wrap ul{
    list-style: none;
    position: relative;
    float: left;
    margin-right:2px;
    padding-left:25px;
  }
  .num-box>li{
    position: absolute;
    display: block;
  }
  .numleft{
    width:0;
    height: 0;
    border-width:10px 10px 10px 0;
    border-style:solid;
    border-color:transparent #f00 transparent transparent;
  }
  .numright{
    width: 0;
    height: 0;
    border-width: 10px 0 10px 10px;
    border-style: solid;
    border-color: transparent transparent transparent red;
  }
  .numtop{
    position: relative;
    z-index: 2;
    width:0;
    height:0;
    border-width:0 10px 10px 10px;
    border-style:solid;
    border-color:transparent transparent red transparent;
  }
  .numbottom{
    width:0;
    height:0;
    border-top: 10px solid red;
    border-right: 10px solid transparent;
    border-left: 10px solid transparent;
  }
</style>

<script>
  export default {
    props: {
      rect: {
        type: Object,
        default: () => {
          return {}
        }
      }
    },
    data() {
      return {
        numArray: [],
        numRulsArr: ['0 1 2 4 5 6', '2 6', '1 2 3 4 5', '1 2 3 5 6', '0 2 3 6', '0 1 3 5 6', '0 1 3 4 5 6', '1 2 6', '0 1 2 3 4 5 6', '0 1 2 3 5 6', '3'],
        numList: []
      }
    },
    computed: {
      val() {
        return this.rect.options.data || 0
      },
      fontSize() {
        return this.rect.options.fontSize || 38
      },
      frontColor() {
        return this.rect.options.frontColor || 'rgba(0, 0, 0, .8)'
      },
      backColor() {
        return this.rect.options.backColor || '#ccc'
      },
      digits() {
        return this.rect.options.digits || 5
      }
    },
    watch: {
      val(v) {
        this.createLedNum(v, { width: this.fontSize })
      },
      fontSize(val) {
        this.createNum(this.digits)
        this.createLedNum(this.val, { width: val })
      },
      digits(val) {
        this.createNum(val)
        this.createLedNum(this.val, { width: this.fontSize })
      },
      frontColor() {
        this.createLedNum(this.val, { width: this.fontSize })
      },
      backColor() {
        this.createNum(this.digits)
        this.createLedNum(this.val, { width: this.fontSize })
      }
    },
    mounted() {
      const _this = this
      this.createNum(this.digits)
      this.createLedNum(this.val, { width: this.fontSize })
    },
    destroyed() {
      var child = this.$el
      child.parentNode.removeChild(child)
    },
    methods: {
      createNum(digits) {
        const width = this.fontSize
        const height = parseInt(width / 4)
        this.numList = []
        for (let m = 0; m < digits; m++) {
          this.numList.push({
            isPoint: false, num: '', codeNum: [], list: [
              { width: height, height: width, left: 0, top: height * 2 / 3, isFront: false, bg: '' },
              { width: width, height: height, left: height * 2 / 3, top: 0, isFront: false, bg: '' },
              { width: height, height: width, left: width + height / 3, top: height * 2 / 3, isFront: false, bg: '' },
              {
                width: width,
                height: height,
                left: height * 2 / 3,
                top: width + parseInt(height / 3),
                isFront: false,
                bg: ''
              },
              { width: height, height: width, left: 0, top: width + height, isFront: false, bg: '' },
              {
                width: width,
                height: height,
                left: height * 2 / 3,
                top: width * 2 + height * 2 / 3,
                isFront: false,
                bg: ''
              },
              {
                width: height,
                height: width,
                left: width + parseInt(height / 3),
                top: width + height,
                isFront: false,
                bg: ''
              }]
          })
        }
      },
      createLedNum(value, options) {
        const regPos = /^\d+(\.\d+)?$/ // 非负浮点数
        const regNeg = /^(-(([0-9]+\.[0-9]*[1-9][0-9]*)|([0-9]*[1-9][0-9]*\.[0-9]+)|([0-9]*[1-9][0-9]*)))$/ // 负浮点数
        if (regPos.test(value) || regNeg.test(value)) {
          const width = options.width
          const height = width / 4
          const valStr = value.toString()
          let num = valStr.split('')
          let offset = 0
          const len = num.length
          let digits = this.digits
          if (/\./.test(valStr)) {
            digits += 1
          }
          if (len < digits) {
            offset = digits - len
          } else if (len > digits) num = num.slice(0, digits)

          for (let p = 0; p < this.numList.length; p++) {
            if (this.numList[p].isPoint) {
              this.numList.splice(p, 1)
              break
            }
          }

          for (let o = 0; o < this.numList.length; o++) {
            for (const li of this.numList[o].list) {
              li.isFront = false
            }
          }

          for (let m = 0; m < num.length; m++) {
            let havePoint = false
            const n = num[m]
            let str = ''
            let cc = []
            if (/\d/.test(n)) {
              str = this.numRulsArr[n]
              cc = str.split(' ')
            } else if (/-/.test(n)) {
              str = this.numRulsArr[10]
              cc = str.split(' ')
            } else if (/\./.test(n)) {
              havePoint = true
            }
            if (havePoint) {
              this.numList.splice(m + offset, 0, {
                isPoint: true,
                num: '',
                codeNum: [],
                isFront: true,
                list: [{ width: width, height: height, color: this.frontColor }]
              })
              continue
            }
            for (let i = 0; i < 7; i++) {
              let isFront = false
              for (let j = 0; j < cc.length; j++) {
                if (i == cc[j]) {
                  isFront = true
                  break
                } else {
                  isFront = false
                }
              }
              if (isFront) {
                this.numList[m + offset].list[i].isFront = true
              } else {
                this.numList[m + offset].list[i].isFront = false
              }
            }
          }
        } else {
          this.$Message.error({
            content: '不是数值',
            duration: 3
          });
        }
    }
  }
  };
</script>
