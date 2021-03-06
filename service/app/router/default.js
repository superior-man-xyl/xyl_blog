//前台使用的路由
module.exports = (app) => {
  const { router, controller } = app;
  router.get("/default/index", controller.default.home.index); //表示访问的是controller下的模块的home的index方法
  router.get("/default/getArtcleList", controller.default.home.getArtcleList);
  router.get(
    "/default/getArtcleById/:id",
    controller.default.home.getArtcleById
  );
  router.get("/default/getTypeInfo", controller.default.home.getTypeInfo);
  router.get("/default/getListById/:id", controller.default.home.getListById);
  router.get("/default/getSearchList/:searchValue", controller.default.home.getSearchList);
  router.get("/default/getToolsInfo", controller.default.home.getToolsInfo);
  router.post("/default/addSuggestion", controller.default.home.addSuggestion);
  router.get("/default/addViewCount/:id", controller.default.home.addViewCount);
};
