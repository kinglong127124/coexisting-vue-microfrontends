<!-- 我方单位、内部机构 -->
<template>
  <div class="dialog-container">
    <basic-handler>
      <span v-show="this.isShowChecked">
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
      </span>
      <el-button type="primary" size="small" icon="el-icon-refresh" plain @click="clickRefresh">刷新</el-button>
      <basic-search
        ref="refBasicSearch"
        :model-search-filter="modelSearchFilter"
        @clickSearchFilter="clickSearchFilter"/>
    </basic-handler>
    <basic-table-tree
      ref="refMyUnitTreeData"
      :default-expand-all="defaultExpandAll"
      :data="myUnit.treeData"
      :columns="treeColumns"
      :filter-node-method="filterNodeMethod"
      :height="400"
      :formatter="formatter"
      @selection-change="selectionChangeMyUnit"
      @current-change="currentChangeMyUnit">
      <template slot="selection">
        <el-table-column v-if="isShowChecked" :selectable="selectableMyUnit" type="selection" align="center"
                         width="55"/>
      </template>
    </basic-table-tree>
  </div>
</template>

<script>
  import methods from '@/utilsCom/mixins/methods'
  import computed from '@/utilsCom/mixins/computed'
  import {
    getOrgInfo
  } from '@/api/common/dialog/dialogMyUnit'

  export default {
    name: 'DialogUnit',
    mixins: [computed, methods],
    props: {
      myUnitData: {
        type: Array,
        required: false,
        default: () => []
      },
      isShowChecked: {
        type: Boolean,
        default: false
      },
      filterValid: Boolean,
      filterUnit: Boolean,
      type: {
        type: [Number, String],
        default: () => 1
      }
    },
    data() {
      return {
        defaultExpandAll: false,
        filterText: '',
        tableShow: false,
        myUnit: {
          treeData: [],
          // 表格
          treeColumnsTable: [
            {
              text: '编码',
              value: 'code',
              align: 'left',
              minWidth: 140,
              headerAlign: 'center',
              showOverflowTooltip: true
            },
            {
              text: '名称',
              value: 'name',
              align: 'left',
              minWidth: 200,
              headerAlign: 'center',
              showOverflowTooltip: true
            },
            {
              text: '简称',
              value: 'alias',
              align: 'left',
              minWidth: 140,
              headerAlign: 'center',
              showOverflowTooltip: true
            },
            {
              text: '属性',
              value: 'typeName',
              align: 'left',
              minWidth: 80,
              headerAlign: 'center',
              showOverflowTooltip: true
            },
            {
              text: '职责',
              value: 'duty',
              align: 'left',
              minWidth: 120,
              headerAlign: 'center',
              showOverflowTooltip: true
            },
            {
              text: '说明',
              value: 'remark',
              align: 'left',
              minWidth: 140,
              headerAlign: 'center',
              showOverflowTooltip: true
            }
          ],
          // 表格树
          treeColumnsTree: [
            {
              expand: true,
              text: '编码',
              value: 'code',
              align: 'left',
              minWidth: 140,
              headerAlign: 'center',
              showOverflowTooltip: true
            },
            {
              text: '名称',
              value: 'name',
              align: 'left',
              minWidth: 200,
              headerAlign: 'center',
              showOverflowTooltip: true
            },
            {
              text: '简称',
              value: 'alias',
              align: 'left',
              minWidth: 140,
              headerAlign: 'center',
              showOverflowTooltip: true
            },
            {
              text: '属性',
              value: 'typeName',
              align: 'left',
              minWidth: 80,
              headerAlign: 'center',
              showOverflowTooltip: true
            },
            {
              text: '职责',
              value: 'duty',
              align: 'left',
              minWidth: 120,
              headerAlign: 'center',
              showOverflowTooltip: true
            },
            {
              text: '说明',
              value: 'remark',
              align: 'left',
              minWidth: 140,
              headerAlign: 'center',
              showOverflowTooltip: true
            }
          ],
          selectedRows: [],
          myUnitSelectedIdArray: []
        },
        treeColumns: [],
        modelSearchFilter: {
          fuzzy: '',
          fuzzyKeys: ''
      }
      };
    },
    computed: {
      validateStatus() {
        if (!Array.isArray(this.dataEnum.validateStatus)) return {}
        return this.dataEnum.validateStatus.filter(item => item.name === '已审核')[0]
        this.getOrgInfo()
      },
      enabled() {
        if (!Array.isArray(this.dataEnum.enabled)) return {}
        return this.dataEnum.enabled.filter(item => item.name === '启用')[0]
        this.getOrgInfo()
      }
    },
    watch: {
      filterText(filterStr) {
        //  this.roles.treeData.filter(val);
      }
    },
    created() {
      this.getEnumData(['GetValidateStatusData', 'GetEnabledData', 'GetIsOrNotData'])
      this.treeColumns = this.myUnit.treeColumnsTree
      if (this.filterUnit) {
        this.treeColumns = this.myUnit.treeColumnsTable
      }
      this.getOrgInfo()
    },
    methods: {
      clickDefaultExpandAll() {
        if (this.defaultExpandAll) {
          this.defaultExpandAll = false
        } else {
          this.defaultExpandAll = true
        }
        this.$refs.refMyUnitTreeData.toggleExpandedAll(this.defaultExpandAll)
      },
      clickRefresh() {
        this.modelSearchFilter.fuzzy = ''
        this.getOrgInfo()
      },
      /**
       * 关键字搜索
       */
      clickSearchFilter() {
        this.$refs.refBasicSearch.searchFilter(this.$refs.refMyUnitTreeData, this.modelSearchFilter, () => {
          try {
            this.$refs.refMyUnitTreeData.filter(this.modelSearchFilter.fuzzy)
          } catch (error) {
            console.log(error.message)
          }
        })
      },
      filterData(data, key, value) {
        return data.filter(item => {
          if (item.children && item.children.length > 0) {
            item.children = this.filterData(item.children, key, value)
          }
          if (item[key] == value || (item.children && item.children.length > 0)) return true
        })
      },
      filterNodeMethod(value, data, node) {
        if (!value) return true
        if (node.children && node.children.length > 0) return true
        const result = this.$utilsBasic.searchFilterByFuzzyKeysRow(node, this.modelSearchFilter)
        return result
      },
      /**
       * 获得所有岗位
       */
      getOrgInfo() {
        this.tableShow = true
        getOrgInfo({ enable: 1, validateStatus: 1, type: 1 }).then((response) => {
          this.tableShow = false
          if (this.filterValid) {
            response.data = this.filterData(response.data, 'validateStatus', 1)
            response.data = this.filterData(response.data, 'enable', 1)
          }
          if (this.filterUnit) {
            response.data = this.filterData(response.data, 'type', this.type)
          }
          this.myUnit.treeData = response.data
          // 单选和多选
          if (!this.isShowChecked) {
            this.defaultExpandAll = true
            this.$nextTick(() => {
              this.$refs.refMyUnitTreeData.setCurrentRow(this.myUnitData[0], true)
            })
          } else {
            if (this.myUnitData && this.myUnitData.length > 0) {
              const myUnitData = this.myUnitData
              this.myUnit.myUnitSelectedIdArray = myUnitData.map(row => {
                return row.id
              })
            } else {
              this.myUnit.myUnitSelectedIdArray = []
            }
          }
        })
      },
      /**
       * 选择当前选择框
       */
      selectionChangeMyUnit(selection) {
        console.log(selection)
        this.myUnit.selectedRows = selection
        this.$emit('selectionChange', this.myUnit)
      },
      /**
       * 选择当前行
       */
      currentChangeMyUnit(selection) {
        this.myUnit.selectedRow = selection
        this.$emit('selectionChange', this.myUnit)
      },
      /**
       * 当前选择框，岗位可勾选，其他不能勾选
       */
      selectableMyUnit(row, index) {
        let lock
        if (this.filterUnit) {
          if (row.type == this.type) {
            lock = true
          } else {
            lock = false
          }
        } else {
          lock = true
        }
        if (lock) {
          return 1
        }// 不可勾选
        else {
          return 0
        }// 可勾选
      },
      formatter(val) {
        console.log(val);
      }
  }
  };
</script>
