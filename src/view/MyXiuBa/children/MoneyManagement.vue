<template>
  <div class="personal-box">
    <div class="title">资金管理</div>
    <div class="personal-sel-top mt-20">
      <a v-for="(myInfoSelect,index) in myInfoSelects" :class="{active:infoSelect === myInfoSelect.isSelect}"
         @click="accountInit(myInfoSelect.isSelect)">{{myInfoSelect.text}}</a>
    </div>
    <div class="my-count mt-10" v-show="infoSelect === 'account'">
      <div class="my-money clear" >
        <div class="my-money-left left">
          <div class="moneyInfoLeft left">
            <div>可用余额（元）</div>
            <div class="number mt-5 ">{{userAccount.accountBalance/100 || 0}}</div>
            <p>收入金额（元）：{{userAccount.amountIncomes/100||0}}</p>
            <p>支出金额（元）：{{userAccount.amountPayment/100||0}}</p>
            <div class="view-details mt-10">
              <a href="javascript:;" @click="accountInit('pay')">我要充值</a>
              <router-link to="/user/personal-setting">查看明细</router-link >
            </div>
          </div>
          <div class="moneyInfoRight right">
            <div>提现金额（元）</div>
            <div class="number mt-5 ">{{userAccount.enChashingMoney/100||0}}</div>
            <div class="clear">
              <span class="sp left">提现帐号：{{getIfBandingBankCard(userList.ifBandingBankCard)}}</span>
              <a href="javascript:;" class="sa right" v-show="userList.ifBandingBankCard === null">添加</a>
            </div>
            <div class="view-details ">
              <a href="javascript:;" @click="accountInit('pay')">我要充值</a>
              <router-link to="/user/personal-setting">查看明细</router-link >
            </div>
          </div>
        </div>
        <div class="my-money-right  right">
          <div>账户名：{{userList.phone}}</div>
          <div>真实姓名：{{userList.realName}}</div>
          <div>
            <span>实名认证：{{geIifCertification(userList.ifCertification)}}</span>&nbsp;&nbsp;&nbsp;&nbsp;<router-link to="/user/personal-setting" v-show="userList.ifCertification===false">去认证</router-link>
          </div>
          <div>绑定手机：{{userList.phone}}</div>
          <div>注册时间：{{userList.createTime | dateFormat('YYYY-MM-DD hh:mm:ss')}}</div>
          <p>上次登录时间：{{userList.lastLoginTime | dateFormat('YYYY-MM-DD hh:mm:ss')}}</p>
        </div>
      </div>
      <div class="trading-record ">
        <ul class="clear">
          <li>最近交易记录</li>
          <li><a href="javascript:;" @click="getTradList(null)">全部</a></li>
          <li><a href="javascript:;" @click="getTradList(0)">充值记录</a></li>
          <li><a href="javascript:;" @click="getTradList(1)">提现记录</a></li>
          <li><a href="javascript:;" @click="getTradList(2)">活动记录</a></li>
          <li><a href="javascript:;" @click="getTradList(3)">其它</a></li>
        </ul>
      </div>
      <div class="personal-list-table mt-10">
        <table class="list-table">
          <thead>
          <tr>
            <th style="width: 20%">交易时间</th>
            <th style="width: 40%">交易类型</th>
            <th style="width: 20%">交易金额（元）</th>
            <th style="width: 20%">操作</th>
          </tr>
          </thead>
          <tbody v-for="(item,index) in myTableDetails" >
          <tr>
            <td>
              <p>{{item.createTime | dateFormat('YYYY-MM-DD ')}}</p>
              <p>{{item.createTime | dateFormat('hh:mm:ss ')}}</p>
            </td>
            <td>
              <p>{{item.changeName}}</p>
              <p>活动编号：{{item.cAmount}}</p>
            </td>
            <td class="main-color">{{item.amountChange/100||0}}</td>
            <td>
              <p style="color:blue;" class="details" @click="detailsInit(item.id)">详情</p>
            </td>
          </tr>
          <tr v-show="detailSelect===item.id">
            <td colspan="4" style="padding: 0px;">
              <table class="small-table" style="background-color: #f9f9f9;">
                <thead>
                <tr>
                  <th style="width:20%;">交易时间</th>
                  <th style="width:30%;">流水号</th>
                  <th style="width:30%;">交易明细</th>
                  <th style="width:10%;">交易金额（元）</th>
                </tr>
                </thead>
                <tbody>
                <tr v-for="(item,index) in userListDetails">
                  <td>
                    <p>{{item.tradTime | dateFormat('YYYY-MM-DD ')}}</p>
                    <p>{{item.tradTime | dateFormat('hh:mm:ss ')}}</p>
                  </td>
                  <td>
                    {{item.serialNumber}}
                  </td>
                  <td>
                    <p>{{getTradType(item.tradName)}}</p>
                    <p>活动编号：11113244325324</p>
                  </td>
                  <td>
                   {{item.tradAmount/100||0}}
                  </td>
                </tr>
                <tr v-show="showNotice"><td colspan="4" style="color:red;font-size: 14px;">暂无数据！</td></tr>
                </tbody>
              </table>
            </td>
          </tr>
          </tbody>
          <tbody>
            <tr v-show="showBigNotice"><td colspan="4" style="color: red;font-size: 14px" >暂无数据！</td></tr>
          </tbody>
        </table>
      </div>
      <div class="get-more">
        <a href="javascript:;" @click="accountInit('jiaoYiJiLu')">查看所有交易记录</a>
      </div>
      <div class="common-question">
        <h2>常见问题</h2>
        <div class="mt-10">
          <h3>充值多久后到账？</h3>
          <p>充值成功后，如果账户显示的余额不变，请您不要惊慌，我们的系统是有缓冲时间的，您只需要耐心稍等即可。</p>
        </div>
        <div class="mt-10">
          <h3>提现需要注意的事项？</h3>
          <p>1、一次提现的金额限额（最大金额）是20000元；</p>
          <p>2、每日提现次数不超过三次，每日的时间节点为今日凌晨零点到次日凌晨零点；</p>
          <p>3、按提现金额收取1%/笔的手续费，每笔手续费最低2元，最高30元；</p>
        </div>
        <div class="mt-10">
          <h3>提现多久后到账？</h3>
          <p> 提现申请提交后，工作人员会在1-2个工作日内为您办理提现手续（遇节假日或其它特殊情况，以网站公告的具体处理时限为准），工作日<br/>
            不包括星期六和星期日，银行卡提现可能会因为跨行转账导致到账时间有所延迟。
          </p>
          <p>注：工作日怎么计算呢？举个例子来说，如果您星期五提交的提现申请，从星期一开始计算，星期一算是1个工作日，星期二算是2个工作<br/>
            日，会在星期二24：00前处理，当然啦，如果遇到节假日，那节假日是不算在工作日里的</p>
        </div>
      </div>
    </div>
    <div class="my-pay" v-show="infoSelect === 'pay'">
      <div  class="clear my-pay-top">
        <span class="left">当前可用余额<span style="color:red ">{{getUserBalance}}</span>元</span>
        <span class="right cursor-p" style="color: blue;">查看充值记录</span>
      </div>
      <div class="my-pay-desc">
        <iForm :model="payMoney" :label-width="200" :rules="payMoneyRule">
          <Form-item label="请输入充值金额:" prop="number">
            <iInput v-model="payMoney.number"  style="width: 200px"></iInput>
            <span class="ml-10">元(最低1元起充)</span>
          </Form-item>
          <Form-item label="请选择支付方式:" prop="payMode">
            <Radio-group v-model.number="payMoney.payMode">
              <Radio label="ali">
                <img src="~assets/img/task-release/zfb_logo.png" alt="支付宝" class="vtc-mid">
              </Radio>
              <Radio label="weiXin">
                <img src="~assets/img/task-release/wechat_logo.png" class="vtc-mid">
              </Radio>
            </Radio-group>
          </Form-item>
          <Form-item>
            <iButton type="primary" style="width: 100px">提交</iButton>
          </Form-item>
        </iForm>
      </div>
      <div class="common-question">
        <h2>常见问题</h2>
        <div class="mt-10">
          <h3>1、充值多久后到账？</h3>
          <p>答：充值成功后，如果账户显示的余额不变，请您不要惊慌，我们的系统是有缓冲时间的，您只需要耐心稍等即可。</p>
        </div>
      </div>
    </div>
    <div class="my-getoutmoney" v-show="infoSelect === 'getOut'">
      <div class="not-certification" v-show="changeBankIDcardShow.iScertification">
        <h2><Icon type="close-circled" class="mr-10 vtc-mid icon"></Icon>很抱歉，您未进行实名认证，无法提现</h2>
        <div class="how-todo"><span>你现在可以：</span><router-link to="/user/personal-setting" class="ml-10">立即申请实名认证</router-link ><span class="ml-10 mr-10">|</span><a class="ml-10">查看如何进行实名认证</a> </div>
      </div>
      <div class="bound-bankcard" v-show="changeBankIDcardShow.iSbondBankCard">
        <div class="bankcard-title"><Icon class="icon vtc-btm" type="information-circled" ></Icon><span class="ml-10">请先绑定银行卡，再进行提现操作</span></div>
        <div class="addcard" @click="addBankCard">
          <Icon class="icon" type="plus-circled"></Icon>
          <p class="mt-10">添加银行卡</p>
        </div>
      </div>
      <div class="add-bankcard" v-show="true">
          <div class="title">
            <Icon type="information-circled" class="icon ml-20 over-hd"></Icon><span class="ml-56">每个用户只能绑定一张银行卡，如需换卡建议修改银行卡信息</span>
          </div>
          <div class="ipt-information">
            <iForm :model="formItem" :label-width="200" :rules="formRuleItem">
              <Form-item label="开户人姓名:" prop="name">
                <iInput v-model="formItem.name" ></iInput>
              </Form-item>
              <Form-item label="选择银行" prop="select">
                <iSelect v-model="formItem.select" style="width:300px;height: 32px">
                  <iOption  value="中国建设银行" >中国建设银行</iOption>
                  <iOption  value="中国工商银行" >中国工商银行</iOption>
                  <iOption  value="中国农业银行" >中国农业银行</iOption>
                  <iOption  value="中国招商银行" >中国招商银行</iOption>
                </iSelect>
              </Form-item>
              <Form-item label="银行卡号:" prop="bankNumber">
                <iInput v-model="formItem.bankNumber" ></iInput>
              </Form-item>
              <Form-item label="开户支行:" prop="bankBranch">
                <iInput v-model="formItem.bankBranch" ></iInput>
              </Form-item>
              <Form-item label="手机号:"  prop="phone">
                <iInput v-model="formItem.phone"  ></iInput>
              </Form-item>
              <Form-item label="图形验证码:" class="formPosition" prop="validateCode" style="width: 380px">
                <iInput v-model="formItem.validateCode" ></iInput>
                <div style="width: 100px; " class="ibtn">
                  <img :src="imgSrc" width="100%" alt="" @click="getVrcode">
                </div>
              </Form-item>
              <Form-item label="短信验证码:" class="formPosition" prop="cord" style="width: 380px">
                <iInput v-model="formItem.cord"  class="formiInput "></iInput>
                <SmsCountdown :on-success="sendCodeSuccess" style="top: 2px; right: -112px"
                              :phone="formItem.phone"
                              :purpose="formItem.purpose"
                              :validateCode="formItem.validateCode"
                >
                </SmsCountdown>
              </Form-item>
              <Form-item>
                <iButton type="primary" @click=" addBankCardInfo(formItem),closable">提交</iButton>
                <iButton type="ghost" style="margin-left: 8px">取消</iButton>
              </Form-item>
            </iForm>
          </div>
      </div>
      <div class="get-out-number" v-show="true">
        <div  class="clear title">
          <span class="left">当前可用余额<span style="color:red ">{{getUserBalance}}</span>元</span>
          <span class="right cursor-p" style="color: blue;" @click="lookGetoutRecord('getoutRecord')">查看提现记录</span>
        </div>
        <div class="content">
          <div class="warning">
            <Icon type="information-circled" class="icon ml-20 over-hd"></Icon><span class="ml-56">当日12:00-当日18:00间申请提现的，在当日18:00处理，当日18:00-次日12:00间申请提现的，在次日12:00处理</span>
          </div>
          <div class="get-out-do mt-40" >
            请输入提现金额：<iInput v-model="getoutMoney.number" class="iInput" ></iInput>&nbsp;元（最低1元起提）
            <p class="mt-22">&nbsp;&nbsp;&nbsp;提现银行卡号：&nbsp;6227002451721185124</p>
            <p  class="mt-22 psw">支付密码：<iInput v-model="getoutMoney.password" type="password" class="iInput" >
             </iInput><span class="ml-10" @click="accountInit('accountInfo'),myAccountPwdChangeFather('modifyPwd')">重置支付密码</span>
            </p>
            <iButton type="primary" @click="modal2 = true" class="mt-22  ibtns">申请提现</iButton>
            <Modal
              v-model="modal2"
              :styles="{top:'168px',width:'580px'}"
              title="">
              <p style="text-align: center;font-size: 40px;color: red"><Icon type="checkmark-circled"></Icon></p>
              <p class="mt-10 text-ct fs-14">提现申请成功，当日12:00-当日18:00间申请提现的，在当日18:00处理</p>
              <p class="mt-10 text-ct fs-14">当日18:00-次日12:00间申请提现的，在次日12:00处理，你可以在提现记录中查看进度</p>
            </Modal>
          </div>
        </div>
      </div>
      <div class="getout-record" v-show="changeBankIDcardShow.getoutRecord">
        <div class="titel clear">
          <span class="left spl">提现记录</span>
          <span class="right spr cursor-p" @click="lookGetoutRecord('getoutMoney')">返回上页</span>
        </div>
        <div class="content-input ">
          <span>流水号：</span>
          <iInput style="width: 150px"></iInput>
          <span class="ml-10">申请时间：</span>
          <Date-picker type="datetime" placeholder="选择日期" style="width: 200px" v-model="applyFrom"   format="yyyy-MM-dd HH:mm:ss" :key="applyFrom"  @on-change="applyFrom=$event"></Date-picker>
          <span>-</span>
          <Date-picker type="datetime" placeholder="选择日期" style="width: 200px" v-model="applyTo" format="yyyy-MM-dd HH:mm:ss" :key="applyTo"  @on-change="applyTo=$event"></Date-picker>
          <iButton class="ibtn1">搜索</iButton>
        </div>
        <div class="content-select clear">
          <span class="left" v-for="item in getoutStatus" :class="{actives:getoutSelect===item.isSelect}" @click="getoutStatusFun(item.isSelect)">{{item.text}}</span>
        </div>
        <div class="personal-list-table mt-10">
          <table class="list-table">
            <thead>
            <tr>
              <th style="width:20%;">申请时间</th>
              <th style="width:30%;">流水号</th>
              <th style="width:10%;">提现金额（元）</th>
              <th style="width:20%;">代收手续费（元）</th>
              <th style="width:10%;">状态</th>
              <th style="width:10%;">操作</th>
            </tr>
            </thead>
            <tbody  >
            <tr>
              <td>
               2017-08-08<br/>
                16:16:16
              </td>
              <td>
               122222222222222222222
              </td>
              <td >5555555</td>
              <td>
                1
              </td>
              <td class="main-color">
                提现中
              </td>
              <td> <p style="color:blue;" class="detailsSpc" >详情</p></td>
            </tr>
            <tr >
              <td colspan="6" style="padding: 0px;">
                <table class="small-table" style="background-color: #f9f9f9;">
                  <thead>
                  <tr>
                    <th style="width:20%;">提现帐号类型</th>
                    <th style="width:30%;">提现帐号</th>
                    <th style="width:15%;">提现金额（元）</th>
                    <th style="width:15%;">代收手续费（元）</th>
                    <th style="width:20%;">实际到账金额（元）</th>
                  </tr>
                  </thead>
                  <tbody>
                  <tr >
                    <td>
                      中国农业银行
                    </td>
                    <td>
                      121212121212121212121
                    </td>
                    <td>
                     100
                    </td>
                    <td>
                      1
                    </td>
                    <td>100</td>
                  </tr>
                  </tbody>
                </table>
              </td>
            </tr>
            </tbody>
          </table>
        </div>
      </div>
      <div class="common-question">
        <h2>常见问题</h2>
        <div class="mt-10">
          <p>提现</p>
          <p>1、最低提现金额1元，手续费01%，每天提现次数不限</p>
          <p>2、当日12:00-当日18:00间申请提现的，在当日18:00处理，当日18:00-次日12:00间申请提现的，在次日12:00处理。</p>
        </div>
      </div>
    </div>
    <div class="my-transact" v-show="infoSelect === 'jiaoYiJiLu'">
      <div class="choice-time">
        起止日期：<Date-picker type="datetime" placeholder="选择日期" style="width: 200px" v-model="beginTime"   format="yyyy-MM-dd HH:mm:ss" :key="beginTime"  @on-change="beginTime=$event"></Date-picker>
        &nbsp;&nbsp;到 &nbsp;
        <Date-picker type="datetime" placeholder="选择日期" style="width: 200px" v-model="endTime" format="yyyy-MM-dd HH:mm:ss" :key="endTime"  @on-change="endTime=$event"></Date-picker>
        <span class="cursor-p" v-for="item in choiceTime" :class="{active:timeSelect === item.isSelect} " @click="changeTimeChoiceStyle(item.isSelect),getTargetTime(item.id)" >{{item.text}}</span>
      </div>
      <div class="transact-type " >
        <span class="left">交易类型：</span>
        <div class="left ml-5">
          <Checkbox
            :value="checkAll"
            @click.prevent.native="handleCheckAll">全部</Checkbox>
        </div>
        <div class="left">
          <Checkbox-group v-model="transactType" class="checkBox  ml-45" @on-change="checkAllGroupChange">
            <Checkbox label=2>活动</Checkbox>
            <Checkbox label=0>充值</Checkbox>
            <Checkbox label=1>提现</Checkbox>
          </Checkbox-group>
        </div>
      </div>
      <div class="activity-number mt-20">
        活动编号：<iInput v-model="activityNumber" style="width: 200px;height: 30px" class="ml-10"></iInput>
      </div>
      <iButton class="ibtn" @click="getTradListAll(transactType,beginTime,endTime,activityNumber)">筛选</iButton>
      <div class="mt-22 line"></div>
      <div class="transaction-amount">
        <span>收入：<span class="number">{{userAccount.amountIncomes/100||0}}</span>元</span>
        <span class="ml-20">支出：<span class="number">{{userAccount.amountPayment/100||0}}</span>元</span>
      </div>
      <div class="personal-list-table mt-10">
        <table class="list-table">
          <thead>
          <tr>
            <th style="width: 20%">交易时间</th>
            <th style="width: 40%">交易类型</th>
            <th style="width: 20%">交易金额（元）</th>
            <th style="width: 20%">操作</th>
          </tr>
          </thead>
          <tbody v-for="(item,index) in myTableDetailsAll" >
          <tr>
            <td>
              <p>{{item.createTime | dateFormat('YYYY-MM-DD ')}}</p>
              <p>{{item.createTime | dateFormat('hh:mm:ss ')}}</p>
            </td>
            <td>
              <p>{{item.changeName}}</p>
              <p>活动编号：{{item.cAmount}}</p>
            </td>
            <td class="main-color">{{item.amountChange/100||0}}</td>
            <td>
              <p style="color:blue;" class="details" @click="detailsInit(item.id)">详情</p>
            </td>
          </tr>
          <tr v-show="detailSelect===item.id">
            <td colspan="4" style="padding: 0px;">
              <table class="small-table" style="background-color: #f9f9f9;">
                <thead>
                <tr>
                  <th style="width:20%;">交易时间</th>
                  <th style="width:30%;">流水号</th>
                  <th style="width:30%;">交易明细</th>
                  <th style="width:10%;">交易金额（元）</th>
                </tr>
                </thead>
                <tbody>
                <tr v-for="(item,index) in userListDetails">
                  <td>
                    <p>{{item.tradTime | dateFormat('YYYY-MM-DD ')}}</p>
                    <p>{{item.tradTime | dateFormat('hh-mm-ss ')}}</p>
                  </td>
                  <td>
                    {{item.serialNumber}}
                  </td>
                  <td>
                    <p>{{getTradType(item.tradName)}}</p>
                    <p>活动编号：11113244325324</p>
                  </td>
                  <td>
                    {{item.tradAmount/100||0}}
                  </td>
                </tr>
                <tr>
                  <td colspan="4">
                    <Button @click="modal1 = true" class="theSpecialBtn">查看任务担保金支出明细</Button>
                    <Modal
                      v-model="modal1"
                      title="普通的Modal对话框标题"
                      :styles="{top:'200px',width:'800px'}"
                      class-name	="pop-up-window">
                      <div slot="header">活动编号：<span style="color: red;">12345678&nbsp;,&nbsp;</span>共支付活动担保金：<span style="color: red;">80</span>&nbsp;元</div>
                      <div slot="">
                        <table class="alert-table-list" style="width: 100%;border: 1px solid #F3F3F3;background-color:#F8F8F8;text-align: center" >
                          <thead>
                          <tr style="border-bottom: 1px solid #F3F3F3;">
                            <th style="width: 20%;padding: 10px 0px;">交易时间</th>
                            <th style="width: 20%">流水号</th>
                            <th style="width: 40%">交易明细</th>
                            <th style="width: 20%">交易金额（元）</th>
                          </tr>
                          </thead>
                          <tbody>
                          <tr style="border-bottom: 1px solid #F3F3F3;">
                            <td style="padding:10px 0px;">
                              <p>2017-08-08</p>
                              <p>18：18:18</p>
                            </td>
                            <td>1234456789</td>
                            <td>
                              <p>秀客任务保证金返款</p>
                              <p>任务编号：1123455</p>
                            </td>
                            <td>
                              +20
                            </td>
                          </tr>
                          <tr style="border-bottom: 1px solid #F3F3F3;">
                            <td style="padding:10px 0px;">
                              <p>2017-08-08</p>
                              <p>18：18:18</p>
                            </td>
                            <td>1234456789</td>
                            <td>
                              <p>秀客任务保证金返款</p>
                              <p>任务编号：1123455</p>
                            </td>
                            <td>
                              +20
                            </td>
                          </tr>
                          </tbody>
                        </table>
                      </div>
                    </Modal>
                  </td>
                </tr>
                <tr v-show="showNotice"><td colspan="4" style="color:red;font-size: 14px;">暂无数据！</td></tr>
                </tbody>
              </table>
            </td>
          </tr>
          </tbody>
          <tbody>
          <tr v-show="showBigNoticeAll"><td colspan="4" style="color: red;font-size: 14px" >暂无数据！</td></tr>
          </tbody>
        </table>
      </div>
      <div class="right mt-22">
        <Page :total="100"></Page>
      </div>
    </div>
    <div class="my-account" v-show="infoSelect === 'accountInfo'">
      <div class="user-safe" v-show="myAccount.userSafe">
        <p class="fs-14">账户信息</p>
        <ul>
          <li>
            <ul>
              <li class="one">实名认证</li>
              <li class="two">
                未认证
                <span>(建议定期修改登录密码)</span>
              </li>
              <li class="three">
                <a href="javascript:;">去认证</a>
              </li>
            </ul>
          </li>
          <li>
            <ul>
              <li class="one">绑定手机</li>
              <li class="two">
                13655816578
              </li>
              <li class="three">
                <a href="javascript:;">去设置</a>
              </li>
            </ul>
          </li>
          <li>
            <ul>
              <li class="one">
                提现账号
              </li>
              <li class="two">
                未绑定
              </li>
              <li class="three">
                <a href="javascript:;">未绑定</a>
              </li>
            </ul>
          </li>
          <li>
            <ul>
              <li class="one">
                支付密码
              </li>
              <li class="two">
                未设置(同登录密码)
              </li>
              <li class="three">
                <a href="javascript:;" @click="myAccountPwdChangeFather('modifyPwd')">重置</a>
              </li>
            </ul>
          </li>
        </ul>
      </div>
      <div class="modify-pwd clear" v-show="myAccount.modifyPwd">
        <div class="modify-pwd-sel clear">
          <p>重置支付密码</p>
          <div v-show="myAccountSon.selBox" class="sel-box clear">
            <p class="left">请选择重置的方式：</p>
            <div class="left">
              <div>
                <div @click="myAccountPwdChangeSon('selDefaultModify')" class="sel-canal">
                  <p>
                    我忘记支付密码了
                    <br>
                    <span style="color: #999">忘记密码或者密码被锁定了</span>
                  </p>
                  <i data-v-5aa11427="" class="ivu-icon ivu-icon-chevron-right"
                     style="vertical-align: middle;display: table-cell; font-size: 20px;"></i>
                </div>
                <div  @click="myAccountPwdChangeSon('selPhoneModify')" class="sel-canal">
                  <p>
                    我记得原来的密码
                  </p>
                  <i data-v-5aa11427="" class="ivu-icon ivu-icon-chevron-right"
                     style="vertical-align: middle;display: table-cell; font-size: 20px;"></i>
                </div>
                <iButton @click="myAccountPwdChangeFather('userSafe')">
                  返回上一页
                </iButton>
              </div>
            </div>

          </div>
          <div v-show="myAccountSon.selPhoneModify" class="sel-default-modify mt-20">
            <iForm ref="defaultModifyCustom" :model="defaultModifyCustom" :rules="defaultModifyRuleCustom" :label-width="400">
              <div class="clear form-input-box">
                <Form-item label="原始密码" class="left" style="width: 650px" prop="oldPwd">
                  <iInput type="password" size="large" v-model="defaultModifyCustom.oldPwd"></iInput>
                </Form-item>
              </div>
              <div class="clear form-input-box">
                <Form-item label="新密码" class="left" style="width: 650px" prop="newPwd">
                  <iInput type="password" size="large" v-model="defaultModifyCustom.newPwd"></iInput>
                </Form-item>
              </div>
              <div class="clear form-input-box">
                <Form-item label="确认密码" class="left" style="width: 650px" prop="repwd">
                  <iInput type="password" size="large" v-model="defaultModifyCustom.repwd"></iInput>
                </Form-item>
              </div>
              <div>
                <Form-item>
                  <iButton @click="handleSubmit('defaultModifyCustom',modifyDefaultPayPwdFunc)">
                    确定
                  </iButton>
                  <iButton @click="myAccountPwdChangeSon('selBox')">
                    返回上一页
                  </iButton>
                </Form-item>
              </div>
            </iForm>
          </div>
          <div v-show="myAccountSon.selDefaultModify" class="sel-phone-modify mt-20">
            <iForm ref="payCustom" :model="payCustom" :rules="payRuleCustom" :label-width="400">
              <div class="clear form-input-box">
                <Form-item label="绑定手机" prop="phone" class="left" style="width: 650px">
                  <iInput type="text" size="large" v-model="payCustom.phone" ></iInput>
                </Form-item>
              </div>
              <div class="clear form-input-box">
                <Form-item label="图形验证码"  prop="validateCode" class="left" style="width: 550px">
                  <iInput type="text" size="large" v-model="payCustom.validateCode"></iInput>
                </Form-item>
                <div style="width: 100px; float:left;">
                  <img :src="imgSrc" width="100%" alt="" @click="getVrcode">
                </div>
              </div>
              <div class="clear form-input-box">
                <Form-item label="手机验证码" class="left pos-rel" style="width: 650px">
                  <iInput type="text" number size="large" v-model="payCustom.smsCode"></iInput>
                  <SmsCountdown :on-success="sendCodeSuccess" style="top: 3px;"
                                :phone="payCustom.phone"
                                :purpose="payCustom.purpose"
                                :validateCode="payCustom.validateCode"
                                :timeout=120
                  >
                  </SmsCountdown>
                </Form-item>
              </div>
              <div>
                <Form-item>
                  <iButton @click="handleSubmit('payCustom',modifyPayPwdFunc)">
                    确定
                  </iButton>
                  <iButton @click="myAccountPwdChangeSon('selBox')">
                    返回上一页
                  </iButton>
                </Form-item>
              </div>
            </iForm>
          </div>
          <div v-show="myAccountSon.modifyPwd" class="mt-20">
            <iForm ref="trendsModifyCustom" :model="trendsModifyCustom" :rules="trendsModifyRuleCustom" :label-width="400">
              <div class="clear form-input-box">
                <Form-item label="新密码" prop="pwd" class="left" style="width: 650px" >
                  <iInput type="password" size="large" v-model="trendsModifyCustom.pwd"></iInput>
                </Form-item>
              </div>
              <div class="clear form-input-box">
                <Form-item label="确认新密码" class="left" style="width: 650px" prop="repwd">
                  <iInput type="password" size="large" v-model="trendsModifyCustom.repwd"></iInput>
                </Form-item>
              </div>
              <div>
                <Form-item>
                  <iButton @click="handleSubmit('payCustom',modifyFinishPayPwdFunc)">
                    确定
                  </iButton>
                </Form-item>
              </div>
            </iForm>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import api from '@/config/apiConfig'
  import Icon from 'iview/src/components/icon'
  import DatePicker  from 'iview/src/components/date-picker'
  import Alert from 'iview/src/components/alert'
  import Table  from 'iview/src/components/table'
  import Form from 'iview/src/components/form'
  import Input from 'iview/src/components/input'
  import Radio from 'iview/src/components/radio'
  import Checkbox from 'iview/src/components/checkbox'
  import Button from 'iview/src/components/button'
  import Page from 'iview/src/components/page'
  import {setStorage, getStorage} from '@/config/utils'
  import Modal from 'iview/src/components/modal'
  import TimeDown from '@/components/TimeDown'
  import SmsCountdown from '@/components/SmsCountdown'
  import PayModel from  '@/components/PayModel'
  import {Select, Option, OptionGroup} from 'iview/src/components/select'
  export default {
    name: 'MoneyManagement',
    components: {
      iTable:Table,
      Radio:Radio,
      RadioGroup:Radio.Group,
      DatePicker:DatePicker,
      iInput: Input,
      iForm: Form,
      iSelect: Select,
      iOption: Option,
      OptionGroup: OptionGroup,
      FormItem: Form.Item,
      Checkbox: Checkbox,
      CheckboxGroup: Checkbox.Group,
      iButton: Button,
      ButtonGroup: Button.Group,
      Icon: Icon,
      Modal: Modal,
      TimeDown: TimeDown,
      Alert: Alert,
      SmsCountdown: SmsCountdown,
      PayModel:PayModel,
      Page:Page

    },
    data() {
      //表单验证
      const validatePhone = (rule, value, callback) => {
        if (!(/^1[34578]\d{9}$/.test(value))) {
          callback(new Error('请输入正确手机号'));
        } else {
          callback()
        }
      };
      const  validatePayNumber =(rule,value,callback)=>{
        if (!(/^[1-9]\d*$/.test(value))){
          callback(new Error('金额为数字，请您重新输入'))
        }else {
          callback()
        }
      };
      const validateBankCard = (rule, value, callback) => {
        if (!(/^([1-9]{1})(\d{15}|\d{18})$/.test(value))) {
          callback(new Error('请输入正确的银行卡号'));
        } else {
          callback()
        }
      };
      const validateBankName= (rule, value, callback) => {
        if (value==='') {
          callback(new Error('请选择所属银行'));
        } else {
          callback()
        }
      };
      const validateName= (rule, value, callback) => {
        if (value==='') {
          callback(new Error('请输入姓名'));
        } else {
          callback()
        }
      };
      const validateBankBranch= (rule, value, callback) => {
        if (value==='') {
          callback(new Error('请输入所属银行支行'));
        } else {
          callback()
        }
      };
      const validatePass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入密码'));
        } else {
          callback()
        }
      };
      const validateCode = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入图片验证码'));
        } else {
          callback()
        }
      };
      const validateDefaultPassCheck = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请再次输入密码'));
        } else if (value !== this.defaultModifyCustom.newPwd) {
          callback(new Error('两次输入密码不一致!'));
        } else {
          callback();
        }
      };
      const validatePassCheck = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请再次输入密码'));
        } else if (value !== this.trendsModifyCustom.pwd) {
          callback(new Error('两次输入密码不一致!'));
        } else {
          callback();
        }
      };
      const validateSmsCode = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入动态码'));
        } else {
          callback()
        }
      };
      return {
        imgSrc: null,
        payCustom: {
          phone: null,
          validateCode: '',
          purpose:'forget',
          smsCode: '',
          role: 0,
        },
        payRuleCustom: {
          phone: [
            {validator: validatePhone, trigger: 'blur'},
          ],
          validateCode: [
            {validator: validateCode, trigger: 'blur'},
          ],
          smsCode: [
            {validator: validateSmsCode, trigger: 'blur'}
          ]

        },
        trendsModifyCustom:{
          pwd: '',
          repwd: ''
        },
        defaultModifyCustom: {
          oldPwd: '',
          newPwd: '',
          repwd: '',
        },
        defaultModifyRuleCustom: {
          oldPwd: [
            {validator: validatePass, trigger: 'blur'},
          ],
          newPwd: [
            {validator: validatePass, trigger: 'blur'},
          ],
          repwd: [
            {validator: validateDefaultPassCheck, trigger: 'blur'},
          ]
        },
        trendsModifyRuleCustom: {
          pwd: [
            {validator: validatePass, trigger: 'blur'},
          ],
          repwd: [
            {validator: validatePassCheck, trigger: 'blur'},
          ],
        },
        myInfoSelects: [
          {
            text: '账号信息',
            isSelect: 'account',
            callback: this.accountInit
          },
          {
            text: '充值',
            isSelect: 'pay'
          },
          {
            text: '提现',
            isSelect: 'getOut'
          },
          {
            text: '交易记录',
            isSelect: 'jiaoYiJiLu'
          },
          {
            text: '账户管理',
            isSelect: 'accountInfo'
          }
        ],
        myTableDetails: [
          {
            id: 1
          },
          {
            id: 2
          },
          {
            id: 3
          }
        ],
        myTableDetailsAll:[],
        infoSelect: 'account',
        detailSelect: 'false',
        userList: {},
        userAccount: {},
        userListDetails: null,
        showBigNotice:false,
        showBigNoticeAll:false,
        showNotice:false,
        beginTime:null,
        endTime:null,
        timeSelect:'oneMouth',
        choiceTime:[
          {
            text:'今天',
            isSelect:'today',
            id:0

          },
          {
            text:'昨天',
            isSelect:'yesterday',
            id:1
          },
          {
            text:'最近一个月',
            isSelect:'oneMouth',
            id:2
          },
          {
            text:'全部',
            isSelect:'all',
            id:3
          }
        ],
        checkAll: false,
        transactType:[],
        activityNumber:null,
        modal1: false,
        modal2:false,
        inputMoney:null,
        myAccount:{
          userSafe:true,
          modifyPwd:false,
        },
        myAccountSon:{
          selBox:true,
          selDefaultModify:false,
          selPhoneModify:false
        },
        formItem: {
          name: '',
          select: '',
          bankNumber:'',
          bankBranch:'',
          phone:null,
          validateCode:'',
          cord:'',
          purpose:'id_verify'
        },
        formRuleItem:{
          phone: [
            {validator: validatePhone, trigger: 'blur'}
          ],
          validateCode: [
            {validator: validateCode, trigger: 'blur'}
          ],
          cord:[
            {validator:validateSmsCode,trigger:'blur'}
          ],
          bankNumber:[
            {validator:validateBankCard,trigger:'blur'}
          ],
          select: [
            {validator: validateBankName, trigger: 'blur'}
          ],
          name: [
            {validator: validateName, trigger: 'blur'}
          ],
          bankBranch: [
            {validator: validateBankBranch, trigger: 'blur'}
          ]
        },
        payMoney:{
          number:null,
          payMode: 'ali',
        },
        payMoneyRule:{
          number: [
            {validator: validatePayNumber, trigger: 'blur'}
          ]
        },
        getoutMoney:{
          number:'',
          password:'',
        },
        applyFrom:'',
        applyTo:'',
        getoutStatus:[
          {
            text:'提现中',
            isSelect:'doing',
            id:0
          },
          {
            text:'提现成功',
            isSelect:'success',
            id:1
          },
          {
            text:'提现失败',
            isSelect:'fail',
            id:2
          }
        ],
        getoutSelect:'doing',
        changeBankIDcardShow:{
          iScertification:false,
          iSbondBankCard:false,
          bondBankCard:false,
          getoutMoney:false,
          getoutRecord:false
        },
        getbankCardInformation:{}
      }
    },
    mounted() {

    },
    created() {
      this.getVrcode();
      this.getUserAccount();
      this.getTradList(null);
      this.getTradListAll([0,1,2],null,null,null);


    },
    computed: {
      getUserBalance: function () {
        return this.$store.state.userBalance / 100
      }

    },
    methods: {
      closable () {
        this.$Message.info({
          content: '可手动关闭的提示',
          duration: 10,
          closable: true
        });
      },
      handleSubmit(name, callback) {
        let res = false;
        this.$refs[name].validate((valid) => {
          res = !!valid
        });
        if (typeof callback === 'function' && res) {
          callback();
        }
      },
      modifyDefaultPayPwdFunc(){
        let self = this;
        api.modifyDefaultPayPwd({
          oldPwd: self.defaultModifyCustom.oldPwd,
          newPwd: self.defaultModifyCustom.newPwd,
          repwd: self.defaultModifyCustom.repwd
        }).then((res) => {
          if(res.status){
            self.$Modal.success({
              content: res.msg,
              onOk: function () {
                self.$router.push({path: '/user/user-home'});
              }
            });
          }else {
            self.$Modal.error({
              content: res.msg
            });
          }
        })
      },
      modifyPayPwdFunc(){
        let self = this;
        api.validatePaySmscode({
          phone: self.payCustom.phone,
          smsCode: self.payCustom.smsCode,
        }).then((res) => {
          if(res.status){
            self.myAccountPwdChangeSon('modifyPwd');
          }else {
            self.$Modal.error({
              content: res.msg
            });
            self.getVrcode();
          }
        });
      },
      modifyFinishPayPwdFunc(){
        let self = this;
        api.modifyPayPwd({
          phone: self.payCustom.phone,
          smsCode: self.payCustom.smsCode,
          pwd: self.trendsModifyCustom.pwd,
          repwd: self.trendsModifyCustom.repwd,
        }).then(res => {
          if(res.status){
            self.$Modal.success({
              content: res.msg,
              onOk: function () {
                self.$router.push({path: '/user/user-home'});
              }
            });
          }else {
            self.$Modal.error({
              content: res.msg
            });
          }
        })
      },
      checkPhone() {
        this.$refs.loginTrendsCustom.validateField('phone');
      },
      sendCodeSuccess(res) {
        let self = this;
        if (res.status) {
          self.$Modal.success({
            content: res.msg
          });
        } else {
          self.$Modal.error({
            content: res.msg
          });
          self.getVrcode();
        }
      },
      accountInit(type) {
        this.infoSelect = type
      },
      detailsInit(type) {
        if (this.detailSelect === type) {
          this.detailSelect = 'none'
        } else {
          this.detailSelect = type;
          this.getTradListDetails(type);
        }
      },
      getVrcode() {
        this.imgSrc = "/api/vrcode.json?rand=" + new Date() / 100
      },
      getUserAccount() {
        let _this = this;
        api.getUserAccount().then(res => {
          if (res.status) {
            _this.userList = res.data;
            _this.userAccount = res.data.userAccount;
            _this.changeBankIdcardShowFun();
          } else {
            _this.$Message.error(res.msg);
          }
        });
      },
      getTradList (type) {
        let _this = this;
        api.getTradList({
          createTimeStart: null,
          createTimeEnd: null,
          accountChangeType: type,
          reversePicUrl: null,
          taskSerial: null
        }).then(res => {
          if (res.status) {
            _this.myTableDetails = res.data.content.slice(0, 5);
            _this.showBigNotice = _this.myTableDetails.length === 0;

          } else {
            _this.$Message.error(res.msg);
          }
        });
      },
      getTradListAll(type,beginTime,endTime,activityNumber) {
        let _this = this;
        if(type.length === 3){
          type = null;
        }else {
          type = type;
        }
        api.getTradList({
          createTimeStart: beginTime,
          createTimeEnd: endTime,
          accountChangeType: type,
          reversePicUrl: null,
          taskSerial: activityNumber
        }).then(res => {
          if (res.status) {
            _this.myTableDetailsAll = res.data.content;
            _this.showBigNoticeAll = _this.myTableDetailsAll.length === 0;

          } else {
            _this.$Message.error(res.msg);
          }
        });
      },
      handleCheckAll () {
        if (this.indeterminate) {
          this.checkAll = false;
        } else {
          this.checkAll = !this.checkAll;
        }
        if (this.checkAll) {
          this.transactType = ['0','1','2'];
        } else {
          this.transactType = [];
        }
      },
      checkAllGroupChange (data) {
        if (data.length === 3) {
          this.checkAll = true;
        } else if (data.length > 0) {
          this.checkAll = false;
        } else {
          this.checkAll = false;
        }
      },
      getTradListDetails(type) {
        let _this = this;
        api.getTradListDetails({
          tradId: type
        }).then(res => {
          if (res) {
            _this.userListDetails = res;
            _this.showNotice = _this.userListDetails.length === 0;
          } else {
            console.log("列表数据为空！")
          }
        });
      },
      changeTimeChoiceStyle(type){
        this.timeSelect = type
      },
      myAccountPwdChangeFather(type){
        for(let k in this.myAccount){
          this.myAccount[k] = k === type;
        }
      },
      myAccountPwdChangeSon(type){
        for(let k in this.myAccountSon){
          this.myAccountSon[k] = k === type;
        }
      },
      getTargetTime(type){
        let _this = this;
         function getDateStr(time) {
           let date = new Date();
           date.setDate(date.getDate()+time);
           let seperator1 = "-";
           let seperator2 = ":";
           let month = date.getMonth() + 1;
           let strDate = date.getDate();
           if (month >= 1 && month <= 9) {
             month = "0" + month;
           }
           if (strDate >= 0 && strDate <= 9) {
             strDate = "0" + strDate;
           }
           let currentdate = date.getFullYear() + seperator1 + month + seperator1 + strDate
             + " " + '00' + seperator2 + '00'
             + seperator2 + '00';
           return currentdate;
         }
          if(type===0){
            _this.beginTime = getDateStr(0);
            _this.endTime = getDateStr(1);
          }else if(type===1){
            _this.beginTime = getDateStr(-1);
            _this.endTime = getDateStr(0);
          }else if (type===2){
            _this.beginTime = getDateStr(-30);
            _this.endTime = getDateStr(1);
          }else {
            _this.getTradListAll([0,1,2],null,null,null)
          }


      },
      getoutStatusFun(type){
        this.getoutSelect = type
      },
      getTradType(type){
        switch (type){
          case 'enchashment':
            return '提现';
            break;
          case  'pay_for_task_deposit_seller':
            return '支付活动担保金';
            break;
          case  'task_return_seller':
            return '活动结算返款';
            break;
          case  'showker_task_supplementary_seller':
            return '补充任务担保金';
            break;
          case  'task_deposit_pay_shower':
            return '任务保证金退款';
            break;
          case  'task_deposit_return_shower':
            return '任务保证金返款';
            break;
          case  'task_delete_return_seller':
            return '删除活动返款';
            break;
        }
      },
      geIifCertification(type){
        if (type===false){
          return '未认证';
        }else {
          return '已认证';
        }
      },
      getIfBandingBankCard(type){
        return type===null?'未添加':'已添加';
      },
      changeBankIdcardShowFun(){
        if (this.userList.ifCertification ===false){
          this.changeBankIDcardShow.iScertification=true;
          this.changeBankIDcardShow.iSbondBankCard=false;
        }else if (this.userList.ifCertification===true){
          if(this.userList.ifBandingBankCard === null){
            this.changeBankIDcardShow.iScertification=false;
            this.changeBankIDcardShow.iSbondBankCard=true;
          }else {
            for (let k in  this.changeBankIDcardShow) {
              this.changeBankIDcardShow[k]=k==='getoutMoney';
            }
          }
        }
      },
      addBankCard(){
        this.changeBankIDcardShow.iScertification=false;
        this.changeBankIDcardShow.iSbondBankCard=false;
        this.changeBankIDcardShow.bondBankCard=true;
      },
      lookGetoutRecord(type){
        for (let k in  this.changeBankIDcardShow) {
          this.changeBankIDcardShow[k]=k===type;
        }
      },
      addBankCardInfo(type){
        let _this=this;
        api.addBankCardInfo({
          validateCode:type.validateCode,
          accountName:type.name,
          bankName:type.select,
          bankNo:type.bankNumber,
          bankPart:type.bankBranch,
          phoneNo:type.phone,
          smsCode:type.cord
        }).then(res=>{
          if(res.status){
            _this.getbankCardInformation=res.data
          }else {
            _this.$Message.error(res.msg)
          }
        });
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import 'src/css/mixin';
  .personal-box {
    .main-color {
      color: $mainColor;
    }
    .title {
      height: 52px;
      line-height: 52px;
      font-size: 20px;
      color: #666;
      border-bottom: 2px solid #F6F6F6;
    }
    .personal-sel-top {
      border-bottom: 1px solid $mainColor;
      a {
        background-color: #fff;
        color: #666;
        display: inline-block;
        font-size: 16px;
        height: 36px;
        line-height: 36px;
        width: 144px;
        text-align: center;
      }
      a.active {
        background-color: $mainColor;
        color: #fff;
      }
    }
    .my-count {
      .my-money {
        border: 1px solid #f9f9f9;
        background-color: #f9f9f9;
        width: 100%;
        .my-money-left {
          width: 60%;
        }
        .my-money-right {
          width: 40%;
          padding: 10px;
          div {
            padding-bottom: 8px;
          }
          p {
            font-weight: 900;
          }
        }
      }
      .moneyInfoLeft, .moneyInfoRight {
        height: 100%;
        border-right: 1px solid gray;
        padding: 10px;
        width: 50%;
        text-align: center;

        p {
          margin-left: 5px;
          text-align: left;
          padding-top: 5px;
        }
      }

      .number {
        border-bottom: 1px solid gray;
        font-size: 20px;
        color: $mainColor;
        padding-bottom: 10px;
        height: 40px;
      }
      .view-details {
        padding-top: 10px;
        border-top: 1px solid gray;
        a:first-of-type {
          padding-right: 15px;
        }
        a:last-of-type {
          padding-left: 15px;
        }
      }
      .moneyInfoRight {
        .view-details {
          margin-top: 28px;
        }
        .sp, .sa {
          padding: 5px;
        }

      }
      .get-more a {
        display: inline-block;
        padding: 5px 20px;
        margin-top: 10px;
        margin-left: 10px;
        background-color: $mainColor;
        color: #fff;
      }
    }
    .my-account {
      .user-safe {
        margin-top: 20px;
        P {
          padding: 0 20px;
          height: 36px;
          line-height: 36px;
          background-color: #f8f8f8;
        }
        ul {
          width: 100%;
          border: 1px solid  #f3f3f3;
          li {
            ul {
              display: table;
              height: 60px;
              font-size: 14px;
              li {
                display: table-cell;
                vertical-align: middle;
                text-align: center;
              }
              li.one {
                width: 30%;
                text-align: left;
                padding-left: 20px;
              }
              li.two {
                width: 50%;
                text-align: left;
              }
              li.three {
                width: 20%;
              }
            }
          }
        }
      }
      .modify-pwd {
        margin-top: 20px;
        font-size: 14px;
        border: 1px solid  #f3f3f3; ;
        padding-bottom: 20px;
        .modify-pwd-sel {
          > P {
            padding: 0 20px;
            height: 36px;
            line-height: 36px;
            background-color: #f8f8f8;
          }
          .sel-box {
            margin-top: 50px;
            > p {
              width: 20%;
              text-align: center;
            }
            > div {
              width: 80%;
              .sel-canal {
                border: 1px solid #E8E8E8;
                width: 500px;
                height: 70px;
                display: table;
                margin-bottom: 15px;
                padding-left: 20px;
                cursor: pointer;
                p {
                  display: table-cell;
                  vertical-align: middle;
                  width: 95%;
                }
              }

            }
          }
        }
      }
    }
    .trading-record {
      margin-top: 30px;
      width: 100%;
      ul {
        li {
          float: left;
          padding: 5px 10px;
        }
        li:active{
          color: $mainColor;
        }
      }
    }
    .personal-list-table table {
      width: 100%;
      border: 1px solid #dddee1;
      border-bottom: 0;
      border-right: 0;
    }
    .personal-list-table table td,
    .personal-list-table table th {
      border-right: 1px solid #e9eaec;
      border-bottom: 1px solid #e9eaec;
      text-align: center;
    }
    .personal-list-table table th {
      height: 40px;
      white-space: nowrap;
      overflow: hidden;
      background-color: #f8f8f9;
    }
    .personal-list-table table td {
      padding-top: 15px;
      padding-bottom: 15px;
    }
    .personal-list-table tr table {
      width: 100%;
    }
    .details {
      cursor: pointer;
      position: relative;
    }
    .detailsSpc{
      cursor: pointer;
      position: relative;
    }
    .small-table td {
      padding: 10px;
    }
    .small-table tbody:last-child{
      text-align: center;

    }
    .common-question {
      margin-top: 80px;
      padding-left: 10px;
    }
    .my-pay{
      .my-pay-top{
        padding: 10px;
        font-size: 14px;
        border-bottom: 1px solid $mainColor;
      }
      .my-pay-desc{
        padding: 80px 0px 0px 100px;
        font-size: 16px;
        .iinput{
          width: 150px;
          height: 30px;
        }
      }
      .pay-choice{
        height: 30px;
        line-height: 30px;
       input{
         vertical-align: middle;
       }
       .wx,.zfb{
         vertical-align: middle;
       }
      }
      .btn > button{
        width: 150px ;
        background-color: $mainColor;
        height: 30px;
        border: none;
        color: #fff;
        font-size: 14px;
        outline: none;
        cursor: pointer;
        margin: 30px 0px 0px 230px;
      }
    }
    .my-transact{
      .choice-time{
        padding: 15px;
        border-bottom: 1px solid $mainColor;
        span{
          display: inline-block;
          padding: 5px 20px;
          color: #9FADB7;
        }
        span:nth-of-type(1){
          margin-left: 45px;
        }
        span.active{
          background-color: #DAE1E8;
          border-radius: 13px;
          color: #000;
        }
      }
      .transact-type{
        position: relative;
        padding: 15px;
        .checkBox{
          position: absolute;
          top: 13px;
          left: 86px;

        }
      }
      .activity-number{
        padding: 10px 15px;
      }
      .ibtn{
        background-color:$mainColor;
        color: #fff;
        font-size: 14px;
        margin-left: 84px;
        margin-top: 12px;
        width: 100px;
      }
      .line{
        height: 1px;
        border-bottom: 1px solid red
      }
      .transaction-amount{
        padding: 20px 10px;
        font-size: 16px;
        .number{
          color: $mainColor;
        }
      }
    }
    .theSpecialBtn{
      border: none;
      background-color: #f9f9f9;
      cursor: pointer;
      outline: none;
      color: blue;
    }
    .my-getoutmoney{
      .not-certification{
        text-align: center;
        h2{
          margin-top: 80px;
          color: #7C7C7C;
          .icon:before{
            font-size: 30px;
          }
        }
        .how-todo{
          font-size: 16px;
          margin-top: 52px;
          color: #50A6FF;
          span:nth-of-type(1),
          span:nth-of-type(3){
            color: #BABABA;
          }
        }
      }
      .bound-bankcard{
        text-align: center;
        .bankcard-title{
          margin-top: 80px;
          .icon{
            /*vertical-align: middle;*/
          }
          .icon:before{
            color: #FF7F57;
            font-size: 30px;
            /*vertical-align: middle;*/

          }
          span{
            font-family:Microsoft YaHei ;
            font-size: 18px;
            color: #808080;
          }
        }
        .addcard{
          background-color: #F8F8F8;
          height: 140px;
          width: 260px;
          border: 1px dashed #D3D3D3;
          margin: 40px auto;
          cursor: pointer;
          .icon{
            margin-top: 35px;
            color: #58C1E5;
          }
          .icon:before{
            font-size: 35px;
          }
          p{
            font-family: Microsoft YaHei;
            font-size: 20px;
            color: #48B4DC;
          }
        }
      }
      .add-bankcard{
        .title{
          color: #FF6F42;
          height: 50px;
          position: relative;
          width: 700px;
          background-color: #FFF6F3;
          margin: 0 auto;
          margin-top: 60px;
          .icon{
            position: absolute;
            top: 11px;
          }
          .icon:before{
            font-size: 30px;
          }
          span{
            font-family: Microsoft YaHei;
          }
        }
        .ipt-information{
          margin-left: 96px;
          margin-top:36px;
          width: 500px;
          select{
            box-sizing: border-box;
            width: 300px;
            padding: 4px 7px;
            height: 32px;
            border: 1px solid #DDDEE1;
            border-radius: 2px;
          }
          select:focus{
            border:1px solid #FF855C ;
          }
          .formPosition{
            position: relative;
            .ibtn{
              position: absolute;
              top: 0;
              right: -120px;
            }
          }

        }
      }
      .get-out-number{
        .title{
          font-size: 14px;
          border-bottom: 1px solid $mainColor;
          padding: 0px 10px;
        }
        .content{
          font-size: 16px;
          .warning{
            color: #FF6F42;
            height: 40px;
            line-height: 40px;
            position: relative;
            width: 1000px;
            background-color: #FFF6F3;
            margin: 0 auto;
            margin-top: 30px;
            .icon{
              position: absolute;
              top: 11px;
            }
            .icon:before{
              font-size: 20px;
            }
            span{
              font-size: 16px;
              font-family: Microsoft YaHei;
            }
          }
          .get-out-do{
            padding: 20px 80px;
            .iInput{
              width: 200px;
              height: 40px;
            }
          }
          .psw{
            padding-left:46px ;
            span{
              color: #5CAAFF;
              cursor: pointer;
            }
          }
          .ibtns{
            width: 100px;
            margin-left: 126px;
            span{
              width: 100px;
            }
          }

        }
      }
      .getout-record{
        .titel{
          font-size: 14px;
          padding: 10px 15px;
          border-bottom: 1px solid #F5F5F5;
          .spr{
            color: #86BCFF;
          }
        }
        .content-input{
          padding: 10px 15px;
          border-bottom: 1px solid #F5F5F5;
          .ibtn1{
            margin-left: 10px;
            background-color: $mainColor;
            color: #fff;
            width: 100px;
          }
        }
        .content-select{
          padding: 10px 10px;
          span{
            width: 120px;
            padding: 6px 15px;
            background-color: #F8F8F8;
            text-align: center;
            cursor: pointer;
          }
          span:nth-of-type(2){
            border-left: 1px solid #F0F0F0;
            border-right: 1px solid #F0F0F0;
          }
          span.actives{
            background-color: $mainColor;
            color: #fff;
          }
        }
      }
    }
  }

</style>
