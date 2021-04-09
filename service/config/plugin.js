'use strict';

/** @type Egg.EggPlugin */
// module.exports = {
//   // had enabled by egg
//   // static: {
//   //   enable: true,
//   // }
// };
//egg.js要求我们对于外部模块在plugin.js中进行配置
exports.mysql={
  enable:true,
  package:'egg-mysql'//通过这个配置，来支持mysql的连接和使用
}
