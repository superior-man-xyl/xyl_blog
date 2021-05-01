//前台
module.exports=app=>{
    const {router,controller}=app;
    router.get('/default/index',controller.default.home.index);//表示访问的是controller下的模块的home的index方法
    router.get('/default/getArtcleList',controller.default.home.getArtcleList);
    router.get('/default/getArtcleById',controller.default.home.getArtcleById);
}