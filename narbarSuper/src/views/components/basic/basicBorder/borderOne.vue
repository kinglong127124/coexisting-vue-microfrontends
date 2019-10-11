<template>
  <div :style="{width:width ,height:height}" class="border-wrap">
    <div class="border-one" v-if="borderOneShowFlag"></div>
    <div class="border-two" v-if="borderTwoShowFlag"></div>
    <div class="border-three" v-if="borderThreeShowFlag"></div>
    <div class="border-four" v-if="borderFourShowFlag"></div>
    <slot/>
  </div>
</template>

<script>
  export default {
    name: 'BorderOne',
    props: {
      width: {
        type: String,
        default:'100%'
      },
      height: {
        type: String,
        default: '83px'
      },
      borderOneShowFlag: {
        type: Boolean,
        default: false
      },
      borderTwoShowFlag: {
        type: Boolean,
        default: false
      },
      borderThreeShowFlag: {
        type: Boolean,
        default: false
      },
      borderFourShowFlag: {
        type: Boolean,
        default: false
      }
    }
  };
</script>

<style scoped lang="scss">
  .border-wrap{
    border:1px solid #13468e;
    border-radius:8px;
    box-shadow: 0 0 5px #2c58a6 inset;
    position: relative;
    padding:5px;
    >div[class^='border-']{
      position: absolute;
      width: 8px;
      height: 7px;
      border-top:2px solid #bbe5f4;
      border-radius: 3px 3px 0 0;
      transform: rotate(-45deg);
    }

    >div.border-one {
      left: 3px;
      top: 3px;
      transform: rotate(-45deg);
    }

    >div.border-two {
      right: 3px;
      top:3px;
      transform: rotate(45deg);

    }

    >div.border-three {
      right: 3px;
      bottom: 3px;
      transform: rotate(135deg);

    }

    >div.border-four {
      left:3px;
      bottom: 3px;
      transform: rotate(-135deg);

    }

  }
</style>
