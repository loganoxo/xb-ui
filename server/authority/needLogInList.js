/**
* 需要用户登陆后才能操作的接口地址列表
*/
const needLogInList = [
  "/api/user/identity/saveidentity.json",
  "/api/identity-index.json",
  "/api/get-account-balance.json",
  "/api/alitm-bunding.json",
  "/api/get-alitm-info-list.json",
  "/api/alitm-unBunding.json",
  "/api/alitm/resubmit.json",
  "/api/task-create.json",
  "/api/task-list.json",
  "/api/delete-task.json",
  "/api/get-task.json"
];

module.exports = needLogInList;
