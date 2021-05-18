//为方便接口Url更该时不要再统一到代码里更改，就把所以的Url写到这个文件中来

let ipUrl='http://127.0.0.1:7001/admin/'

let servicePath={
    checkLogin:ipUrl + 'checkLogin' ,  //  检查用户名密码是否正确
    getTypeInfo:ipUrl+'getTypeInfo', //获得文章类别信息
    addArticle:ipUrl+'addArticle',  //添加文章
    updateArticle:ipUrl+'updateArticle',  //修改文章
    getArticleList:ipUrl+'getArticleList', //文章列表
    delArticle:ipUrl+'delArticle/', //删除文章
    getArticleById:ipUrl+'getArticleById/',  //根据id获得文章详情
    OutLogin:ipUrl+'checkOutLogin',//退出登陆，删除session
}

export default servicePath