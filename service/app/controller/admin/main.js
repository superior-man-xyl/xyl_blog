"use strict";

const Controller = require("egg").Controller;

class MainController extends Controller {
  async index() {
    //index方法
    this.ctx.body = "<h1 style='text-align: center;  font-size: 10vw'>hi xyl_blog's api</h1>"; // 只是为了只输入网址不出现404
  }

  async checkLogin() {
    let userName = this.ctx.request.body.userName;
    let password = this.ctx.request.body.password;
    console.log(userName, "+++++", password);
    const sql =
      " SELECT userName FROM admin_user WHERE userName = '" +
      userName +
      "' AND password = '" +
      password +
      "'";
    console.log(sql);
    const res = await this.app.mysql.query(sql);
    if (res.length > 0) {
      //表示找到数据，就登陆成功了
      //登录成功,进行session缓存
      let openId = new Date().getTime();
      this.ctx.session.openId = { openId: openId };
      console.log(this.ctx.session.openId, '登陆成功');
      this.ctx.body = { data: "登录成功", openId: openId };
    } else {
      this.ctx.body = { data: "登录失败" };
    }
  }

  async checkOutLogin(){
    this.ctx.session=null;
    this.ctx.body={data:"已退出登陆"}
  }

  async getTypeInfo() {
    const resType = await this.app.mysql.select("type");
    this.ctx.body = { data: resType };
  }

  async addArticle() {
    let tmpArticle = this.ctx.request.body;
    const result = await this.app.mysql.insert("article", tmpArticle);
    const insertSuccess = result.affectedRows === 1;
    const insertId = result.insertId;
    this.ctx.body={
        isSuccess:insertSuccess,
        insertId:insertId
    }
  }

  //修改文章内容
  async updateArticle(){
      let tempArticle=this.ctx.request.body
      const result=await this.app.mysql.update('article',tempArticle)
      const updateSuccess=result.affectedRows===1
      this.ctx.body={
          isSuccess:updateSuccess
      }
  }

  async getArticleList(){//获取列表
    let sql = 'SELECT article.id as id,'+
                'article.title as title,'+
                'article.introduce as introduce,'+
                'article.view_count as view_count,'+
                "FROM_UNIXTIME(article.addTime,'%Y-%m-%d' ) as addTime,"+
                'type.typeName as typeName '+
                'FROM article LEFT JOIN type ON article.type_id = type.Id '+
                'ORDER BY article.id DESC '
    const resList = await this.app.mysql.query(sql);
    this.ctx.body={list:resList}
  }

  async delArticle(){
    let id=this.ctx.params.id
    const res=await this.app.mysql.delete('article',{'id':id})
    this.ctx.body={data:res}
  }

  async getArticleById(){
    let id=this.ctx.params.id
    let sql = 'SELECT article.id as id,'+
    'article.title as title,'+
    'article.introduce as introduce,'+
    'article.article_content as article_content,'+
    "FROM_UNIXTIME(article.addTime,'%Y-%m-%d' ) as addTime,"+
    'article.view_count as view_count ,'+
    'type.typeName as typeName ,'+
    'type.id as typeId '+
    'FROM article LEFT JOIN type ON article.type_id = type.Id '+
    'WHERE article.id='+id
    const result =await this.app.mysql.query(sql)
    this.ctx.body={data:result}
  }

  async getToolsList() {
    const resType = await this.app.mysql.select("tools");
    this.ctx.body = { data: resType };
  }

  async getToolById(){ 
    let id=this.ctx.params.id
    console.log(id,'---------获取工具id');
    const result =await this.app.mysql.get('tools', { 'id': id });
    this.ctx.body={data:result}
  }

  async addTool() {
    let tmpTool = this.ctx.request.body;
    const result = await this.app.mysql.insert("tools", tmpTool);
    const insertSuccess = result.affectedRows === 1;
    const insertId = result.insertId;
    this.ctx.body={
        isSuccess:insertSuccess,
        insertId:insertId
    }
  }

  //修改工具内容
  async updateTool(){
    let tempTool=this.ctx.request.body
    const result=await this.app.mysql.update('tools',tempTool)
    const updateSuccess=result.affectedRows===1
    this.ctx.body={
        isSuccess:updateSuccess
    }
}

  async delTool(){
    let id=this.ctx.params.id
    const res=await this.app.mysql.delete('tools',{'id':id})
    this.ctx.body={data:res}
  }

  async getSuggestionsList() { // 获取留言列表
    const resType = await this.app.mysql.select("suggestion");
    this.ctx.body = { data: resType };
  }

  async delSuggestion(){ //删除某些留言
    let id=this.ctx.params.id
    const res=await this.app.mysql.delete('suggestion',{'id':id})
    this.ctx.body={data:res}
  }

}

module.exports = MainController;
