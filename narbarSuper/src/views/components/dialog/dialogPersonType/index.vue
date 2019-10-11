<!--人员类型（多选和单选）-->
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
      ref="refPersonTypeTreeData"
      :default-expand-all="defaultExpandAll"
      :data="personType.treeData"
      :columns="personType.treeColumns"
      :height="400"
      :filter-node-method="filterNodeMethod"
      @selection-change="selectionChangePersonType"
      @current-change="currentChangePersonType">
      <template slot="selection">
        <el-table-column v-if="isShowChecked" :selectable="selectablePersonType" type="selection" align="center"
                         width="55"/>
      </template>
    </basic-table-tree>
  </div>
</template>

<script>
  import {
    getPersonTypeTreeData
  } from '@/api/common/dialog/dialogPersonType'

  export default {
    name: 'DialogPersonType',
    props: {
      personTypeData: {
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

        personType: {
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
            },
            {
              text: '补充说明',
              value: 'remark',
              minWidth: 200,
              align: 'left',
              headerAlign: 'center',
              showOverflowTooltip: true
            }
          ],
          selectedRows: [],
          personTypeSelectedIdArray: []
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
      this.getPersonTypeTreeData()
    },
    methods: {
      /**
       * 关键字搜索
       */
      clickSearchFilter() {
        this.$refs.refBasicSearch.searchFilter(this.$refs.refPersonTypeTreeData, this.modelSearchFilter, () => {
          try {
            this.$refs.refPersonTypeTreeData.filter(this.modelSearchFilter.fuzzy)
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
        this.$refs.refPersonTypeTreeData.toggleExpandedAll(this.defaultExpandAll)
      },
      clickRefresh() {
        this.getPersonTypeTreeData()
      },
      /**
       * 获得所有人员类型
       */
      getPersonTypeTreeData() {
        getPersonTypeTreeData({ enable: 1, validateStatus: 1 }).then((response) => {
          if (response.data && response.data.length > 0) {
            this.personType.treeData = response.data
            // 单选和多选
            if (!this.isShowChecked) {
              this.defaultExpandAll = true
              this.$nextTick(() => {
                this.$refs.refPersonTypeTreeData.setCurrentRow(this.personTypeData[0], true)
              })
            } else {
              // 得到已选择ID
              if (this.personTypeData && this.personTypeData.length > 0) {
                const personTypeData = this.personTypeData
                this.personType.personTypeSelectedIdArray = personTypeData.map(row => {
                  return row.id
                })
              } else {
                this.personType.personTypeSelectedIdArray = []
              }
            }
          }
        })
      },
      /**
       * 选择当前选择框
       */
      selectionChangePersonType(selection) {
        this.personType.selectedRows = selection
        this.$emit('selectionChange', this.personType)
      },
      /**
       * 选择当前行
       */
      currentChangePersonType(selection) {
        this.personType.selectedRow = selection
        this.$emit('selectionChange', this.personType)
      },
      /**
       * 当前选择框，岗位可勾选，其他不能勾选
       */
      selectablePersonType(row, index) {
        if (row.ifLastLevel != 1 || this.personType.personTypeSelectedIdArray.includes(row.id)) {
          return 0
        }// 不可勾选
        else {
          return 1
        }// 可勾选
    }
  }
  };
</script>
