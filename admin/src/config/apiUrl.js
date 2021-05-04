//为方便接口Url更该时不要再统一到代码里更改，就把所以的Url写到这个文件中来

let ipUrl='http://127.0.0.1:7001/admin/'

let servicePath={
    checkLogin:ipUrl + 'checkLogin' ,  //  检查用户名密码是否正确
    getTypeInfo:ipUrl+'getTypeInfo', //获得文章类别信息
    addArticle:ipUrl+'addArticle',  //添加文章
    updateArticle:ipUrl+'updateArticle',  //修改文章
}

export default servicePath