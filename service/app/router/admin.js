//后台使用的路由
module.exports=app=>{
    const {router,controller}=app
    var adminauth=app.middleware.adminauth();//设置路由守卫中间件
    router.get('/admin/index',controller.admin.main.index)
    router.post('/admin/checkLogin',controller.admin.main.checkLogin)
    router.get('/admin/getTypeInfo',adminauth,controller.admin.main.getTypeInfo)//在这里使用了中间件
}