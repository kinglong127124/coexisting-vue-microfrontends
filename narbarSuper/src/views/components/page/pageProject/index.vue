<template>
  <basic-split-pane :default-percent="defaultPercent" :min-percent="minPercent" @resize="resize">
    <template slot="leftContainer">
      <div class="left-container">
        <basic-handler v-if="isBasicHandler">
          <slot name="button">
            <basic-search-query @clickQueryPage="clickQueryPage" @clickResetPage="clickResetPage"/>
            <el-button type="primary" size="small" icon="el-icon-plus" plain @click="clickAdd()">新增</el-button>
            <el-button :disabled="disabledView" type="primary" size="small" icon="el-icon-if-see" plain
                       @click="clickView">查看
            </el-button>
            <el-button type="primary" size="small" icon="el-icon-refresh" plain @click="getProjectData()">刷新</el-button>
            <template slot="search">
              <basic-search
                ref="refBasicSearch"
                :is-advanced-query="true"
                :model-search-filter="basicTable.modelSearchFilter"
                @clickSearchFilter="clickSearchFilter"/>
            </template>
          </slot>
        </basic-handler>
        <slot name="table"/>
      </div>
    </template>
    <template slot="rightContainer">
      <div class="right-container">
        <page-project-filter @change="changeProject" :type="type"/>
      </div>
    </template>
  </basic-split-pane>
</template>

<script>
  export default {
    name: 'PageProject',
    props: {
      isBasicHandler: {
        type: Boolean,
        default: true
      },
      basicHandler: {
        type: Object,
        default: () => {
          return {
            routerNameAdd: 'detail',
            routerNameView: 'detail'
          }
        }
      },
      basicTable: {
        type: Object,
        default: () => {
          return {
            tableData: {
              data: [],
              total: 0
            },
            currentRow: 0,
            columns: [],
            modelSearchFilter: {
              page: 1,
              limit: 10,
              fuzzy: '',
              fuzzyKeys: '',
              proId: ''
            }
          }
        }
      },
      minPercent: {
        type: Number,
        default: 25
      },
      defaultPercent: {
        type: Number,
        default: 75
      },
      // bpmaProjectAll:施工所有项目 bpmaProjectAudited:施工已审核项目
      // ownerProjectAll:业主所有项目 ownerProjectAudited:业主已审核项目
      // siteProjectAll:施工及业主所有项目 siteProjectAudited:施工及业主已审核项目
      type: {
        type: String,
        default: 'bpmaProjectAudited'
      }
    },
    data() {
      return {
        proObj: '',
      }
    },
    computed: {
      disabledView: function() {
        return !(this.basicTable.currentRow && this.basicTable.currentRow.id && this.basicTable.tableData.data.length)
      }
    },
    methods: {
      changeProject(obj) {
        this.basicTable.modelSearchFilter.page = 1
        this.basicTable.currentRow = null
        if (!obj) {
          this.basicTable.modelSearchFilter.proId = ''
          this.basicTable.tableData.data = []
          this.basicTable.tableData.total = 0
          return false
        }
        this.proObj = obj
        this.basicTable.modelSearchFilter.proId = this.proObj ? this.proObj.id : ''
        this.basicTable.modelSearchFilter.proName = this.proObj ? this.proObj.name : ''
        this.basicTable.modelSearchFilter.proCode = this.proObj ? this.proObj.code : ''
        this.$emit('changeData', obj)
      },
      // 查询左边
      getProjectData() {
        this.$emit('changeData', this.proObj)
      },
      /**
       * 关键字搜索
       */
      clickSearchFilter() {
        this.$refs.refBasicSearch.searchFilter(this.$parent.$refs.refBasicTable, this.basicTable.modelSearchFilter, () => {
          this.getProjectData()
        })
      },
      // 添加
      clickAdd() {
        if (!this.basicTable.modelSearchFilter.proId) {
          return this.$message.warning('当前无项目，无法新增！')
        }
        this.$store.dispatch('cacheId', '0')
        this.$router.push({
          name: this.basicHandler.routerNameAdd || 'add',
          params: {
            id: 0
          },
          query: { id: this.proObj.id, code: this.proObj.code, name: this.proObj.name }
        })
      },
      // 查看详情
      clickView() {
        if (!this.basicTable.currentRow.id) {
          return this.$message.warning('请选中一行查看')
        }
        this.$store.dispatch('cacheId', '0')
        this.$router.push({
          name: this.basicHandler.routerNameView || 'detail',
          params: {
            id: this.basicTable.currentRow.id
          }
        })
      },
      resize() {
        this.$emit('resize')
      },
      clickQueryPage(result) {
        console.log(result)
        console.log(this.basicTable.modelSearchFilter)
        Object.assign(this.basicTable.modelSearchFilter, result)
        this.getProjectData()
      },
      clickResetPage(result) {
        Object.assign(this.basicTable.modelSearchFilter, result)
        this.getProjectData()
      }  
    }
  }
</script>
