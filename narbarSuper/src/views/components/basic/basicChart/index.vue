<template>
  <div ref="refContainer" class="chart-container">
    <div ref="refChart" :id="id" :style="{width:width,height:height}"/>
    <!--    <div class="chart-empty" ref="refEmpty" :style="{display: display}">暂无数据</div>-->
  </div>
</template>
<script>
  import echarts from '@/assets/plugins/echarts'

  export default {
    name: 'BasicChart',
    props: {
      /** *
         * 父组件需要传递的参数：id，width，height，option
         */
      id: {
        type: String,
        default: 'echarts-dom' + Date.now() + Math.random()
      },
      width: {
        type: String,
        default: '100%'
      },
      height: {
        type: String,
        default: '300px'
      },
      chartTypeData: {
        type: String,
        default: 'bar'
      },
      option: {
        type: Object,
        default: () => {
        }
      }
    },
    data() {
      return {
        chart: '', // echarts实例
        display: 'none'
      }
    },
    computed: {
      defaultOpt() {
        /**
         * 柱状图
         * */
        if (this.chartTypeData === 'bar') {
          return {
            title: {
              text: '',
              x: '12%',
              top: '10'
            },
            grid: { // 图表位置
              left: '10%',
              bottom: '5%',
              containLabel: true
            },
            color: ['#796aee', '#ff7676', '#3ff99c', '#ffc657', '#339dff'],
            tooltip: {
              trigger: 'axis',
              axisPointer: { // 坐标轴指示器，坐标轴触发有效
                type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
              },
              position: function(pos, params, dom, rect, size) {
                var x = 0 // x坐标位置
                var y = 0 // y坐标位置

                // 当前鼠标位置
                var pointX = pos[0]
                var pointY = pos[1]

                // 外层div大小
                // var viewWidth = size.viewSize[0];
                // var viewHeight = size.viewSize[1];

                // 提示框大小
                var boxWidth = size.contentSize[0]
                var boxHeight = size.contentSize[1]
                // boxWidth > pointX 说明鼠标左边放不下提示框
                if (boxWidth > pointX) {
                  x = 10
                } else { // 左边放的下
                  x = pointX - boxWidth
                }

                // boxHeight > pointY 说明鼠标上边放不下提示框
                if (boxHeight > pointY) {
                  y = 5
                } else { // 上边放得下
                  y = pointY - boxHeight
                }
                // console.log( x, y)
                return [x, y]
              }
            },
            legend: { // 图例
              left: '20%',
              top: '10',
              itemWidth: 14,
              textStyle: {
                color: '#90979c'
              }
            },
            xAxis: {
              type: 'category',
              axisLabel: {
                rotate: 15, // 名称15度倾斜
                interval: 0, // 显示所有标签
                formatter: function(value) {
                  if (value && value.length > 6) {
                    return value.substring(0, 6) + '...'
                  } else {
                    return value
                  }
                }
              }
            },
            yAxis: {
              type: 'value',
              axisTick: {
                show: false
              }
              /*  splitNumber:15 //坐标轴的分割段数*/
          }
          };
        }
        /**
         * 饼图
         * */
        if (this.chartTypeData === 'pie') {
          return {
            title: {
              text: '',
              x: '12%',
              top: '10'
            },
            color: ['#796aee', '#ff7676', '#3ff99c', '#ffc657', '#339dff'],
            tooltip: {
              position: function(pos, params, dom, rect, size) {
                var x = 0 // x坐标位置
                var y = 0 // y坐标位置

                // 当前鼠标位置
                var pointX = pos[0]
                var pointY = pos[1]

                // 外层div大小
                // var viewWidth = size.viewSize[0];
                // var viewHeight = size.viewSize[1];

                // 提示框大小
                var boxWidth = size.contentSize[0]
                var boxHeight = size.contentSize[1]
                // boxWidth > pointX 说明鼠标左边放不下提示框
                if (boxWidth > pointX) {
                  x = 10
                } else { // 左边放的下
                  x = pointX - boxWidth
                }

                // boxHeight > pointY 说明鼠标上边放不下提示框
                if (boxHeight > pointY) {
                  y = 5
                } else { // 上边放得下
                  y = pointY - boxHeight
                }
                // console.log( x, y)
                return [x, y]
              }
            },
            legend: { // 图例
              left: '20%',
              top: '10',
              itemWidth: 14,
              textStyle: {
                color: '#90979c'
              }
          }
          };
        }
      },
      initOpt() {
        return this.option
      }
    },
    watch: {
      initOpt(newOption) {
        console.log('newOption', newOption)
        if (!newOption) {
          this.chart.dispose()
        } else {
          if (this.chartTypeData === 'bar' && newOption.xAxis.data &&!(newOption.xAxis.data.length > 0)) {
            this.chart.dispose()
            this.$refs.refChart.innerHTML = '<div style="text-align:center;line-height:4;color:#909399;">暂无数据</div>'
            return
          }
          if (this.chartTypeData === 'pie' && !(newOption.series[0].data.length > 0)) {
            this.chart.dispose()
            this.$refs.refChart.innerHTML = '<div style="text-align:center;line-height:4;color:#909399;">暂无数据</div>'
            return
          }
          this.init()
        }
      }
    },

    mounted() {
      this.$nextTick(() => {
        this.init()
      })
    },
    activated() {
      console.log('activated')
      // this.$forceUpdate()
    },
    beforeDestroy() {
      console.log('beforeDestroy')
      if (!this.chart) {
        return
      }
      this.chart.dispose() // 释放图表组件
    },
    deactivated() {
      // console.log('deactivated')
      window.removeEventListener('resize', this.chartResize)
    },
    destroyed() {
      // console.log('destroyed')
      window.removeEventListener('resize', this.chartResize)
    },
    methods: {
      init() {
        // console.log('chart init')
        this.chart = echarts.init(document.getElementById(this.id), 'shine')
        this.chart.setOption(this.defaultOpt)
        this.checkAndSetOption(this.initOpt)
        this.chartResize()
        window.addEventListener('resize', this.chartResize)
      },
      chartResize() {
        // console.log('chart resize')
        this.chart.resize()
      },
      checkAndSetOption(option) {
        // console.log('option',option)
        if (this.isValidOption(option)) {
          this.chart.setOption(option)// 渲染出来
          // this.chart.hideLoading();    //隐藏加载动画
        } else {
        // this.chart.showLoading();   //加载动画
        }
      },

      /**
       * 判断option
       * 1. 是否为对象；
       * 2. 是否为空对象；
       * 3. 是否包含 series 键；
       * 4. series 是否为数组；
       * 5. series 数组是否为空。
       * */
      isValidOption(option) {
        return this.isObject(option) && !this.isEmptyObject(option) &&
          this.hasSeriesKey(option) &&
          this.isSeriesArray(option) && !this.isSeriesEmpty(option)
      },

      isObject(option) {
        return Object.prototype.isPrototypeOf(option)
      },

      isEmptyObject(option) {
        return Object.keys(option).length === 0
      },

      hasSeriesKey(option) {
        return !!option['series']
      },

      isSeriesArray(option) {
        return Array.isArray(option['series'])
      },

      isSeriesEmpty(option) {
        return option['series'].length === 0
    }
    }

  };
</script>
<style scoped>
  .chart-container{
    position: relative;
    width: 100%;
    min-height: 300px;
    height: 100%;
  }
  /*.chart-empty{
    position: absolute;
    left:0;
    right:0;
    top:0;
    bottom:0;
    line-height: 2;
    font-size: 14px;
    text-align: center;
    color:#909399;
  }*/

</style>
