import Vue from 'vue';
import basicFormItem from './basic/basicFormItem';
import basicInput from './basic/basicInput';
import basicContainer from './basic/basicContainer';
import basicHandler from './basic/basicHandler';
import basicSearch from './basic/basicSearch';
import basicSearchQuery from './basic/basicSearch/query';
import basicSplitPane from './basic/basicSplitPane';
import basicTable from './basic/basicTable';
import basicTableTree from './basic/basicTableTree';
import basicValidateStatus from './basic/basicValidateStatus';
import basicDialog from './basic/basicDialog';
import basicUpload from './basic/basicUpload';
import basicIfOrNot from './basic/basicIfOrNot';
import basicUploadFiles from './basic/basicUploadFiles';
import basicChart from './basic/basicChart';
import basicBoxCard from './basic/basicBoxCard';
import basicTooltip from './basic/basicTooltip';
import basicLed from './basic/basicLed';
import basicBorder from './basic/basicBorder';
import basicBorderOne from './basic/basicBorder/borderOne';
import basicButtonMore from './basic/basicButtonMore';

import pageProjectFilter from './page/pageProjectFilter';
import pageProject from './page/pageProject';
import pageFormAuthInfo from './page/pageFormAuthInfo';

/**
 * basic注册
 */
Vue.component('basicFormItem', basicFormItem); // el-form-item二次封装组件
Vue.component('basicInput', basicInput); // el-input二次封装组件
Vue.component('basicContainer', basicContainer); // 自动撑开高度适应全屏
Vue.component('basicHandler', basicHandler); // 按钮盒子组件
Vue.component('basicSearch', basicSearch); // 关键字搜索组件
Vue.component('basicSearchQuery', basicSearchQuery); // 查询组件
Vue.component('basicSplitPane', basicSplitPane); // 布局拖动组件二次封装
Vue.component('basicTable', basicTable); // el-table二次封装组件
Vue.component('basicTableTree', basicTableTree); // 表格树组件
Vue.component('basicValidateStatus', basicValidateStatus); // 审核状态ui组件
Vue.component('basicDialog', basicDialog); // 弹框
Vue.component('basicUpload', basicUpload); // 文件上传
Vue.component('basicIfOrNot', basicIfOrNot); // 是否ui组件
Vue.component('basicUploadFiles', basicUploadFiles); // 原生文件上传
Vue.component('basicChart', basicChart); // echart
Vue.component('basicBoxCard', basicBoxCard); // 首页盒子更多
Vue.component('basicTooltip', basicTooltip); //  文本提示
Vue.component('basicLed', basicLed); //  时间模拟led样式显示
Vue.component('basicBorder', basicBorder); // 智慧工地首页边框
Vue.component('basicBorderOne', basicBorderOne); // 项目管理 - 看板
 Vue.component('basicButtonMore', basicButtonMore); // 更多的导入，导出Excel及模板
/**
 * page注册
 */
Vue.component('pageFormAuthInfo', pageFormAuthInfo); // 授权基本信息
Vue.component('pageProjectFilter', pageProjectFilter); // 项目选择过滤器组件
Vue.component('pageProject', pageProject); // 通用列表页
