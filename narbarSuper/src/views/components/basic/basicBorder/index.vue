<template>
  <div :style="{width:width +'px',height:height+'px'}" class="border-wrap">
    <div class="border-one" v-if="borderOneShowFlag"/>
    <div class="border-two" v-if="borderTwoShowFlag"/>
    <div class="border-three" v-if="borderThreeShowFlag"/>
    <div class="border-four" v-if="borderFourShowFlag"/>
    <slot/>
  </div>
</template>

<script>
  export default {
    name: 'BasicBorder',
    props: {
      width: {
        type: Number,
        default: 350
      },
      height: {
        type: Number,
        default: 350
    },
      borderOneShowFlag: {
        type: Boolean,
        default: true
      },
      borderTwoShowFlag: {
        type: Boolean,
        default: true
      },
      borderThreeShowFlag: {
        type: Boolean,
        default: true
      },
      borderFourShowFlag: {
        type: Boolean,
        default: true
      }
  }
  };
</script>

<style scoped lang="scss">
.border-wrap{
  border:1px solid rgba(38, 93, 133, 1);
  border-radius:4px;
  box-shadow: 0 0 15px #2c58a6 inset;
  position: relative;
  margin-bottom: 10px;
  padding:10px 30px 0;
  >div[class^='border-']{
    position: absolute;
    width: 14px;
    height: 14px;
    border:2px solid #bbe5f4;

  }

  >div.border-one {
    border-radius: 4px 0 0 0;
    left: 0;
    top: 0;
    border-right: none;
    border-bottom: none;
  }

  >div.border-two {
    border-radius:0 4px 0 0;
    right: 0;
    top: 0;
    border-left: none;
    border-bottom: none;
  }

  >div.border-three {
    border-radius:0 0 4px 0;
    right: 0;
    bottom: 0;
    border-left: none;
    border-top: none;
  }

  >div.border-four {
    border-radius:0 0 0 4px;
    left: 0;
    bottom: 0;
    border-top: none;
    border-right: none;
  }

}
</style>
