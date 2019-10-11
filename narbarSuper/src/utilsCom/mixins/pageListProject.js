/**
 * 公共混合类：项目列表
 */
import computed from '@/utilsCom/mixins/computed';
import methods from '@/utilsCom/mixins/methods';
import formatBasic from '@/utilsCom/mixins/formatBasic';
import formatEnum from '@/utilsCom/mixins/formatEnum';
import api from '@/api/common';

export default {
  name: 'OutTheFrontIndex',
  mixins: [computed, methods, formatBasic, formatEnum],
  data() {
    return {
      basicHandler: {},
      basicTable: {
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
      },
      pageInfo: {}
    };
  },
  activated() {
    this.getPage();
  },
  computed: {
    disabledView: function() {
      if (this.basicTable.currentRow) {
        return false;
      } else {
        return true;
      }
    }
  },
  created() {
    const productAlias = this.$route.fullPath.split('/')[1].substring(0, this.$route.name.length - 7);
    const { name } = this.$route;
    this.$set(this.pageInfo, 'productAlias', productAlias);
    this.$set(this.pageInfo, 'pageCode', name);
    this.$set(this.pageInfo, 'pageName', this.$route.meta.title);
    this.$set(this.basicHandler, 'routerNameAdd', name + 'Detail');
    this.$set(this.basicHandler, 'routerNameView', name + 'Detail');
  },
  methods: {
    // 查询左边
    getPage() {
      if (!this.basicTable.modelSearchFilter.proId) return false;// 项目Id为空时返回
      api.static.getPage({ ...this.pageInfo, field: { ...this.basicTable.modelSearchFilter }}).then(response => {
        if (response.status == 200) {
          this.basicTable.tableData.data = response.data.rows;
          this.basicTable.tableData.total = response.data.total;
          if (this.basicTable.tableData.total) {
            this.$nextTick(function() {
              if (this.$refs.refBasicTable) {
                this.$refs.refBasicTable.setCurrentRow(this.basicTable.tableData.data[0]);
              }
            });
          }
        }
      });
    },
    currentChangeRow(row) {
      if (row) {
        this.basicTable.currentRow = row;
      }
    }
  }
};
