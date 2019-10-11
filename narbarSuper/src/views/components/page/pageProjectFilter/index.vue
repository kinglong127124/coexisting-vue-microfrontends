<template>
  <el-card class="card-container">
    <div slot="header" class="clearfix">
      <span class="title">项目列表</span>
      <el-row class="fr">
        <el-button size="small" icon="el-icon-refresh" @click="clickRefresh" />
      </el-row>
    </div>
    <el-form class="form-card">
      <el-form-item>
        <el-input
          v-model="searchData"
          clearable
          placeholder="请输入关键字"
          size="small"
          @keyup.enter.native.prevent="search(searchData)"
          @clear="search(searchData)"
        >
          <i slot="suffix" class="el-icon-search el-input__icon" />
        </el-input>
      </el-form-item>
      <el-form-item>
        <el-select
          v-model="selectValue"
          class="select"
          multiple
          placeholder="请选择项目阶段"
          size="mini"
          @change="selectChangeValue"
        >
          <el-option
            v-for="item in selectData.data"
            :key="item[selectData.key || 'key']"
            :label="item.name"
            :value="item[selectData.key || 'key']"
            size="mini"
          />
        </el-select>
      </el-form-item>
      <el-form-item class="menu-box">
        <el-menu
          v-if="listData&&listData.length>0"
          ref="menu"
          :default-active="activeSelect"
          size="small"
          @select="contractChange"
        >
          <el-menu-item
            v-for="(item, index) in listData"
            :index="(item.id || index) + ''"
            :key="item.id || index"
            :title="item[data.name || 'name']"
          >
            <span slot="title">{{ item[data.name || 'name'] }}</span>
          </el-menu-item>
        </el-menu>
        <div v-else>
          <el-alert :closable="false" title="暂无项目信息" type="info" center />
        </div>
      </el-form-item>
    </el-form>
  </el-card>
</template>

<script>
import computed from "@/utilsCom/mixins/computed";
import methods from "@/utilsCom/mixins/methods";
import formatEnum from "@/utilsCom/mixins/formatEnum";
import formatBasic from "@/utilsCom/mixins/formatBasic";
import { getDictionaryDataByTypeFilter } from "@/api/common/dataDictionary";
import {
  getProjectAll,
  getProjectAuditedUser
} from "@/api/common/dataBasic";

export default {
  name: "PageProjectFilter",
  props: {
    selectChange: {
      type: Function
    },
    syncSearch: {
      type: Number
    },
    // bpmaProjectAll:施工所有项目 bpmaProjectAudited:施工已审核项目
    // ownerProjectAll:业主所有项目 ownerProjectAudited:业主已审核项目
    // siteProjectAll:施工及业主所有项目 siteProjectAudited:施工及业主已审核项目
    type: {
      type: String,
      default: "bpmaProjectAudited"
    }
  },
  data() {
    return {
      selectValue: [],
      listData: [],
      searchData: "",
      clearTime: null,
      show: false,
      isCreated: true,
      activeSelect: null,
      refresh: false,
      selectData: {
        data: [],
        key: "id",
        name: "name"
      },
      data: {
        name: "name",
        key: "stageId",
        data: []
      },
      modelSearchFilter: {
        page: 1,
        limit: 10000
      },
      excuteAPI: undefined
    };
  },
  computed: {
    listDataAll() {
      return this.data.data;
    }
  },
  watch: {
    listDataAll: {
      handler() {
        this.listData = this.filterData(this.listDataAll, this.selectValue);
        this.activeSelect = this.listData[0]
          ? String(this.listData[0].id)
          : null;
        if (this.isCreated && !this.refresh) {
          this.refresh = false;
          this.contractChange(this.activeSelect);
        }
      },
      deep: true
    },
    selectValue(val) {
      this.$emit("input", val);
      this.selectChangeValue(this.selectValue);
    }
  },
  created() {
    this.getData();
  },
  methods: {
    getData() {
      return new Promise(() => {
        this.getProjectStage();
        this.getProjectData();
      });
    },
    getProjectStage() {
      getDictionaryDataByTypeFilter("SYS_PRO_STAGE")
        .then(res => {
          this.selectData.data = res.data;
          this.selectValue = res.data.map(item => item.id);
          this.listData = this.filterData(this.listDataAll, this.selectValue);
        })
        .catch(err => {
          console.log(err.message);
        });
    },
    getProjectData() {
      // bpmaProjectAll:施工所有项目 bpmaProjectAudited:施工已审核项目
      // ownerProjectAll:业主所有项目 ownerProjectAudited:业主已审核项目
      // siteProjectAll:施工及业主所有项目 siteProjectAudited:施工及业主已审核项目
      switch (this.type) {
        case "bpmaProjectAll": {
          this.modelSearchFilter.extension = 1;
          this.excuteAPI = getProjectAll;
          break;
        }
        case "bpmaProjectAudited": {
          this.modelSearchFilter.extension = 1;
          this.excuteAPI = getProjectAuditedUser;
          break;
        }
        case "ownerProjectAll": {
          this.modelSearchFilter.extension = 2;
          this.excuteAPI = getProjectAll;
          break;
        }
        case "ownerProjectAudited": {
          this.modelSearchFilter.extension = 2;
          this.excuteAPI = getProjectAuditedUser;
          break;
        }
        case "siteProjectAll": {
          this.excuteAPI = getProjectAll;
          break;
        }
        case "siteProjectAudited": {
          this.modelSearchFilter.extension = "1,2";
          this.excuteAPI = getProjectAuditedUser;
          break;
        }
        default:
          this.modelSearchFilter.extension = 1;
          this.excuteAPI = getProjectAuditedUser;
      }
      this.excuteAPI(this.modelSearchFilter)
        .then(res => {
          this.data.data = res.data.rows;
        })
        .catch(err => {
          console.log(err.message);
        });
    },
    clickRefresh() {
      this.refresh = true;
      this.searchData = "";
      this.getProjectData();
    },
    async selectChangeValue(value) {
      this.show = true;
      this.searchData = "";
      if (typeof this.selectChange == "function") {
        await new Promise((reslove, reject) => {
          this.selectChange(value, reslove);
        });
      }
      const data = this.filterData(this.listDataAll, value);
      this.changeListData(data);
    },
    filterData(data, key, type = true) {
      // if (key === this.selectData.defaultSelect) return data
      return data.filter(item => {
        const value = item[this.data.key || "key"];
        if (type) {
          return key.includes(value);
        } else {
          return !key.includes(value);
        }
      });
    },
    contractChange(index) {
      const data = this.listData.filter(item => item.id == index)[0];
      try {
        // if(!data) return
        this.$emit("change", data);
      } catch (err) {}
      return index;
    },
    async search(value) {
      this.show = true;
      if (typeof this.searchChange == "function") {
        await new Promise((reslove, reject) => {
          this.searchChange(value, reslove);
        });
      }
      let data = this.keyFilterData(this.listDataAll, value);
      data = this.filterData(data, this.selectValue);
      this.changeListData(data);
    },
    keyFilterData(data, value) {
      const len = value.length;
      const regexp = [];
      for (let i = 0; i < len; i++) {
        regexp.push(new RegExp(value[i], "img"));
      }
      return data.filter(item => {
        let lastIndex = 0;
        return regexp.every(result => {
          result.lastIndex = lastIndex;
          const rel = result.test(item[data.name || "name"]);
          lastIndex = result.lastIndex;
          return rel;
        });
      });
    },
    searchInput() {
      if (this.syncSearch != null) {
        clearTimeout(this.clearTime);
        this.clearTime = setTimeout(() => {
          this.search(this.searchData);
        }, this.syncSearch);
      }
    },
    changeListData(data) {
      this.show = false;
      this.activeSelect = data[0] ? String(data[0].id) : null;
      this.listData = data;
      return this.contractChange(this.activeSelect);
    }
  }
};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.el-card.card-container {
  border: none;
  border-radius: 0;
  height: 100%;
  display: flex;
  flex-direction: column;
  background-color: transparent;
  /deep/ .el-card__header {
    span.title {
      color: #409eff;
      font-size: 14px;
    }
    .el-row {
      .el-button {
        border-width: 0;
        background-color: transparent;
      }
      .el-button--small,
      .el-button--small.is-round {
        height: 14px;
        margin: -10px;
      }
      [class*="el-icon-"],
      [class^="el-icon-"] {
        font-size: 18px;
      }
    }
  }
  /deep/ .el-card__body {
    padding: 5px 0 0 0;
    flex: 1;
    display: flex;
    flex-direction: column;
    background-color: #f3f6fa;
    .el-menu {
      border-right-width: 0;
      .el-menu-item,
      .el-submenu__title {
        height: 38px;
        line-height: 38px;
      }
      .el-menu-item {
        padding-left: 10px !important;
        padding-right: 10px !important;
        border-bottom: 1px solid #dcdfe6;
        color: #454e67;
        background-color: #f3f6fa;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
      .el-menu-item:focus,
      .el-menu-item:hover {
        color: #409eff;
      }
      .el-menu-item.is-active {
        color: #409eff;
        background-color: #c8dcff;
      }
    }
    .el-form.form-card {
      height: 100%;
      display: flex;
      flex-direction: column;
      .menu-box {
        flex: 1;
        overflow: auto;
      }
    }
  }
}
</style>
