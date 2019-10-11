<template>
  <div class="flex-layout">
    <page-form-auth-info/>
    <div ref="refSplitPane" :style="{height:heightSplitPane + 'px'}" class="splitPane-container">
      <split-pane :min-percent="30" :default-percent="50" split="vertical">
        <template slot="paneL">
          <div class="left-container">
            <el-table
              ref="refGoods"
              :data="goodslist"
              :height="500"
              highlight-current-row
              border
              fit
              stripe
              @current-change="handleCurrentChange">
              <el-table-column
                label="序号"
                type="index"
                width="60"
                align="center"/>
              <el-table-column
                property="name"
                label="系统全称"
                width="80"
                align="center"/>
              <el-table-column
                property="alias"
                label="系统简称"
                align="center"
                width="100"/>
              <el-table-column
                property="version"
                label="版本名称"
                align="center"
                width="100"/>
              <el-table-column
                property="mark"
                label="系统标识"
                align="center"
                width="80"/>
              <el-table-column
                property="explains"
                label="补充说明"
                align="left"
                header-align="center"
                show-overflow-tooltip
                min-width="100"/>
            </el-table>
          </div>
        </template>
        <template slot="paneR">
          <div class="right-container">
            <div class="handler-container">
              <el-button
                v-if="!defaultExpandAll"
                type="primary"
                size="small"
                icon="el-icon-if-open"
                plain
                @click="clickDefaultExpandAll">全部展开
              </el-button>
              <el-button
                v-if="defaultExpandAll"
                type="primary"
                size="small"
                icon="el-icon-if-fold"
                plain
                @click="clickDefaultExpandAll">全部折叠
              </el-button>
              <el-button type="primary" size="small" icon="el-icon-refresh" plain @click="clickRefresh">刷新</el-button>
              <el-button
                v-show="false"
                :disabled="disabledOverflow"
                type="primary"
                size="small"
                icon="el-icon-if-flow"
                plain
                @click="clickOverflow">配置流程
              </el-button>
              <basic-search
                ref="refBasicSearchMenu"
                :model-search-filter="modelSearchFilterMenu"
                @clickSearchFilter="clickSearchFilterMenu"/>
            </div>
            <basic-table-tree
              ref="refGoodsProject"
              :default-expand-all="defaultExpandAll"
              :data="goods"
              :columns="columns"
              :filter-node-method="filterNodeMethodMenu"
              @current-change="rowClick">
              <template slot-scope="obj" slot="ifCanOverflow">
                {{ formatIsOrNot(obj.scope.row.ifCanOverflow) }}
              </template>
              <template slot-scope="obj" slot="isAlreadyOverflow">
                {{ formatIsOrNot(obj.scope.row.isAlreadyOverflow) }}
              </template>
            </basic-table-tree>
          </div>
        </template>
      </split-pane>
    </div>
  </div>
</template>

<script>
import computed from '@/utilsCom/mixins/computed';
import methods from '@/utilsCom/mixins/methods';
import splitPane from 'vue-splitpane';
import basicSearch from '@/views/components/basic/basicSearch/index';
import formatEnum from '@/utilsCom/mixins/formatEnum';
import { staticDataBasic } from '@/assets/data/basic';
import {
  getFunctionMenu,
  configWorkFlowMenu
} from '@/api/custormManager/sysInfo/authInfo';

export default {
  components: { splitPane, basicSearch },
  mixins: [computed, methods, formatEnum],
  data() {
    return {
      total: 0,
      modelSearchFilter: {
        page: 1,
        limit: 10,
        fuzzy: ''
      },
      goodslist: [],
      goods: [],
      currentRow: null,
      defaultProps: {
        children: 'children',
        label: 'title'
      },
      productId: '',
      currentPage: 1,
      columns: [
        {
          expand: true,
          text: '菜单名称',
          value: 'title',
          width: 200,
          align: 'left',
          headerAlign: 'center',
          showOverflowTooltip: true
        },
        {
          text: '补充说明',
          value: 'component',
          minWidth: 140,
          align: 'left',
          headerAlign: 'center',
          showOverflowTooltip: true
        },
        {
          text: '是否可配审批流程',
          value: 'ifCanOverflow',
          width: 140,
          align: 'center'
        },
        {
          text: '是否已配审批流程',
          value: 'isAlreadyOverflow',
          width: 140,
          align: 'center'
        }
      ],
      heightSplitPane: 0,
      defaultExpandAll: false,
      currentRowChildren: null,
      modelSearchFilterMenu: {
        fuzzy: '',
        fuzzyKeys: ''
      }
    };
  },
  computed: {
    disabledOverflow() {
      if (this.$utils.length(this.currentRowChildren) && this.currentRowChildren.type == 'menu') {
        return false;
      } else {
        return true;
      }
    }
  },
  watch: {
    screenHeight(innerHeight) {
      this.heightInit(innerHeight);
    }
  },
  created() {
    // 初始化数据字典
    this.getEnumData([
      'GetIsOrNotData'
    ]);
  },
  mounted() {
    this.getAllMenus();
    const _self = this;
    this.$nextTick(() => {
      _self.heightInit(_self.getInnerHeight());
    });
  },
  methods: {
    /**
       * 高度初始化
       * @param innerHeight
       */
    heightInit(innerHeight) {
      const offsetTopSplitPane = this.$refs.refSplitPane.getBoundingClientRect().top;
      this.heightSplitPane = innerHeight - offsetTopSplitPane - 12;
    },
    clickDefaultExpandAll() {
      if (this.defaultExpandAll) {
        this.defaultExpandAll = false;
      } else {
        this.defaultExpandAll = true;
      }
      this.$refs.refGoodsProject.toggleExpandedAll(this.defaultExpandAll);
    },
    clickRefresh() {
      // 数据加入到列表中
      if (!this.isSelectedRow(this.currentRow)) return false;
      this.modelSearchFilterMenu.fuzzy = '';
      this.getChildrenMenus();
    },
    /**
       * 关键字搜索
       */
    clickSearchFilter() {
      this.$refs.refBasicSearch.searchFilter(this.$refs.refGoods, this.modelSearchFilter, () => {
        this.getAllMenus();
      });
    },
    getAllMenus() {
      this.$store.dispatch('GetAllMenus').then((response) => {
        if (!this.$utils.isEmpty(response.data)) {
          this.goodslist = response.data;
          this.$nextTick(function() {
            if (this.goodslist && this.goodslist.length > 0) {
              this.$refs.refGoods.setCurrentRow(this.goodslist[0]);
              // this.getChildrenMenus();
            } else {
              this.goods = [];
            }
          });
        }
      }).catch((error) => {
        console.log(error);
      });
    },
    getChildrenMenus() {
      getFunctionMenu({ productId: this.currentRow.id }).then((response) => {
        if (!this.$utils.isEmpty(response.data)) {
          // response.data.forEach((row) => {
          //   if (row.id == this.currentRow.id) {
          //     this.goods = row.children;
          //   }
          // })
          this.goods = response.data;
          this.$nextTick(function() {
            this.$refs.refGoodsProject.setCurrentRow(this.goods[0]);
          });
        } else {
          this.goods = [];
        }
      }).catch((err) => {
        console.log(err);
      });
    },
    handleCurrentChange(row) {
      if (row) {
        this.currentRow = row;
        this.defaultExpandAll = false;
        this.getChildrenMenus();
      }
    },
    rowClick(row, oldCurrentRow) {
      if (row) {
        this.currentRowChildren = row;
      }
    },
    clickOverflow(status) {
      if (this.currentRowChildren.ifCanOverflow != 1) {
        this.$message({
          message: staticDataBasic.info.canOverflowWorkFlow,
          type: 'warning'
        });
        return false;
      }
      this.$confirm(staticDataBasic.info.configWorkFlow, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        const data = { menuId: this.currentRowChildren.id };
        configWorkFlowMenu(data).then((res) => {
          if (res.status == 200) {
            // 当前对象
            this.currentRowChildren.isAlreadyOverflow = res.data;
            this.$message({
              type: 'success',
              message: res.message
            });
          }
        }).catch((err) => {
          console.log(err);
        });
      }).catch((cancel) => {
        console.log(cancel);
      });
    },
    /**
       * 关键字搜索
       */
    clickSearchFilterMenu() {
      this.$refs.refBasicSearchMenu.searchFilter(this.$refs.refGoodsProject, this.modelSearchFilterMenu, () => {
        try {
          this.$refs.refGoodsProject.filter(this.modelSearchFilterMenu.fuzzy);
        } catch (error) {
          console.log(error.message);
        }
      });
    },
    filterNodeMethodMenu(value, data, node) {
      if (!value) return true;
      if (node.children && node.children.length > 0) return true;
      const result = this.$utilsBasic.searchFilterByFuzzyKeysRow(node, this.modelSearchFilterMenu);
      return result;
    }
  }
};
</script>
