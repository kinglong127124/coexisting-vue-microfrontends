const getters = {
  sidebar: state => state.app.sidebar,
  language: state => state.app.language,
  size: state => state.app.size,
  device: state => state.app.device,
  visitedViews: state => state.tagsView.visitedViews,
  cachedViews: state => state.tagsView.cachedViews,
  token: state => state.user.token,
  avatar: state => state.user.avatar,
  username: state => state.user.username,
  introduction: state => state.user.introduction,
  status: state => state.user.status,
  roles: state => state.user.roles,
  setting: state => state.user.setting,
  permissionMenus: state => state.user.permissionMenus,
  addRouters: state => state.permission.addRouters,
  errorLogs: state => state.errorLog.logs,
  rootMenus: state => state.layout.rootMenus,
  childrenMenus: state => state.layout.childrenMenus,
  rootMenusSelected: state => state.layout.rootMenusSelected
};
export default getters;
