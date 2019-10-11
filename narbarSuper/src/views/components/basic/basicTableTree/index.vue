<template>
  <el-table
    ref="refElTable"
    :data="tableData"
    :row-style="showRow"
    v-bind="$attrs"
    :height="height"
    :min-height="minHeight"
    :span-method="spanMethod"
    :reserve-selection="reserveSelection"
    :row-key="getKeys"
    border
    fit
    highlight-current-row
    stripe
    v-on="$listeners"
    @row-click="rowClick"
    :show-summary="showSummary"
    :summary-method="getSummaries"
  >
    <el-table-column
      :reserve-selection="reserveSelection"
      label="序号"
      type="index"
      width="60"
      align="center"
    />
    <slot name="selection" />
    <slot name="slot-column" />
    <el-table-column
      v-for="(item, index) in columns"
      :label="item.text"
      :key="index"
      :prop="item.value"
      :min-width="item.minWidth"
      :width="item.width"
      :align="item.align||'center'"
      :header-align="item.headerAlign"
      :show-overflow-tooltip="item.showOverflowTooltip"
      :class-name="item.className"
    >
      <template slot-scope="scope">
        <slot :scope="scope" :name="item.value">
          <template v-if="item.expand">
            <!--<span v-if="scope.row.parentId==-1" :style="{'padding-left':+'0'}"/>-->
            <span :style="{'padding-left':+scope.row.tree_level*indent-18 + 'px'} " />
            <span
              v-if="showSperadIcon(scope.row)"
              class="tree-ctrl"
              @click="toggleExpanded(scope.$index)"
            >
              <!--<i v-if="!scope.row.tree_expand" class="el-icon-plus"/>-->
              <!--<i v-else class="el-icon-minus"/>-->
              <svg-icon v-if="!scope.row.tree_expand" icon-class="iconwenjianjia" />
              <svg-icon v-else icon-class="iconwenjianjia1" />
            </span>
            <span v-else class="tree-ctrl">
              <svg-icon icon-class="iconmojicaidan" />
              <!--<i v-if="scope.row.ifLastLevel == 1" class="el-icon-document"/>-->
            </span>
          </template>
          <template v-if="item.checkbox">
            <el-checkbox
              v-if="scope.row[defaultChildren]&&scope.row[defaultChildren].length>0"
              :style="{'padding-left':+scope.row.tree_level*indent + 'px'} "
              :indeterminate="scope.row.tree_select"
              v-model="scope.row.tree_select"
              @change="handleCheckAllChange(scope.row)"
            />
            <el-checkbox
              v-else
              :style="{'padding-left':+scope.row.tree_level*indent + 'px'} "
              v-model="scope.row.tree_select"
              @change="handleCheckAllChange(scope.row)"
            />
          </template>
          <template v-if="scope.row.tree_show">{{ scope.row[item.value] }}</template>
        </slot>
      </template>
    </el-table-column>
    <slot name="slot-many-column"/>
  </el-table>
</template>

<script>
  import treeToArray, { addAttrs } from './eval.js'
  import { staticDataBasic } from '@/assets/data/basic'
  let _that= null
export default {
  name: 'BasicTableTree',
  props: {
    data: {
      type: Array,
      required: true,
      default: () => []
    },
    columns: {
      type: Array,
      default: () => []
    },
    showSummary: {
      type: Boolean,
      default: false
    },
    getSummaries:{
      type: Function,
      default:(param)=>{
        return _that.getSummariesDefault(param)
      }
    },
    defaultExpandAll: {
      type: Boolean,
      default: false
    },
    defaultChildren: {
      type: String,
      default: 'children'
    },
    indent: {
      type: Number,
      default: 18
    },
    height: {
      type: [Number, String],
      default: 500
    },
    rowClick: {
      type: Function,
      default: () => () => {}
    },
    minHeight: {
      type: Number,
      default: 500
    },
    filterNodeMethod: Function,
    spanMethod: Function,
    rowKey: {
      type: [String, Function],
      default: () => 'code'
    },
    reserveSelection: Boolean,
    pushData: Array
  },
  data() {
    return {
      guard: 1,
      worker: null
    };
  },
  computed: {
    children() {
      return this.defaultChildren;
    },
    tableData: {
      get: function() {
        const data = this.data;
        if (this.data.length === 0) {
          return [];
        }
        addAttrs(data, {
          expand: this.defaultExpandAll,
          children: this.defaultChildren
        });
        console.time("retval");
        const retval = treeToArray(data, this.defaultChildren);
        console.timeEnd("retval");
        return retval;
      }
    }
  },
  created(){
    _that = this;
  },
  methods: {
    getKeys(row) {
      return row.id || row.code
    },
    addBrother(row, data) {
      if (row.tree_parent) {
        row.tree_parent.children.push(data);
      } else {
        if (this.pushData) {
          this.pushData.push(data);
        } else {
          this.data.push(data);
        }
      }
    },
    addChild(row, data) {
      if (!row.children) {
        this.$set(row, 'children', [])
      }
      row.children.push(data);
      this.$set(row, 'tree_expand', true)
    },
    delete(row) {
      const { tree_index, tree_parent } = row;
      if (tree_parent) {
        tree_parent.children.splice(tree_index, 1);
      } else {
        this.data.splice(tree_index, 1);
      }
    },
    deleteAllChildrens(row) {
      const { children } = row;
      if (children) {
        row.children.splice(0, children.length);
      }
    },
    getData() {
      return this.tableData;
    },
    showRow: function({ row }) {
      // console.log('this.data',this.data);
      if (row.tree_visible) {
        // console.log("row.name" + row.name, row.code);
        const parent = row.tree_parent;
        const show = parent ? parent.tree_expand && parent.tree_show : true;
        row.tree_show = show;
        // return show
        //   ? "animation:treeTableShow 1s;-webkit-animation:treeTableShow 1s;"
        //   : "display:none;";
        return show
          ? 'animation:treeTableShow 1s;-webkit-animation:treeTableShow 1s;'
          : 'display:none;';
      } else {
        // console.log("display:none-row.tree_show" + row.name, row.tree_show);
        return 'display:none;'
      }
    },
    showSperadIcon(row) {
      // ((scope.row[children] && scope.row[children].length<=0) || scope.row.type == 'menu'||scope.row.typeCode == 2
      if (row[this.children] && row[this.children].length > 0) {
        return true;
      } else {
        return false;
      }
    },
    toggleExpandedAll(expand) {
      for (const row of this.tableData) {
        this.$set(row, 'tree_expand', expand)
      }
    },
    toggleExpanded(trIndex) {
      const record = this.tableData[trIndex];
      const expand = !record.tree_expand;
      record.tree_expand = expand;
      this.$nextTick(() => {
        this.$refs.refElTable.doLayout();
      });
    },
    toggleExpandedRow(tree_id) {
      if (tree_id) {
        for (const row of this.tableData) {
          if (tree_id == row.tree_id) {
            if (!row.tree_expand) {
              this.$set(row, 'tree_expand', true)
              break;
            }
          }
        }
      }
    },
    handleCheckAllChange(row) {
      this.selectRecursion(row, row.tree_select, this.defaultChildren);
      this.isIndeterminate = row.tree_select;
    },
    selectRecursion(row, select, children = 'children') {
      if (select) {
        this.$set(row, 'tree_expand', true)
        this.$set(row, 'tree_show', true)
      }
      const sub_item = row[children];
      if (sub_item && sub_item.length > 0) {
        sub_item.map(child => {
          child.tree_select = select;
          this.selectRecursion(child, select, children);
        });
      }
    },
    updateTreeNode(item) {
      return new Promise(resolve => {
        const { tree_id, tree_parent } = item;
        const index = tree_id.split('-').slice(-1)[0] // get last index
        if (tree_parent) {
          tree_parent.children.splice(index, 1, item);
          resolve(this.data);
        } else {
          this.data.splice(index, 1, item);
          resolve(this.data);
        }
      });
    },
    toggleSelection(array) {
      if (array && array.length > 0) {
        this.$refs.refElTable.clearSelection();
        this.tableData.forEach(row => {
          for (const arrayRow of array) {
            if (arrayRow.id == row.id) {
              this.$refs.refElTable.toggleRowSelection(row, true);
              break;
            }
          }
        });
      } else {
        this.$refs.refElTable.clearSelection();
      }
    },
    toggleRowSelection(row, selected) {
      this.$refs.refElTable.toggleRowSelection(row, selected);
    },
    setCurrentRow(currentRow, isId = false) {
      if (currentRow) {
        for (const row of this.tableData) {
          if (isId) {
            if (currentRow.id == row.id) {
              this.$refs.refElTable.setCurrentRow();
              this.$refs.refElTable.setCurrentRow(row);
              break;
            }
          } else {
            if (currentRow.treeId == row.treeId) {
              this.$refs.refElTable.setCurrentRow();
              this.$refs.refElTable.setCurrentRow(row);
              break;
            }
          }
        }
      } else {
        this.$refs.refElTable.setCurrentRow();
      }
    },
    /**
     * 执行常规更新树操作
     * @param changedData 已更改的数据
     * @param treeData 原数据表数据
     */
    updateTableTreeData(changedData, callback) {
      const changedIds = changedData.map(row => row.treeId);
      this.tableData.forEach((row, index, array) => {
        if (changedIds.includes(row.treeId)) {
          for (const changedDataRow of changedData) {
            if (row.treeId == changedDataRow.treeId) {
              Object.assign(row, changedDataRow);
              break;
            }
          }
        }
      });
      if (typeof callback === 'function') {
        callback();
      }
    },
    filter(value) {
      if (!this.filterNodeMethod) {
        throw new Error('无【filterNodeMethod】方法！')
      }
      const filterNodeMethod = this.filterNodeMethod;

      const traverse = function(node) {
        const childNodes = node.root ? node.data : node.children;
        childNodes.forEach(child => {
          child.tree_visible = filterNodeMethod.call(
            child,
            value,
            child.children,
            child
          );
          traverse(child);
        });
        // console.log(node.code+'-'+node.name+'-'+node.tree_visible)
        if (node.tree_visible && childNodes.length) {
          let allHidden = true;

          childNodes.forEach(child => {
            if (child.tree_visible) allHidden = false;
          });
          node.tree_visible = allHidden === false;
        }
        if (!value) return;

        if (node.tree_visible && node.ifLastLevel == 2) {
          node.tree_expand = true;
        }
      };
      this.root = true;
      this.tree_visible = true;
      traverse(this);
      this.$nextTick(() => {
        this.$refs.refElTable.doLayout();
      });
    },
    /**
     * 表格尾部加总
     * */
    getSummariesDefault(param) {
      const { columns, data } = param
      const sums = []
      columns.forEach((column, index) => {
        if (index === 0) {
          sums[index] = '汇总'
          return
        }
        const values = data.map(item => Number(item[column.property]))
        if (!values.every(value => isNaN(value))) {
          sums[index] = values.reduce((prev, curr) => {
            const value = Number(curr)
            if (!isNaN(value)) {
              return prev + curr
            } else {
              return prev
            }
          }, 0);
          sums[index] = this.$utilsBasic.toThousands(sums[index])
        } else {
          sums[index] = ''
        }
      });

      return sums
    }
  }
};
</script>

<style>
@keyframes treeTableShow {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}
@-webkit-keyframes treeTableShow {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

.tree-ctrl {
  position: relative;
  cursor: pointer;
  color: #2196f3;
  vertical-align: -1px;
}
</style>
