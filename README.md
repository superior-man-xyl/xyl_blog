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