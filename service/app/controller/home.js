'use strict';
//这个文件就是用来测试的
const Controller = require('egg').Controller;

class HomeController extends Controller {
  async index() {
    const { ctx } = this;
    ctx.body = 'hi, egg';
  }
  async list(){
    const {ctx}=this;
    ctx.body='<h1>xyl的blog</h1>'
  }
}

module.exports = HomeController;

//使用restful  APP 前后端接口， 其特点是简单和约束性
//请求方式 get 是从服务端获取资源  post是在服务端新建资源  put 更新资源  delete 删除资源

