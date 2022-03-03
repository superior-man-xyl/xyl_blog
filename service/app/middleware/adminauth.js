//设置一个中台路由守卫,主要是防止未登录用户，访问登陆页以外的页面
module.exports = (options) => {
  return async function adminauth(ctx, next) {
    console.log(this.ctx.session.openId, '路由守卫+++++++++++',ctx);
    if (ctx.session.openId) {
      //看是否又sessionId来判断是否用户登陆
      await next();
    } else {
      ctx.body = { data: "没有登陆" };
    }
  };
};
