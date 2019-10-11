
//引入基本模板
let echarts =require('echarts/lib/echarts')

// 引入柱状图等组件
require('echarts/lib/chart/bar')
require('echarts/lib/chart/pie')

// 引入提示框和title组件，图例
require('echarts/lib/component/tooltip')
require('echarts/lib/component/title')
require('echarts/lib/component/legend')
//require('echarts/lib/component/legendScroll')//图例翻译滚动

require('echarts/extension/bmap/bmap') //百度扩展
import 'echarts/map/js/china.js';
import  'echarts/theme/shine.js' //echarts 主题

export default echarts
