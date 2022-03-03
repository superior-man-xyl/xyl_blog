'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  // const { router, controller } = app; // 已经在default.js and admin.js里进行里解构赋值，所以这个文件就只需要引入就好了
  // router.get('/', controller.home.index);
  // router.get('/list', controller.home.list); // 后面home.js没用就删除了
  ////////////////////////
   const { router, controller } = app; 
  router.get('/', controller.admin.main.index);// 这里我是写来为了输入网址有个 hi api而已（因为admin/main.js的index里为ctx.body赋值了），可以直接删除
  //////////////////////////////
  //因为只用做接口api，所以上面的页面路由就没用了
  require('./router/default')(app);

  require('./router/admin')(app);
};
