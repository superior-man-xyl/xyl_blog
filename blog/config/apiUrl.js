//为方便接口Url更该时不要再统一到代码里更改，就把所以的Url写到这个文件中来

let ipUrl='http://127.0.0.1:7001/default/'

let servicePath={
    getArtcleList:ipUrl+'getArtcleList',//首页接口
    getArtcleById:ipUrl+'getArtcleById/', //详细页接口
    getTypeInfo:ipUrl+'getTypeInfo',//文章类别接口
    getListById:ipUrl+'getListById/',//根据类别ID获得文章列表
    getIcon:'//at.alicdn.com/t/font_2524465_mcugscgow7n.js',
}

export default servicePath