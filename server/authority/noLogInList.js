/**
* 需要用户登陆后才能操作的接口地址列表
*/
const noLogInList = [
  "/api/ali-token.json",//阿里云临时token
  "/api/login.json",//登录
  "/api/check-fast-sign-in.json",//快速登陆
  "/api/sign-up.json",//注册
  "/api/sign-out.json",//退出登录
  "/api/vrcode.json",//生成图形验证码
  "/api/send-verify-code.json",//发送手机验证码
  "/api/task/search/item/catalog/main.json",//首页导航
  "/api/task/search/index/newest.json",//首页分类展示
  "/api/task/get/item/catalog/parent.json"//分类页面
];

module.exports = noLogInList;
