<template>
  <div>
    <basic-handler style="overflow: hidden;">
      <span v-show="!this.isShowChecked">
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
      <basic-search ref="refBasicSearch" :model-search-filter="modelSearchFilter"
                    @clickSearchFilter="clickSearchFilter"/>
    </basic-handler>
    <div class="template-container-list flex-layout">
      <div ref="refSplitPane" class="splitPane-content">
        <split-pane :min-percent="25" :default-percent="45" class="bpmaManager-container-list" split="vertical">
          <template slot="paneL">
            <basic-table-tree
              ref="leftTreeTable"
              :default-expand-all="defaultExpandAll"
              :data="unitTreeData"
              :columns="unitTreeTitle"
              reserve-selection
              row-key="id"
              height="100%"
              @current-change="currentChangePersonType"
              @selection-change="selectionChangePersonType">
              <template slot="selection">
                <el-table-column
                  v-if="isShowChecked"
                  :selectable="isCanChecked"
                  type="selection"
                  align="center"
                  width="55"/>
              </template>
            </basic-table-tree>
          </template>
          <template slot="paneR">
            <div class="flex">
              <el-table
                ref="rightTable"
                :data="data"
                row-key="id"
                highlight-current-row
                border
                stripe
                height="100%"
                reserve-selection
                @selection-change="selectionChange"
                @row-click="rowClick">
                <el-table-column
                  v-if="checkbox"
                  header-align="center"
                  align="center"
                  type="selection"
                  width="50"
                  show-overflow-tooltip
                  reserve-selection/>
                <el-table-column
                  header-align="center"
                  align="center"
                  label="序号"
                  type="index"
                  width="60"
                  show-overflow-tooltip/>
                <el-table-column
                  header-align="center"
                  align="center"
                  label="编码"
                  width="140"
                  prop="code"
                  show-overflow-tooltip/>
                <el-table-column header-align="center" label="中文姓名" width="140" prop="username" show-overflow-tooltip/>
                <el-table-column header-align="center" label="主岗岗位" prop="mainName" show-overflow-tooltip/>
              </el-table>
              <pagination
                :limit.sync="modelSearchFilter.limit"
                :page.sync="modelSearchFilter.page"
                :total="total"
                @pagination="getGoodslist" />
            </div>
          </template>
        </split-pane>
      </div>
    </div>
  </div>
</template>

<script>
  import splitPane from 'vue-splitpane'
  import {
    getOrgTreeAll,
    getOrgInfo
  } from '@/api/common/dialog/dialogPerson'
  import pagination from '@/components/Pagination'

  export default {
    name: 'DialogPreson',
    components: {
      splitPane,
      pagination
    },
    props: {
      checkbox: Boolean,
      filterLeft: Array,
      isShowChecked: {
        type: Boolean,
        default: false
      },
      defaultSelectedLeft: Array,
      defaultSelectedRight: Array
    },
    data() {
      return {
        data: [],
        defaultExpandAll: true,
        unitTreeData: [],
        isLoadingData: new Set(),
        rightData: {},
        unitTreeTitle: [
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
            minWidth: 140,
            headerAlign: 'center',
            showOverflowTooltip: true
          }
        ],
        modelSearchFilter: {
          page: 1,
          limit: 10,
          fuzzyKeys: '',
          fuzzy: '',
          ifPay: 2
        },
        total: 0,
        isInitDefaultSelected: true,
        filterText: ''
      }
    },
    created() {
      this.getOrgTreeAll()
    },
    methods: {
      clickSearchFilter() {
        this.$refs.refBasicSearch.searchFilter(this.$refs.rightTable, this.modelSearchFilter, () => {
          this.getGoodslist()
        })
      },
      clickDefaultExpandAll() {
        if (this.defaultExpandAll) {
          this.defaultExpandAll = false
        } else {
          this.defaultExpandAll = true
        }
        this.getOrgTreeAll()
      },
      clickRefresh() {
        this.getOrgTreeAll()
      },
      getOrgTreeAll() {
        getOrgTreeAll().then(res => {
          if (this.filterLeft && this.filterLeft.length > 0) {
            res.data = this.computedFilterValue(res.data, this.filterLeft.map(item => item.id))
          }
          this.unitTreeData = res.data
          this.$nextTick(() => {
            if (this.defaultSelectedLeft && this.defaultSelectedLeft.length > 0) {
              this.$refs.leftTreeTable.toggleSelection(this.defaultSelectedLeft)
            }
            if(res.data.length > 0 && this.$refs.leftTreeTable ){
              this.$refs.leftTreeTable.setCurrentRow(res.data[0]);
            }
          })
        })
      },
      computedFilterValue(data, target) {
        return data.filter(item => {
          if (item.children && item.children.length > 0) {
            item.children = this.computedFilterValue(item.children, target)
          }
          if (item.children && item.children.length > 0) return true
          if (target.includes(item.id)) return true
        })
      },
      currentChangePersonType(row) {
        if (!row) return;
        if (!this.isLoadingData.has(row.id)) {
          let filterLeft
          if (this.filterLeft && this.filterLeft.length > 0) filterLeft = this.filterLeft.map(item => item.id)
          if (filterLeft && !filterLeft.includes(row.id)) return
          this.modelSearchFilter.id = row.id
          this.isLoadingData.add(row.id)
          this.getGoodslist()
        } else {
          this.data = this.rightData[row.id].data
          this.total = this.rightData[row.id].total
        }
      },
      selectionChangePersonType(selection) {
        this.$emit('selectionChange', selection)
      },
      selectionChange(selection) {
        this.$emit('change', selection)
      },
      rowClick(row) {
        if (!this.checkbox) {
          this.$emit('change', row)
        }
      },
      getGoodslist() {
        getOrgInfo(this.modelSearchFilter).then(res => {
          this.total = res.data.total
          this.data = res.data.rows
          this.rightData[this.modelSearchFilter.id] = {}
          this.rightData[this.modelSearchFilter.id].data = res.data.rows
          this.rightData[this.modelSearchFilter.id].total = res.data.total
          if (this.isInitDefaultSelected) {
            if (this.defaultSelectedRight && this.defaultSelectedRight.length > 0) {
              this.defaultSelectedRight.forEach(item => {
                this.$refs.rightTable.toggleRowSelection(item, true)
              })
              this.isInitDefaultSelected = false
            }
          }
        })
      },
      isCanChecked(row) {
        if (this.filterLeft) {
          const filterLeft = this.filterLeft.map(item => item.id)
          if (filterLeft.includes(row.id)) {
            return 1
          }
        } else {
          return 1
        }
      },
      clearSelect() {
        if (this.$refs.rightTable) {
          this.$refs.rightTable.clearSelection()
      }
    }
  }
  };
</script>

<style scope>
  .splitPane-content {
    height: calc(100vh - 333px);
  }

  .flex {
    display: flex;
    height: 100%;
    flex-direction: column;
  }
</style>
