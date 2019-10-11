import Vue from 'vue';

// Flattened array
export default function treeToArray(data, children = 'children') {
  let tmp = [];
  data.forEach((item, index) => {
    Vue.set(item, 'tree_index', index);
    tmp.push(item);
    if (item[children] && item[children].length > 0 && item.tree_expand) {
      const res = treeToArray(item[children], children);
      tmp = tmp.concat(res);
    }
  });
  return tmp;
}

export function addAttrs(data, { parent = null, preIndex = false, treeCode = '', level = 1, expand = false, children = 'children', show = true, select = false } = {}) {
  data.forEach((item, index) => {
    const tree_id = (preIndex ? `${preIndex}-${index}` : index) + '';
    Vue.set(item, 'tree_id', tree_id);
    Vue.set(item, 'treeId', tree_id);// 保存到后端
    const tree_code = (treeCode ? `${treeCode}` + (index < 9 ? '0' + (index + 1 + '') : (index + 1 + '')) : (index < 9 ? '0' + (index + 1 + '') : (index + 1 + ''))) + '';
    Vue.set(item, 'tree_code', tree_code);
    if (item.tree_expand == undefined) {
      Vue.set(item, 'tree_expand', expand);
    }
    Vue.set(item, 'tree_level', level);
    // 如果有父元素
    if (parent) {
      Vue.set(item, 'tree_parent', parent);
    }
    Vue.set(item, 'tree_show', false);
    Vue.set(item, 'tree_select', select);
    Vue.set(item, 'persistStatus', 'nrm');
    if (item.tree_visible == undefined) {
      Vue.set(item, 'tree_visible', true);
    }
    if (item[children] && item[children].length > 0) {
      addAttrs(item[children], {
        parent: item,
        level: level + 1,
        expand,
        preIndex: tree_id,
        treeCode: tree_code,
        children,
        status,
        select
      });
      Vue.set(item, 'tree_leaf', false);
    } else {
      Vue.set(item, 'tree_leaf', true);
    }
  });
}

export function cleanParentAttr(data, children = 'children') {
  data.forEach(item => {
    item.tree_parent = null;
    if (item[children] && item[children].length > 0) {
      addAttrs(item[children], children);
    }
  });
  return data;
}
