'use strict';

const Controller = require('egg').Controller;

class HomeController extends Controller {
  async index() {
    let result=await this.app.mysql.get("blog_content",{})
    console.log(result);
    this.ctx.body=result;
  }
}

module.exports = HomeController;

//使用restful  APP 前后端接口， 其特点是简单和约束性
//请求方式 get 是从服务端获取资源  post是在服务端新建资源  put 更新资源  delete 删除资源

