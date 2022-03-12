//后台使用的路由
module.exports=app=>{
    const {router,controller} = app;
    var adminauth = app.middleware.adminauth();//设置路由守卫中间件
    router.get('/admin/index', controller.admin.main.index)
    router.post('/admin/checkLogin', controller.admin.main.checkLogin)
    router.get('/admin/getTypeInfo', adminauth, controller.admin.main.getTypeInfo)//在这里使用了中间件
    router.post('/admin/addArticle', adminauth, controller.admin.main.addArticle)//添加文章的接口
    router.post('/admin/updateArticle', adminauth, controller.admin.main.updateArticle)//修改文章的接口
    router.get('/admin/getArticleList', adminauth, controller.admin.main.getArticleList)
    router.get('/admin/delArticle/:id', adminauth, controller.admin.main.delArticle)
    router.get('/admin/getArticleById/:id', adminauth, controller.admin.main.getArticleById)
    router.post('/admin/addTool', adminauth, controller.admin.main.addTool)//添加工具的接口
    router.post('/admin/updateTool', adminauth, controller.admin.main.updateTool)//修改工具的接口
    router.get('/admin/getToolsList', adminauth, controller.admin.main.getToolsList)
    router.get('/admin/delTool/:id', adminauth, controller.admin.main.delTool)
    router.get('/admin/getToolById/:id', adminauth, controller.admin.main.getToolById)
    router.get('/admin/getSuggestionsList', adminauth, controller.admin.main.getSuggestionsList)
    router.get('/admin/delSuggestion/:id', adminauth, controller.admin.main.delSuggestion)
    router.get('/admin/checkOutLogin', controller.admin.main.checkOutLogin)
}