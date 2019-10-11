<!--单位类型（多选及单选）-->
<template>
  <div class="dialog-container">
    <div class="handler-container">
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
    </div>
    <basic-table-tree
      ref="refUnitTypeTreeData"
      :default-expand-all="defaultExpandAll"
      :data="unitType.treeData"
      :columns="unitType.treeColumns"
      :filter-node-method="filterNodeMethod"
      :height="400"
      @selection-change="selectionChangeUnitType"
      @current-change="currentChangeUnitType">
      <template slot="selection">
        <el-table-column
          v-if="isShowChecked"
          :selectable="selectableUnitType"
          type="selection"
          align="center"
          width="55"/>
      </template>
    </basic-table-tree>
  </div>
</template>

<script>
  import {
    getUnitTypeTreeData
  } from '@/api/common/dialog/dialogUnitType'

  export default {
    name: 'DialogUnitType',
    props: {
      unitTypeData: {
        type: Array,
        required: false,
        default: () => []
      },
      isShowChecked: {
        type: Boolean,
        default: false
      }
    },
    data() {
      return {
        defaultExpandAll: false,
        filterText: '',
        unitType: {
          treeData: [],
          treeColumns: [
            {
              expand: true,
              text: '编码',
              value: 'code',
              width: 200,
              align: 'left',
              headerAlign: 'center',
              showOverflowTooltip: true
            },
            {
              text: '名称',
              value: 'name',
              minWidth: 140,
              align: 'left',
              headerAlign: 'center',
              showOverflowTooltip: true
            }
          ],
          selectedRows: [],
          unitTypeSelectedIdArray: []
        },
        modelSearchFilter: {
          fuzzy: '',
          fuzzyKeys: ''
      }
      };
    },
    watch: {
      filterText(filterStr) {
        //  this.roles.treeData.filter(val);
      }
    },
    created() {
      this.getUnitTypeTreeData()
    },
    methods: {
      /**
       * 关键字搜索
       */
      clickSearchFilter() {
        this.$refs.refBasicSearch.searchFilter(this.$refs.refUnitTypeTreeData, this.modelSearchFilter, () => {
          try {
            this.$refs.refUnitTypeTreeData.filter(this.modelSearchFilter.fuzzy)
          } catch (error) {
            console.log(error.message)
          }
        })
      },
      filterNodeMethod(value, data, node) {
        if (!value) return true
        if (node.children && node.children.length > 0) return true
        const result = this.$utilsBasic.searchFilterByFuzzyKeysRow(node, this.modelSearchFilter)
        return result
      },
      clickDefaultExpandAll() {
        if (this.defaultExpandAll) {
          this.defaultExpandAll = false
        } else {
          this.defaultExpandAll = true
        }
        this.getUnitTypeTreeData()
      },
      clickRefresh() {
        this.getUnitTypeTreeData()
      },
      /**
       * 获得所有岗位
       */
      getUnitTypeTreeData() {
        getUnitTypeTreeData().then((response) => {
          if (response.data && response.data.length > 0) {
            this.unitType.treeData = response.data
            // 单选和多选
            if (!this.isShowChecked) {
              this.defaultExpandAll = true
              this.$nextTick(() => {
                if (this.$utils.length(this.unitTypeData)) {
                  this.$refs.refUnitTypeTreeData.setCurrentRow(this.unitTypeData[0], true)
                } else {
                  this.$refs.refUnitTypeTreeData.setCurrentRow(this.unitType.treeData[0], true)
                }
              })
            } else {
              // 得到已选择ID
              if (this.unitTypeData && this.unitTypeData.length > 0) {
                const unitTypeData = this.unitTypeData
                this.unitType.unitTypeSelectedIdArray = unitTypeData.map(row => {
                  return row.id
                })
              }
            }
          }
        })
      },
      /**
       * 选择当前选择框
       */
      selectionChangeUnitType(selection) {
        this.unitType.selectedRows = selection
        this.$emit('selectionChange', this.unitType)
      },
      /**
       * 选择当前行
       */
      currentChangeUnitType(selection) {
        this.unitType.selectedRow = selection
        this.$emit('selectionChange', this.unitType)
      },
      /**
       * 当前选择框，岗位可勾选，其他不能勾选
       */
      selectableUnitType(row, index) {
        if (row.ifLastLevel != 1 || this.unitType.unitTypeSelectedIdArray.includes(row.id)) {
          return 0
        }// 不可勾选
        else {
          return 1
        }// 可勾选
    }
  }
  };
</script>
