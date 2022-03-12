"use strict";

const Controller = require("egg").Controller;

class HomeController extends Controller {
  async index() {
    // let result=await this.app.mysql.get("blog_content",{}) //get是获得单条数据，这个blog_content是测试用的，没有了后来
    // console.log(result);//测试是否能读取到数据库
    // this.ctx.body=result;
    this.ctx.body = "api hi";
  }

  async getArtcleList() {
    let sql =
      "SELECT article.id as id," +
      "article.title as title," +
      "article.introduce as introduce," +
      "FROM_UNIXTIME(article.addTime,'%Y-%m-%d %H:%i:%s') as addTime," +
      "article.view_count as view_count," +
      "type.typeName as typeName " +
      "FROM article LEFT JOIN type ON article.type_id = type.Id";

    const results = await this.app.mysql.query(sql);
    this.ctx.body = { data: results };
  }

  async getArtcleById() {
    let id = this.ctx.params.id;
    console.log(id, "+_+_+_+_+");
    let sql =
      "SELECT article.id as id," +
      "article.title as title," +
      "article.introduce as introduce," +
      "article.article_content as article_content," +
      "FROM_UNIXTIME(article.addTime,'%Y-%m-%d %H:%i:%s' ) as addTime," +
      "article.view_count as view_count ," +
      "type.typeName as typeName ," +
      "type.id as typeId " +
      "FROM article LEFT JOIN type ON article.type_id = type.Id " +
      "WHERE article.id=" +
      id;

    const result = await this.app.mysql.query(sql);

    this.ctx.body = { data: result };
  }

  //得到类名和编号

  async getTypeInfo() {
    const result = await this.app.mysql.select("type");
    this.ctx.body = { data: result };
  }

  //根据类别id获得文章列表
  async getListById() {
    let id = this.ctx.params.id;
    let sql =
      "SELECT article.id as id," +
      "article.title as title," +
      "article.introduce as introduce," +
      "FROM_UNIXTIME(article.addTime,'%Y-%m-%d %H:%i:%s' ) as addTime," +
      "article.view_count as view_count ," +
      "type.typeName as typeName " +
      "FROM article LEFT JOIN type ON article.type_id = type.id " +
      "WHERE type_id=" + id;
    const result = await this.app.mysql.query(sql);
    this.ctx.body = { data: result };
  }

  //根据搜索值模糊查询
  async getSearchList() {
    let searchValue = this.ctx.params.searchValue;
    let sql =
      "SELECT article.id as id," +
      "article.title as title," +
      "article.introduce as introduce," +
      "FROM_UNIXTIME(article.addTime,'%Y-%m-%d %H:%i:%s') as addTime," +
      "article.view_count as view_count," +
      "type.typeName as typeName " +
      "FROM article LEFT JOIN type ON article.type_id = type.Id"+
      ` WHERE title LIKE '%${searchValue}%'`;

    const results = await this.app.mysql.query(sql);
    this.ctx.body = { data: results };
  }

  // 获取工具列表
  async getToolsInfo() {
    const result = await this.app.mysql.select("tools");
    this.ctx.body = { data: result };
  }

  //上传评论，待写 
  async addSuggestion() {
    let tmpArticle = this.ctx.request.body;
    const result = await this.app.mysql.insert("article", tmpArticle);
    const insertSuccess = result.affectedRows === 1;
    const insertId = result.insertId;
    this.ctx.body={
        isSuccess:insertSuccess,
        insertId:insertId
    }
  }
}

module.exports = HomeController;

//使用restful  APP 前后端接口， 其特点是简单和约束性
//请求方式 get 是从服务端获取资源  post是在服务端新建资源  put 更新资源  delete 删除资源
