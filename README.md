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
- 做一个基于sql的简易搜索(要做一个搜索结果的列表页)，详情页做个复制链接分享的功能和点赞的功能 1
- 添加工具导航页（一些前端常用工具）0.5
- 联系方式展现优化，包括掘金和思否github的提升点击跳转主页，以及QQ微信展示二维码加好友 0.5 
- 书籍推荐页，包括详情页（用于做一个介绍和电子书分享），配套前台展示列表和后台上传及展示 1.5
- 建议页，每个详情页都可以跳转过去，并且带上id以分辨文章(这样就指定了相关文章)，这里可以给站主留言，我再从后台看到留言（带有相关文章信息）1.5
- 前台和后台的UI优化，做好UI优化和构图层次会好很多  1
- 完善博客观看人数的数据统计功能 0.5
- 优化下视频区，做成两部分，学习视频推荐和视频展示两块，看看怎么做视频播放，或者就是简单引下 1.5