# xyl_blog
我的个人技术博客

npm i egg-init -g     安装脚手架工具  
egg-init --type=simple     使用脚手架工具生成项目基本结构

存在一个问题：(restful规范)中台数据接口怎么传id值，前台怎么获取url中id值，怎么传值，各种情况，看看egg和nextjs

# egg连接mysql
使用egg-mysql，使用命令yarn add egg-mysql安装

配置文件 config/plugin里配置使用外部模块egg-mysql（eggjs要使用外部模块都要在这个plugin文件里进行配置）

在config/config.default.js里配置连接数据库，在npm里搜索egg-mysql来获取配置方法

# Restful规范
[规范介绍](https://restfulapi.cn/)

[JWT](https://zhuanlan.zhihu.com/p/158186278?from_voters_page=true)

# axios请求数据
[axios请求的方式方法](http://axios-js.com/zh-cn/docs/)

# sessionid作登陆的原理


# 项目整改和添加功能(需求细分)
- ~~做一个基于sql的简易搜索(要做一个搜索结果的列表页)~~ 1
- ~~联系方式展现优化，包括掘金和github的提升点击跳转主页（使用气泡确认框），以及微信展示二维码加好友~~ 0.5 
- ~~添加工具导航页（一些前端常用工具）~~,~~包括后台上传页面~~ 0.5
- ~~建议页，每个详情页的下端或者弹窗（使用提及组件mention），并且带上id以分辨文章(这样就指定了相关文章)，这里可以给站主留言，我再从后台看到留言(带有相关文章信息
)~~ 1.5
- ~~添加管理员密码更改功能~~

项目基本完成，剩余下面bug未解决
- ~~前台和后台的UI优化，做好UI优化和构图层次会好很多~~  1 
- ~~完善博客观看人数的数据统计功能~~和~~分类bug~~ ,~~以及面包屑导航bug~~ + 修改admin工具无法显示默认内容的bug + 后台session问题 0.5
