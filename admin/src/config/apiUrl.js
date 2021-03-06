//为方便接口Url更该时不要再统一到代码里更改，就把所以的Url写到这个文件中来

let ipUrl = "http://127.0.0.1:7001/admin/";

let servicePath = {
  checkLogin: ipUrl + "checkLogin", //  检查用户名密码是否正确
  getTypeInfo: ipUrl + "getTypeInfo", //获得文章类别信息
  addArticle: ipUrl + "addArticle", //添加文章
  updateArticle: ipUrl + "updateArticle", //修改文章
  getArticleList: ipUrl + "getArticleList", //文章列表
  delArticle: ipUrl + "delArticle/", //删除文章
  getArticleById: ipUrl + "getArticleById/", //根据id获得文章详情
  getToolsList: ipUrl + "getToolsList", //获取工具列表
  delTool: ipUrl + "delTool/", //删除工具
  getToolById: ipUrl + "getToolById/", //根据id获得工具详情
  addTool: ipUrl + "addTool", //添加工具
  updateTool: ipUrl + "updateTool", //修改工具
  getSuggestionsList: ipUrl + "getSuggestionsList", //获取留言列表
  delSuggestion: ipUrl + "delSuggestion/", //删除留言
  OutLogin: ipUrl + "checkOutLogin", //退出登陆，删除session
  CheckAccount: ipUrl + "checkAccount", // 修改密码时给检验旧密码是否正确
  FixAccount: ipUrl + "fixAccount", // 修改密码
};

export default servicePath;
