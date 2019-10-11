<!--操作人员（多选和单选）-->
<template>
  <div class="dialog-container">
    <basic-handler>
      <el-button type="primary" size="small" icon="el-icon-refresh" plain @click="clickRefresh">刷新</el-button>
      <basic-search ref="refBasicSearch" :model-search-filter="modelSearchFilter"
                    @clickSearchFilter="clickSearchFilter"/>
    </basic-handler>
    <basic-table
      ref="refUserManagerTableData"
      :data-table="userManager.tableData"
      :columns="userManager.tableColumns"
      :pagination="modelSearchFilter"
      @selection-change="selectionChangePersonType"
      @current-change="currentChangeUserManager"
      @pagination="getGoodslist">
      <template slot="selection">
        <el-table-column v-if="isShowChecked" :selectable="selectablePersonType" type="selection" align="center"
                         width="55"/>
      </template>
    </basic-table>
  </div>
</template>

<script>
  import methods from '@/utilsCom/mixins/methods'
  import computed from '@/utilsCom/mixins/computed'
  import {
    getUserManagerData
  } from '@/api/common/dialog/dialogUserManager'
  import pagination from '@/components/Pagination'
  import $store from '@/store'

  export default {
    name: 'DialogUserManager',
    components: { pagination },
    mixins: [computed, methods],
    props: {
      personTypeData: {
        type: Array,
        required: false,
        default: () => []
      },
      isShowChecked: {
        type: Boolean,
        default: false
      },
      filterValid: Boolean,
      filterCheck: Boolean,
      filterDatas: Array,
      defaultSelectedRight: Array
    },
    data() {
      return {
        defaultExpandAll: false,
        modelSearchFilter: {
          page: 1,
          limit: 10,
          enable: 1,
          validateStatus: 1,
          fuzzyKeys: '',
          fuzzy: ''
        },
        tableShow: false,
        userManager: {
          tableData: {
            data: [],
            total: 0
          },
          tableColumns: [
            {
              text: '系统编码',
              value: 'code',
              minWidth: 100,
              align: 'center',
              headerAlign: 'center',
              showOverflowTooltip: true
            },
            {
              text: '中文姓名',
              value: 'username',
              align: 'center',
              headerAlign: 'center',
              showOverflowTooltip: true
            },
            {
              text: '英文姓名',
              value: 'englishName',
              align: 'center',
              headerAlign: 'center',
              showOverflowTooltip: true
            },
            {
              text: '员工ID号',
              value: 'jobNumber',
              minWidth: 100,
              align: 'center',
              headerAlign: 'center',
              showOverflowTooltip: true
            },
            {
              text: '是否操作员',
              value: 'ifOperate',
              minWidth: 100,
              align: 'center',
              headerAlign: 'center',
              showOverflowTooltip: true
            },
            {
              text: '登录手机号',
              value: 'mobilePhone',
              minWidth: 120,
              align: 'center',
              headerAlign: 'center',
              showOverflowTooltip: true
            },
            {
              text: '是否系统管理员',
              minWidth: 120,
              value: 'isAdmin',
              align: 'center',
              headerAlign: 'center',
              showOverflowTooltip: true
            },
            {
              text: '性别',
              value: 'sex',
              align: 'center',
              headerAlign: 'center',
              showOverflowTooltip: true
            },
            {
              text: '民族',
              value: 'nation',
              align: 'center',
              headerAlign: 'center',
              showOverflowTooltip: true
            },
            {
              text: '主岗岗位',
              value: 'mainName',
              minWidth: 200,
              align: 'center',
              headerAlign: 'center',
              showOverflowTooltip: true
            }
          ],
          selectedRows: [],
          personTypeSelectedIdArray: []
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
    created() {
      if (!this.$store) this.$store = $store
      this.getEnumData(['GetValidateStatusData', 'GetEnabledData', 'GetIsOrNotData', 'GetGenderData'])
      this.getGoodslist()
    },
    methods: {
      clickSearchFilter() {
        this.$refs.refBasicSearch.searchFilter(this.$refs.refUserManagerTableData, this.modelSearchFilter, () => {
          this.getGoodslist()
        })
      },
      getGoodslist() {
        this.getUserManagerData()
      },
      clickDefaultExpandAll() {
        if (this.defaultExpandAll) {
          this.defaultExpandAll = false
        } else {
          this.defaultExpandAll = true
        }
        this.getUserManagerData()
      },
      clickRefresh() {
        this.getUserManagerData()
      },
      filterData(data, key, value) {
        return data.filter(item => {
          if (item.children && item.children.length > 0) {
            item.children = this.filterData(item.children, key, value)
          }
          if (item[key] == value) return true
        })
      },
      getUserManagerData() {
        this.tableShow = true
        if (this.filterCheck) this.modelSearchFilter.limit = 1000000
        getUserManagerData(this.modelSearchFilter).then((response) => {
          this.tableShow = false
          if (this.filterValid) {
            response.data.rows = this.filterData(response.data.rows, 'validateStatus', 1)
            response.data.rows = this.filterData(response.data.rows, 'enable', 1)
          }
          response.data.rows = response.data.rows.map(item => {
            const isAdmin = this.dataEnum.isOrNot.filter(result => result.code == item.isAdmin)[0]
            const ifOperate = this.dataEnum.isOrNot.filter(result => result.code == item.isAdmin)[0]
            const sex = this.dataEnum.gender.filter(result => result.code == item.sex)[0]
            item.isAdmin = isAdmin ? isAdmin.name : ''
            item.ifOperate = ifOperate ? ifOperate.name : ''
            item.sex = sex ? sex.name : ''
            return item
          })
          if (this.filterCheck) {
            const filterDatas = this.filterDatas.map(item => item.id)
            response.data.rows = response.data.rows.filter(item => {
              if (filterDatas.includes(item.id)) {
                response.data.total--
                return true
              }
            })
          }
          this.userManager.tableData.data = response.data.rows
          this.userManager.tableData.total = response.data.total
          this.$nextTick(() => {
            if (this.filterCheck && this.isShowChecked) {
              this.$refs.refUserManagerTableData.toggleSelection(this.defaultSelectedRight)
            }
          })
          if (!this.isShowChecked) {
            this.defaultExpandAll = true
            this.$nextTick(() => {
              this.$refs.refUserManagerTableData.setCurrentRow(this.personTypeData[0], true)
            })
          } else {
            if (this.personTypeData && this.personTypeData.length > 0) {
              const personTypeData = this.personTypeData
              this.userManager.personTypeSelectedIdArray = personTypeData.map(row => {
                return row.id
              })
            }
          }
        })
      },
      selectionChangePersonType(selection) {
        this.userManager.selectedRows = selection
        this.$emit('selectionChange', this.userManager)
      },
      currentChangeUserManager(selection) {
        this.userManager.selectedRow = selection
        this.$emit('selectionChange', this.userManager)
      },
      selectablePersonType(row, index) {
        if (this.filterCheck) return 1
        if (row.type != 3 || this.userManager.personTypeSelectedIdArray.includes(row.id)) {
          return 0
        }// 不可勾选
        else {
          return 1
        }// 可勾选
    }
  }
  };
</script>
