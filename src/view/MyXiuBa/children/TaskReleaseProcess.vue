<template>
  <div class="task-release">
    <div class="task-release-title">发布活动</div>
    <div class="flow-title mt-10 mb-20">
      <Steps :current="current">
        <Step title="填写活动信息"></Step>
        <Step title="存入活动担保金"></Step>
        <Step title="等待审核"></Step>
        <Step title="活动上线"></Step>
      </Steps>
    </div>
    <!--判断是否有权限能发布任务-->
    <div v-show="getMemberStatus === 'need_member_for_more_task'||getMemberStatus==='need_member_for_more_audit'" class="text-ct " >
      <div class="mt-80" style="font-size:20px;color: #949494" v-if="getMemberStatus === 'need_member_for_more_task'" >
        <Icon style="font-size: 25px ;transform: translateY(3px)" type="close-circled"></Icon>
        <span><strong>很抱歉，当前你为非会员，购买会员后才能继续发布任务！</strong></span>
      </div >
      <div class="mt-80 ml-60" style="font-size:20px;color: #949494;text-align: left" v-if="getMemberStatus === 'need_member_for_more_audit'">
        <Icon class="mr-10" style="font-size: 25px ;transform: translateY(16px)" type="close-circled"></Icon>
        <span >
          <span><strong>很抱歉，当前你为非会员，仅支持免费发布一条活动（目前已存在一条待审核活动，请等待审核结果）。</strong></span><br>
          <span class="ml-38"><strong>请在购买会员后继续发布更多活动。</strong></span>
        </span>
      </div >
      <div class="mt-40 " >
        <iButton @click="openMember" class="check-member" type="success" size="large">购买会员</iButton>
      </div>
    </div>
    <!--任务发布相关-->
    <div v-show="blockOrNone">
      <div class="activity-con" v-show="stepName === 'information'">
        <div class="activity-info">
          <div class="activity-info-title">填写活动信息</div>
          <div class="activity-type ml-60 mt-22">
            <span class="required">活动类型：</span>
            <Radio-group v-model="taskRelease.taskType">
              <Radio label="pc_search">
                <span>PC搜索下单（taobao.com）</span>
              </Radio>
              <Radio label="app_search">
                <span>手淘搜索下单（APP）</span>
              </Radio>
              <Radio label="tao_code">
                <span>淘口令下单（APP）</span>
              </Radio>
              <Radio label="direct_access">
                <span>宝贝链接下单（taobao.com）</span>
              </Radio>
            </Radio-group>
          </div>
          <div class="activity-time ml-60 mt-20">
            <span class="required">活动时长：</span>
            <iInput v-model.number="taskRelease.taskDaysDuration" placeholder="请输入活动时长" style="width: 120px"></iInput>
            <span>天</span>
            <span class="second-color ml-10">请于活动结束后48小时内审批完成所有秀客资格，逾期系统将自动为您审批。</span>
            <p class="mt-6 pl-60">（单期活动时间为3-30天。）</p>
          </div>
          <div class="trial-condition ml-35 mt-20">
            <span class="ml-5">秀客申请条件：</span>
            <Checkbox v-model="taskRelease.onlyShowForQualification">只有获得资格的秀客才可以查看活动信息</Checkbox>
            <p class="pl-94 size-color mt-5">勾选后可以避免秀客私下索要资格，避免同行举报。但流量、收藏量、分享量会相对减少</p>
            <p class="pl-94 mt-8">
              <Checkbox v-model="taskRelease.refuseOldShowker">拒绝已参加过本店活动的秀客再次申请</Checkbox>
            </p>
            <p class="pl-94 mt-8">
              <Checkbox v-model="taskRelease.needBrowseCollectAddCart">必须先完成浏览、收藏、加购，才可以申请活动资格</Checkbox>
            </p>
          </div>
          <div class="baby-info mt-22">
            <div class="activity-info-title">填写活动宝贝信息</div>
            <div class="baby-title ml-45 mt-20">
              <span class="required">活动标题：</span>
              <iInput v-model="taskRelease.taskName" placeholder="请输入活动标题" style="width: 296px"></iInput>
              <span class="ml-20 size-color"><Icon v-show="taskNameLength > 35" color="#f60" type="information-circled"></Icon>&nbsp;最多支持35个字符，当前已输入 <span
                class="main-color">{{taskNameLength}}</span> / 35个字符。</span>
            </div>
            <div class="baby-title ml-45 mt-20">
              <span class="required">宝贝类型：</span>
              <iSelect v-model="taskRelease.itemType" style="width:200px">
                <Option-group v-for="parentItem in itemCatalogList" v-if="parentItem.level == 1" :label="parentItem.name" :key="parentItem.id">
                  <iOption
                    v-if="item.level == 2 && item.parentItemCatalog && item.parentItemCatalog.id == parentItem.id"
                    v-for="item in itemCatalogList" :value="item.id" :key="item.name">{{ item.name }}
                  </iOption>
                </Option-group>
              </iSelect>
            </div>
            <div class="baby-img ml-45 mt-20">
              <span class="required left mt-20 mr-5">活动主图：</span>
              <Upload
                ref="upload"
                :show-upload-list="false"
                :default-file-list="mainDefaultList"
                :on-remove="removeMainImage"
                :on-success="handleSuccess"
                :format="['jpg','jpeg','png','gif','bmp']"
                :max-size="300"
                name="task"
                :on-format-error="handleFormatError"
                :on-exceeded-size="handleMaxSize"
                type="drag">
                <div style="width: 58px;height:58px;line-height: 58px;">
                  <Icon type="camera" size="20"></Icon>
                </div>
              </Upload>
              <p class="size-color pl-60 mt-10">点击或者拖拽自主上传图片，支持jpg \ jpeg \ png \ gif \ bmp格式，最佳尺寸400*400（像素），不超过300K，可与宝贝主图一致</p>
            </div>
            <div class="baby-url ml-45 mt-20">
              <span class="required">宝贝地址：</span>
              <iInput v-model="taskRelease.itemUrl" placeholder="请输入宝贝地址" style="width: 296px"></iInput>
            </div>
            <div class="store-name ml-45 mt-20">
              <span class="required">掌柜旺旺：</span>
              <iInput v-model="taskRelease.storeName" placeholder="请输入掌柜旺旺" style="width: 296px"></iInput>
            </div>
            <div class="baby-number ml-45 mt-20">
              <span class="required">宝贝数量：</span>
              <iInput v-model="taskRelease.taskCount" placeholder="请输入宝贝数量" style="width: 120px"></iInput>
              <span>份</span>
            </div>
            <div class="baby-price ml-45 mt-20">
              <span class="required">宝贝单价：</span>
              <iInput v-model.number="taskRelease.itemPrice" @on-change="clearDiscount" placeholder="请输入宝贝单价" style="width: 120px"></iInput>
              <span>元</span>
              <span v-show="taskRelease.itemPrice && taskRelease.itemPrice < 1" class="main-color ml-20"><Icon
                color="#f60" type="information-circled"></Icon>&nbsp;每份试用品的价值必须在1元以上</span>
              <p class="size-color pl-60 mt-8">活动活动期间，商家不允许修改下单页商品信息，经核查属实，本平台有权将活动担保金返还已获得资格的秀客，商家账号按相应规则处罚</p>
            </div>
            <div class="discount ml-40 mt-20">
              <span class="required">折扣/活动：</span>
              <Radio-group v-model="taskRelease.discountType">
                <Radio label="discount_0">
                  <span>免费试用</span>
                </Radio>
                <Radio label="discount_9_9" :disabled="discountDisabled.discount_9_9.disabled">
                  <span>9.9元试用（50元以上的宝贝可选）</span>
                </Radio>
                <Radio label="discount_49_9" :disabled="discountDisabled.discount_49_9.disabled">
                  <span>49.9元试用（150元以上的宝贝可选）</span>
                </Radio>
                <Radio label="discount_99_9" :disabled="discountDisabled.discount_99_9.disabled">
                  <span>99.9元试用（250元以上的宝贝可选）</span>
                </Radio>
              </Radio-group>
              <p class="size-color pl-60 mt-8" v-show="taskRelease.discountType !== 'discount_0'">秀客以<span class="main-color">{{discountDisabled[taskRelease.discountType].buyPrice}}</span>元价格在淘宝上购买，活动成功后返款<span class="main-color">{{discountDisabled[taskRelease.discountType].buyPrice - discountDisabled[taskRelease.discountType].returnPrice}}</span>元给秀客！</p>
            </div>
            <div class="baby-pinkage ml-45 mt-20">
              <span class="required left">是否包邮：</span>
              <Radio-group v-model="taskRelease.pinkage">
                <Radio label="true">
                  <span>宝贝包邮，无需修改运费</span>
                </Radio>
                <p style="height: 10px;"></p>
                <Radio label="false">
                  <span>宝贝不包邮，需要额外多垫付10元邮费，随货款一起对买手实行多退少补返还！</span>
                </Radio>
              </Radio-group>
            </div>
            <div class="baby-payment ml-45 mt-20">
              <span class="required left">付款方式：</span>
              <Radio-group v-model="taskRelease.paymentMethod">
                <Radio label="all">
                  <span>无所谓（可以使用花呗、信用卡等付款，也可以不用）</span>
                </Radio>
                <p style="height: 10px;"></p>
                <Radio label="no_hua_and_credit_pay">
                  <span>禁止使用花呗、信用卡付款</span>
                </Radio>
              </Radio-group>
            </div>
            <div class="task-remark ml-45 mt-20">
              <span class="left ml-5">下单备注：</span>
              <iInput class="task-remark-input"  type="textarea" :rows="6" placeholder="请在这里输入需要秀客注意的事项，例如：SKU信息等，这里的信息会无条件展示出来。" v-model="taskRelease.remark"></iInput>
            </div>
            <div class="product-introduction ml-45 mt-20">
              <span class="left ml-5">商品简介：</span>
              <quill-editor ref="myTextEditor"
                            v-model="taskRelease.itemDescription"
                            :options="editorOption"
                            @blur="onEditorBlur($event)"
                            @focus="onEditorFocus($event)"
                            @ready="onEditorReady($event)">
              </quill-editor>
              <form action="" method="post" enctype="multipart/form-data" id="uploadFormMulti">
                <input style="display: none" :id="uniqueId" type="file" name="avator" multiple accept="image/jpg,image/jpeg,image/png,image/gif" @change="uploadImg">
              </form>
            </div>
          </div>
          <div class="order-set mt-22">
            <div class="activity-info-title" v-if="taskRelease.taskType !== 'direct_access'">{{getSetType}}下单条件设置</div>
            <!--PC搜索下单设置-->
            <template v-if="taskRelease.taskType === 'pc_search'">
              <div class="baby-main-img ml-40 mt-20">
                <span class="required left mr-5 mt-20">宝贝主图：</span>
                <Upload
                  key="pc-upload"
                  ref="upload"
                  name="task"
                  :show-upload-list="false"
                  :default-file-list="pcDefaultList"
                  :on-remove="removePcImage"
                  :on-success="pcBabyImgSuccess"
                  :format="['jpg','jpeg','png','gif','bmp']"
                  :max-size="300"
                  :on-format-error="handleFormatError"
                  :on-exceeded-size="handleMaxSize"
                  type="drag">
                  <div style="width: 58px;height:58px;line-height: 58px;">
                    <Icon type="camera" size="20"></Icon>
                  </div>
                </Upload>
                <p
                  class="size-color pl-60 mt-10">
                  点击或者拖拽自主上传图片，支持jpg \ jpeg \ png \ gif \ bmp格式，最佳尺寸400*400（像素），不超过300K，可与宝贝主图一致</p>
              </div>
              <div class="search-keyword mt-20 ml-28">
                <span class="required">搜索关键词：</span>
                <iInput v-model="PcTaskDetail.searchKeyword" placeholder="请输入搜索关键词" style="width: 260px"></iInput>
                <span class="size-color2">（PC端请确保10页以内，若是长尾关键词请不要过量补单）</span>
              </div>
              <div class="sort-by ml-40 mt-20">
                <span class="required">排序方式：</span>
                <Radio-group v-model="PcTaskDetail.searchSort">
                  <Radio label="zong_he">
                    <span>综合排序</span>
                  </Radio>
                  <Radio label="xiao_liang">
                    <span>销售排序</span>
                  </Radio>
                  <Radio label="ren_qi">
                    <span>人气排序</span>
                  </Radio>
                </Radio-group>
              </div>
              <div class="search-price ml-40 mt-20">
                <span class="required">展示价格：</span>
                <iInput v-model.number="PcTaskDetail.searchPagePrice" placeholder="请输入搜索列表页展示价格"
                        style="width: 160px"></iInput>
                <span class="size-color2">（务必亲自搜索，确认价格准确）</span>
              </div>
              <div class="baby-location ml-15 mt-20">
                <span class="required">宝贝搜索位置：</span>
                <span>第</span>
                <iInput v-model.number="PcTaskDetail.searchPagePositionMin" style="width: 40px"></iInput>
                <span>---</span>
                <iInput v-model.number="PcTaskDetail.searchPagePositionMax" style="width: 40px"></iInput>
                <span>页</span>
                <p class="size-color2 ml-80 mt-6">宝贝参考位置页数差值最大值不大于3页（如果PC端排名在10页以后， 可使用下面的卡条件功能）</p>
              </div>
              <div class="screen-condition ml-45 mt-20 clear">
                <span class="left">刷选条件：</span>
                <div class="left ml-5">
                  <Checkbox-group v-model="PcTaskDetail.searchFilter">
                    <Checkbox label="pinkage">
                      <span>包邮</span>
                    </Checkbox>
                    <Checkbox label="mobile_exclusive">
                      <span>手机专享</span>
                    </Checkbox>
                    <Checkbox label="tao_coin_deduction">
                      <span>淘金币抵扣</span>
                    </Checkbox>
                    <Checkbox label="sales_return_7_plus">
                      <span>7+天退货</span>
                    </Checkbox>
                    <Checkbox label="tmall">
                      <span>天猫</span>
                    </Checkbox>
                    <p style="height: 10px;"></p>
                    <Checkbox label="global_shopping">
                      <span>全球购</span>
                    </Checkbox>
                    <Checkbox label="overseas_goods">
                      <span>海外商品</span>
                    </Checkbox>
                    <Checkbox label="consumer_protect">
                      <span>消费者保障</span>
                    </Checkbox>
                    <Checkbox label="pay_after_receive">
                      <span>货到付款</span>
                    </Checkbox>
                    <Checkbox label="hua_pay_installment">
                      <span>花呗分期</span>
                    </Checkbox>
                    <Checkbox label="wangwang_online">
                      <span>旺旺在线</span>
                    </Checkbox>
                  </Checkbox-group>
                </div>
              </div>
              <div class="price-select ml-45 mt-20">
                <span>价格区间：</span>
                <iInput v-model.number="PcTaskDetail.priceRangeMin" style="width: 40px"></iInput>
                <span>---</span>
                <iInput v-model.number="PcTaskDetail.priceRangeMax" style="width: 40px"></iInput>
                <span>元</span>
              </div>
              <div class="deliver-address ml-56 mt-20">
                <span>发货地：</span>
                <iInput v-model="PcTaskDetail.deliverAddress" style="width: 120px"></iInput>
                <span class="size-color2 ml-5">出于安全考虑，请勿大量使用</span>
              </div>
            </template>
            <!--APP搜索下单设置-->
            <template v-else-if="taskRelease.taskType === 'app_search'">
              <div class="baby-main-img ml-40 mt-20">
                <span class="required left mr-5 mt-20">宝贝主图：</span>
                <Upload
                  ref="upload"
                  key="app-upload"
                  :show-upload-list="false"
                  :on-success="appBabyImgSuccess"
                  :default-file-list="appDefaultList"
                  :on-remove="removeAppImage"
                  :format="['jpg','jpeg','png','gif','bmp']"
                  :max-size="300"
                  name="task"
                  :on-format-error="handleFormatError"
                  :on-exceeded-size="handleMaxSize"
                  type="drag">
                  <div style="width: 58px;height:58px;line-height: 58px;">
                    <Icon type="camera" size="20"></Icon>
                  </div>
                </Upload>
                <p
                  class="size-color pl-60 mt-10">
                  点击或者拖拽自主上传图片，支持jpg \ jpeg \ png \ gif \ bmp格式，最佳尺寸400*400（像素），不超过300K，可与宝贝主图一致</p>
              </div>
              <div class="search-keyword mt-20 ml-28">
                <span class="required">搜索关键词：</span>
                <iInput v-model="AppTaskDetail.searchKeyword" placeholder="请输入搜索关键词"
                        style="width: 260px"></iInput>
                <span class="size-color2">（APP端请确保在120位以内，若是长尾关键词请不要过量补单）</span>
              </div>
              <div class="sort-by ml-40 mt-20">
                <span class="required">排序方式：</span>
                <Radio-group v-model="AppTaskDetail.searchSort">
                  <Radio label="zong_he">
                    <span>综合排序</span>
                  </Radio>
                  <Radio label="xiao_liang">
                    <span>销售排序</span>
                  </Radio>
                </Radio-group>
              </div>
              <div class="search-price ml-40 mt-20">
                <span class="required">展示价格：</span>
                <iInput v-model="AppTaskDetail.searchPagePrice" placeholder="请输入搜索列表页展示价格"
                        style="width: 160px"></iInput>
                <span class="size-color2">（务必亲自搜索，确认价格准确）</span>
              </div>
              <div class="baby-location ml-15 mt-20">
                <span class="required">宝贝搜索位置：</span>
                <span>从上往下数第</span>
                <iInput v-model="AppTaskDetail.searchRankPosition" style="width: 40px"></iInput>
                <span>个宝贝左右</span>
                <p class="size-color2 ml-80 mt-6">位置统一切换为一列展示后，在数位置。（如果移动端排名在100名以内，可使用下面的卡条件功能）</p>
              </div>
              <div class="screen-condition ml-45 mt-20 clear">
                <span class="left">刷选条件：</span>
                <div class="left ml-5">
                  <Checkbox-group v-model="AppTaskDetail.searchFilter">
                    <Checkbox label="pinkage">
                      <span>包邮</span>
                    </Checkbox>
                    <Checkbox label="mobile_exclusive">
                      <span>手机专享</span>
                    </Checkbox>
                    <Checkbox label="tao_coin_deduction">
                      <span>淘金币抵扣</span>
                    </Checkbox>
                    <Checkbox label="sales_return_7_plus">
                      <span>7+天退货</span>
                    </Checkbox>
                    <Checkbox label="tmall">
                      <span>天猫</span>
                    </Checkbox>
                    <p style="height: 10px;"></p>
                    <Checkbox label="global_shopping">
                      <span>全球购</span>
                    </Checkbox>
                    <Checkbox label="overseas_goods">
                      <span>海外商品</span>
                    </Checkbox>
                    <Checkbox label="consumer_protect">
                      <span>消费者保障</span>
                    </Checkbox>
                    <Checkbox label="pay_after_receive">
                      <span>货到付款</span>
                    </Checkbox>
                    <Checkbox label="hua_pay_installment">
                      <span>花呗分期</span>
                    </Checkbox>
                  </Checkbox-group>
                </div>
              </div>
              <div class="price-select ml-45 mt-20">
                <span>价格区间：</span>
                <iInput v-model.number="AppTaskDetail.priceRangeMin" style="width: 40px"></iInput>
                <span>---</span>
                <iInput v-model.number="AppTaskDetail.priceRangeMax" style="width: 40px"></iInput>
                <span>元</span>
              </div>
              <div class="deliver-address ml-56 mt-20">
                <span>发货地：</span>
                <iInput v-model="AppTaskDetail.deliverAddress" style="width: 120px"></iInput>
                <span class="size-color2 ml-5">出于安全考虑，请勿大量使用</span>
              </div>
            </template>
            <!--淘口令下单设置-->
            <template v-else-if="taskRelease.taskType === 'tao_code'">
              <div class="tao_code ml-56 mt-20">
                <span class="required">淘口令：</span>
                <iInput v-model="taoCodeTaskDetail.taoCode" placeholder="请输入任务宝贝的淘口令" style="width: 320px"></iInput>
              </div>
            </template>
          </div>
        </div>
      </div>
      <div class="footer-btn" v-show="stepName === 'information'" @click="stepNext">下一步</div>
      <!--存入担保金详情-->
      <div class="deposits-received" v-show="stepName === 'deposit'">
        <div class="deposits-received-title mt-20 mb-20">活动活动信息已成功保存，请您存入本次活动的活动担保金。</div>
        <div class="deposits-received-info">您现在为 <span class="second-color">{{taskRelease.taskName}}</span> 存入活动担保金<span
          class="second-color">{{(taskRelease.taskCount * oneBond).toFixed(2)}}</span>元，此笔款项将作为发布活动活动诚信担保的重要工具，待秀客完成活动流程后将返还给每个秀客 <span
          class="second-color">{{oneBond}}</span> 元.
        </div>
        <div class="description-fees mt-40">
          <h3>费用说明：</h3>
          <div class="description-fees-con mt-10">
            <p>
              活动担保金 = 份数 × 单品活动担保金 =<span>{{taskRelease.taskCount}}</span>×<span>{{oneBond}}</span>= <span>{{(taskRelease.taskCount * oneBond).toFixed(2)}}</span>元
            </p>
            <p class="mt-6">单品推广费 = 单品活动担保金 × 费率 =<span>{{oneBond}}</span>× <span>6%</span>
              = <span>{{(oneBond * 0.06).toFixed(2)}}</span>元<span v-if="oneBond * 0.06 > 3">（单品推广费超过平台设定的最高上限3.00元，本次实际收取的单品推广费用为3.00元）</span>
            </p>
            <p class="mt-6">总推广费用 = 单品推广费用 × 份数 =<span>{{onePromotionExpenses}}</span>× <span>{{taskRelease.taskCount}} = <span>{{allPromotionExpenses}}</span></span>元
            </p>
            <p class="mt-6">总费用 = 活动担保金 + 总推广费用 = <span>{{orderMoney}}</span>元</p>
          </div>
        </div>
        <div class="pay-info mt-40" v-if="isBalance && !priceHasChange">本次总共要支付的金额为：<span class="second-color">{{orderMoney}}</span>&nbsp;元。您的账户的当前余额为：<strong>{{getUserBalance || 0}}</strong>&nbsp;元
        </div>
        <div class="pay-info mt-40" v-if="!isBalance && !priceHasChange">本次总共要支付的金额为：<strong>{{orderMoney}}</strong>&nbsp;元。您账户余额为：<strong>{{getUserBalance || 0}}</strong>&nbsp;元，还需充值：<span
          class="second-color">{{(orderMoney - getUserBalance).toFixed(2)}}</span>&nbsp;元。
        </div>
        <div class="pay-info mt-40" v-if="isBalance && priceHasChange">
          该任务已付担保金 <strong>{{paidDeposit.toFixed(2)}}</strong>元，本次修改需要支付超出部分的金额为：<strong class="main-color">{{replenishMoney}}</strong>元。您账号的当前余额为：<strong>{{getUserBalance || 0}}</strong>&nbsp;元
        </div>
        <div class="pay-info mt-40" v-if="!isBalance && priceHasChange">该任务已付担保金 <strong>{{paidDeposit}}</strong>元，本次修改需要支付超出部分的金额为：<strong
          class="main-color">{{replenishMoney}}</strong>元。您账号的当前余额为：<strong>{{getUserBalance || 0}}</strong>&nbsp;元,还需充值：<span
          class="second-color">{{(orderMoney - getUserBalance).toFixed(2)}}</span>&nbsp;元。
        </div>
        <div class="description-fees-footer">
          <span class="pay-btn" v-if="isBalance" @click="openRecharge">前去支付</span>
          <span class="pay-btn" v-else @click="openRecharge">前去充值</span>
          <span class="return" @click="returnUpStep">返回上一步</span>
          <router-link to="/user/activity-management/list">秀品活动管理</router-link>
        </div>
      </div>
      <!--活动提交成功提示-->
      <div class="audit" v-show="stepName === 'audit'">
        <div class="audit-title">
          <Icon type="checkmark-circled" color="#309630" size=28></Icon>
          <span>活动已提交</span>
        </div>
        <div class="audit-con mt-20">亲当前的活动已提交，工作人员会在一个工作日内审核您的活动！敬请关注~</div>
        <div class="audit-footer mt-40">
          <router-link to="/user/activity-management/list">点此查看活动管理</router-link>
          <span class="ml-20">有问题？联系客服</span>
        </div>
      </div>
      <!--担保金支付弹框-->
      <div class="pay-model" v-if="showPayModel">
        <PayModel :orderMoney="!priceHasChange ? orderMoney : replenishMoney" @confirmPayment="confirmPayment">
          <i slot="closeModel" class="close-recharge" @click="closeRecharge">&times;</i>
          <div slot="noBalance" class="title-tip"><span class="size-color3"><Icon color="#FF2424" size="18px"
                                                                                  type="ios-information"></Icon><span
            class="ml-10">亲，您的余额不足，请充值。</span></span>还需充值<strong
            class="size-color3">{{(orderMoney - getUserBalance).toFixed(2)}}</strong>元
          </div>
          <div slot="isBalance" class="title-tip">
            <Icon color="#FF2424" size="18px" type="ios-information"></Icon>
            <span class="ml-10">您本次需要支付金额为 <span
              class="size-color3">{{!priceHasChange ? orderMoney : replenishMoney}}</span> 元。</span></div>
        </PayModel>
      </div>
      <!--用户修改价格比原始价格高需要补差价提示弹框-->
      <div class="editPriceModel">
        <Modal v-model="editPriceAfterModel">
          <div class="clear mt-40">
            <div class="left mt-5">
              <Icon color="#f60" size="32" type="information-circled"></Icon>
            </div>
            <div class="left ml-10">
              <p style="font-size: 14px;">由于您修改了当前宝贝价格/包邮条件/发放数量等，且修改后的</p>
              <p style="font-size: 14px;">价格高于原活动担保金，因此需要对超出部分进行支付。</p>
            </div>
          </div>
          <div slot="footer">
            <iButton type="error" size="large" @click="continueNextStep">我已了解，继续下一步</iButton>
            <iButton style="margin-left: 35px;" type="error" size="large" @click="IThink">我再想想</iButton>
          </div>
        </Modal>
      </div>
      <!--用户修改价格比原始价格低提示弹框-->
      <div class="editPriceToLow">
        <Modal v-model="editPriceToLowAfterModel">
          <div class="clear mt-40">
            <div class="left mt-5">
              <Icon color="#f60" size="32" type="information-circled"></Icon>
            </div>
            <div class="left ml-10">
              <p style="font-size: 14px;">由于您修改了当前宝贝价格/包邮条件/发放数量等，且修改后的</p>
              <p style="font-size: 14px;">价格低于原价格，对于超出部分的费用将在活动结算时返还给您。</p>
            </div>
          </div>
          <div slot="footer">
            <iButton type="error" size="large" @click="toLowContinueNextStep">我已了解，继续下一步</iButton>
            <iButton style="margin-left: 35px;" type="error" size="large" @click="IThink">我再想想</iButton>
          </div>
        </Modal>
      </div>
      <!--商家发布任务活动总价低于500元提醒弹框-->
    <!--  <Modal v-model="price500Model" width="360">
        <p slot="header" style="color:#f60;text-align:center">
          <Icon type="information-circled"></Icon>
          <span>温馨提示</span>
        </p>
        <div class="text-ct">
          <p>您发布的活动总价值必须在500元以上</p>
        </div>
        <div slot="footer">
          <iButton type="error" size="large" long @click="price500Model = false">我知道了</iButton>
        </div>
      </Modal>-->
    </div>
  </div>
</template>

<script>
  import {Quill, quillEditor} from 'vue-quill-editor'
  import Icon from 'iview/src/components/icon'
  import Form from 'iview/src/components/form'
  import Input from 'iview/src/components/input'
  import Checkbox from 'iview/src/components/checkbox'
  import Button from 'iview/src/components/button'
  import Radio from 'iview/src/components/radio'
  import Modal from 'iview/src/components/modal'
  import {Select, Option, OptionGroup} from 'iview/src/components/select'
  import Upload from '@/components/upload'
  import Steps from 'iview/src/components/steps'
  import PayModel from '@/components/PayModel'
  import api from '@/config/apiConfig'
  import {aliCallbackImgUrl} from '@/config/env'
  import {aliUploadImg, isNumber, isInteger, isAliUrl, randomString, extendDeep, decode} from '@/config/utils'

  export default {
    name: 'TaskReleaseProcess',
    components: {
      quillEditor: quillEditor,
      iInput: Input,
      iForm: Form,
      FormItem: Form.Item,
      Checkbox: Checkbox,
      CheckboxGroup: Checkbox.Group,
      iButton: Button,
      Icon: Icon,
      Radio: Radio,
      RadioGroup: Radio.Group,
      iSelect: Select,
      iOption: Option,
      Upload: Upload,
      Steps: Steps,
      Step: Steps.Step,
      OptionGroup: OptionGroup,
      Modal: Modal,
      PayModel: PayModel
    },
    data() {
      return {
        blockOrNone:false,
        name: 'base-example',
        uniqueId: 'uniqueId',
        addImgRange: null,
        editorOption: {
          placeholder: "请在这里编辑您的商品简介！",
          modules: {
            toolbar: [
              ['bold', 'italic', 'underline', 'strike'],
              [{'list': 'ordered'}, {'list': 'bullet'}],
              [{'header': [1, 2, 3, 4, 5, 6, false]}],
              [{'color': []}, {'background': []}],
              [{'align': []}],
              ['image']
            ]
          }
        },
        showPayModel: false,
        current: 0,
        stepName: 'information',
        taskPayId: null,
        itemCatalogList: [],
        mainDefaultList: [],
        appDefaultList: [],
        pcDefaultList: [],
        PcTaskDetail: {
          itemMainImage: null,
          searchKeyword: null,
          searchSort: 'zong_he',
          searchPagePrice: null,
          searchPagePositionMin: null,
          searchPagePositionMax: null,
          searchFilter: [],
          priceRangeMin: null,
          priceRangeMax: null,
          deliverAddress: null,
        },
        AppTaskDetail: {
          itemMainImage: null,
          searchKeyword: null,
          searchSort: 'zong_he',
          searchPagePrice: null,
          searchRankPosition: null,
          searchFilter: [],
          priceRangeMin: null,
          priceRangeMax: null,
          deliverAddress: null,
        },
        taoCodeTaskDetail: {
          taoCode: null,
          accessDescription: null
        },
        taskRelease: {
          taskType: 'pc_search',
          taskDaysDuration: null,
          onlyShowForQualification: false,
          refuseOldShowker: false,
          needBrowseCollectAddCart: false,
          taskName: null,
          itemType: null,
          taskMainImage: null,
          itemUrl: null,
          storeName: null,
          taskCount: null,
          itemPrice: null,
          discountType: 'discount_0',
          pinkage: "true",
          paymentMethod: "all",
          remark: null,
          itemDescription: '',
          taskId: null,
          taskDetail: {}
        },
        discountDisabled: {
          discount_0: {
            disabled: false,
            buyPrice: 0,
            returnPrice: 0,
          },
          discount_9_9: {
            disabled: true,
            buyPrice: 50,
            returnPrice: 9.9,
          },
          discount_49_9: {
            disabled: true,
            buyPrice: 150,
            returnPrice: 49.9,
          },
          discount_99_9: {
            disabled: true,
            buyPrice: 250,
            returnPrice: 99.9,
          }
        },
        editPriceAfterModel: false,
        editPriceToLowAfterModel: false,
        price500Model: false,
        priceHasChange: false,
        paidDeposit: 0,
        taskStatus: null,
        editTaskId: null,
        getMemberStatus: null,
      }
    },
    mounted() {
      let _this = this;
      let imgHandler = async function (image) {
        _this.addImgRange = _this.$refs.myTextEditor.quill.getSelection();
        if (image) {
          let fileInput = document.getElementById(_this.uniqueId);
          fileInput.click()
        }
      };
      _this.$refs.myTextEditor.quill.getModule("toolbar").addHandler("image", imgHandler);
    },
    created() {
      this.checkMemberForTask();
      this.getItemCatalog();
      let taskId = decode(this.$route.query.q);
      if (taskId) {
        this.editTaskId = taskId;
        this.getTaskInfo();
      }
    },
    computed: {
      /**
       * 活动类型名称
       * @return {string}
       */
      getSetType: function () {
        if (this.taskRelease.taskType === "pc_search") {
          return "PC搜索"
        } else if (this.taskRelease.taskType === "app_search") {
          return "手淘搜索"
        } else if (this.taskRelease.taskType === "tao_code") {
          return "淘口令"
        } else {
          return "宝贝链接"
        }
      },
      /**
       * 从vuex中获取余额
       * @return {number}
       */
      getUserBalance: function () {
        return this.$store.getters.getUserBalance;
      },

      /**
       * 计算商家需要存入的担保金（当用户勾选折扣试用的时候：宝贝单价 - 对应的折扣价格）
       * @return {number}
       */
        newItemPrice: function () {
        return this.taskRelease.discountType === 'discount_0' ? this.taskRelease.itemPrice : this.taskRelease.itemPrice - this.discountDisabled[this.taskRelease.discountType].returnPrice;
      },

      /**
       * 计算最终商家发布单品活动担保金（商家需要存入的担保金 + 是否包邮）
       * @return {number}
       */
      oneBond: function () {
        return this.taskRelease.pinkage === 'true' ? (this.newItemPrice * 100).toFixed(2) / 100 : ((this.newItemPrice * 100).toFixed(2) / 100 + 10).toFixed(2);
      },

      /**
       * 计算单品推广费用（单品推广费最高上限3元）
       * @return {number}
       */
      onePromotionExpenses: function () {
        return this.oneBond * 0.06 > 3 ? 3 : ((this.oneBond * 100).toFixed(2) / 100 * 0.06).toFixed(2) * 1;
      },
      /**
       * 计算总推广费用
       * @return {number}
       */
      allPromotionExpenses: function () {
        return (this.onePromotionExpenses * this.taskRelease.taskCount).toFixed(2) * 1;
      },
      /**
       * 计算订单总金额
       * @return {number}
       */
      orderMoney: function () {
        return (((this.taskRelease.taskCount * this.oneBond * 100) + this.allPromotionExpenses * 100) / 100).toFixed(2) * 1;
      },
      /**
       * 计算修改价格后需要补充的金额
       * @return {number}
       */
      replenishMoney: function () {
        return this.priceHasChange ? ((this.orderMoney * 100 - this.paidDeposit * 100) / 100).toFixed(2) * 1 : 0;
      },
      /**
       * 计算余额是否足够支付订单金额
       * @return {boolean}
       */
      isBalance: function () {
        return this.orderMoney <= this.getUserBalance
      },
      /**
       * 计算活动标题输入字符数
       * @return {number}
       */
      taskNameLength: function () {
        return this.taskRelease.taskName ? this.taskRelease.taskName.length : 0;
      },
    },
    methods: {
      clearDiscount() {
        let _this = this;
        let itemPrice =  _this.taskRelease.itemPrice;
        if(itemPrice < 50){
          if(!_this.discountDisabled.discount_9_9.disabled){
            _this.discountDisabled.discount_9_9.disabled = true;
          }
          if(!_this.discountDisabled.discount_49_9.disabled){
            _this.discountDisabled.discount_49_9.disabled = true;
          }
          if(!_this.discountDisabled.discount_99_9.disabled){
            _this.discountDisabled.discount_99_9.disabled = true;
          }
          _this.taskRelease.discountType = 'discount_0';
        }
        if(itemPrice >= 50){
          _this.discountDisabled.discount_9_9.disabled = false;
        }
        if(itemPrice >= 150){
          _this.discountDisabled.discount_49_9.disabled = false;
        }
        if(itemPrice >= 250){
          _this.discountDisabled.discount_99_9.disabled = false;
        }
      },
      checkMemberForTask() {
        let _this = this;
        api.checkMemberForTask().then(res => {
          if (res) {
            _this.getMemberStatus = res.statusCode;
            _this.blockOrNone = res.statusCode !== 'need_member_for_more_task' && res.statusCode !== 'need_member_for_more_audit';
          } else {
            _this.$Message.error(res.msg)
          }
        });
      },
      openMember() {
        this.$router.push({name: 'VipMember'})
      },
      onEditorBlur(editor) {
      },
      onEditorFocus(editor) {
      },
      onEditorReady(editor) {
      },
      handleSuccess(res) {
        this.taskRelease.taskMainImage = aliCallbackImgUrl + res.name;
  },
      pcBabyImgSuccess(res) {
        this.PcTaskDetail.itemMainImage = aliCallbackImgUrl + res.name;
      },
      appBabyImgSuccess(res) {
        this.AppTaskDetail.itemMainImage = aliCallbackImgUrl + res.name;
      },
      handleFormatError(file) {
        this.$Modal.warning({
          title: '文件格式不正确',
          content: '图片 ' + file.name + ' 格式不正确，请上传 jpg 或 jpeg 或 gif 或 bmp 格式的图片。'
        });
      },
      handleMaxSize(file) {
        this.$Modal.warning({
          title: '超出文件大小限制',
          content: '图片 ' + file.name + ' 太大，不能超过 300K'
        });
      },
      stepNext() {
        let _this = this;
        if (!_this.taskRelease.taskDaysDuration) {
          _this.$Message.warning('亲，活动时长不能为空！');
          return;
        }
        if (!isInteger(_this.taskRelease.taskDaysDuration)) {
          _this.$Message.warning('亲，活动时长必须为数字！');
          return;
        }
        if (_this.taskRelease.taskDaysDuration < 3) {
          _this.$Message.warning('亲，活动时长最短为3天起！');
          return;
        }
        if (_this.taskRelease.taskDaysDuration > 30) {
          _this.$Message.warning('亲，活动时长最长为30天！');
          return;
        }
        if (!_this.taskRelease.taskName) {
          _this.$Message.warning('亲，活动标题不能为空！');
          return;
        }
        if (_this.taskRelease.taskName.length > 35) {
          _this.$Message.warning('亲，活动标题最多35个字符！');
          return;
        }
        if (!_this.taskRelease.itemType) {
          _this.$Message.warning('亲，宝贝类型不能为空！');
          return;
        }
        if (!_this.taskRelease.taskMainImage) {
          _this.$Message.warning('亲，请上传活动主图！');
          return;
        }
        if (!_this.taskRelease.itemUrl) {
          _this.$Message.warning('亲，宝贝地址不能为空！');
          return;
        }
        if (!isAliUrl(_this.taskRelease.itemUrl)) {
          _this.$Message.warning('亲，只能输入淘宝或者天猫宝贝地址！');
          return;
        }
        if (!_this.taskRelease.storeName) {
          _this.$Message.warning('亲，掌柜旺旺不能为空！');
          return;
        }
        if (!_this.taskRelease.taskCount) {
          _this.$Message.warning('亲，宝贝数量不能为空！');
          return;
        }
        if (!isInteger(_this.taskRelease.taskCount)) {
          _this.$Message.warning('亲，宝贝数量必须为数字！');
          return;
        }
        if (!_this.taskRelease.itemPrice) {
          _this.$Message.warning('亲，宝贝单价不能为空！');
          return;
        }
        if (!isNumber(_this.taskRelease.itemPrice)) {
          _this.$Message.warning('亲，宝贝单价必须为数字！');
          return;
        }
        if (_this.taskRelease.itemPrice < 1) {
          _this.$Message.warning('亲，每份试用品的价值必须在1元以上！');
          return;
        }
        if (_this.taskRelease.taskType === 'pc_search') {
          if (!_this.PcTaskDetail.itemMainImage) {
            _this.$Message.warning('亲，请上传PC搜索宝贝主图！');
            return;
          }
          if (!_this.PcTaskDetail.searchKeyword) {
            _this.$Message.warning('亲，搜索关键词不能空！');
            return;
          }
          if (!_this.PcTaskDetail.searchPagePrice) {
            _this.$Message.warning('亲，展示价格不能空！');
            return;
          }
          if (!isNumber(_this.PcTaskDetail.searchPagePrice)) {
            _this.$Message.warning('亲，展示价格必须为数字！');
            return;
          }
          if (!_this.PcTaskDetail.searchPagePositionMin) {
            _this.$Message.warning('亲，宝贝搜索起始位置不能空！');
            return;
          }
          if (!_this.PcTaskDetail.searchPagePositionMax) {
            _this.$Message.warning('亲，宝贝搜索结束位置不能空！');
            return;
          }
          if (_this.PcTaskDetail.searchPagePositionMax < _this.PcTaskDetail.searchPagePositionMin) {
            _this.$Message.warning('亲，宝贝搜索位置起始页不能大于结束页！');
            return;
          }
          if (_this.PcTaskDetail.searchPagePositionMax - _this.PcTaskDetail.searchPagePositionMin > 2) {
            _this.$Message.warning('亲，宝贝搜索位置页数差值最大不大于3页！');
            return;
          }
        }
        if (_this.taskRelease.taskType === 'app_search') {
          if (!_this.AppTaskDetail.itemMainImage) {
            _this.$Message.warning('亲，请上传手淘搜索宝贝主图！');
            return;
          }
          if (!_this.AppTaskDetail.searchKeyword) {
            _this.$Message.warning('亲，搜索关键词不能空！');
            return;
          }
          if (!_this.AppTaskDetail.searchPagePrice) {
            _this.$Message.warning('亲，展示价格不能空！');
            return;
          }
          if (!isNumber(_this.AppTaskDetail.searchPagePrice)) {
            _this.$Message.warning('亲，展示价格必须为数字！');
            return;
          }
          if (!_this.AppTaskDetail.searchRankPosition) {
            _this.$Message.warning('亲，宝贝搜索位置不能空！');
            return;
          }
        }
        if (_this.taskRelease.taskType === 'tao_code') {
          if (!_this.taoCodeTaskDetail.taoCode) {
            _this.$Message.warning('亲，任务宝贝淘口令不能为空！');
            return;
          }
        }
        let status = _this.taskStatus;
        let type = _this.$route.query.type;
       /* if (_this.taskRelease.taskCount * _this.oneBond < 500) {
          _this.price500Model = true;
          return;
        }*/
        if ((status === 'waiting_modify' || status === 'waiting_pay') && _this.paidDeposit === _this.orderMoney && !type) {
          _this.taskCreate(true);
        } else if ((status === 'waiting_modify' || status === 'waiting_pay') && _this.paidDeposit > _this.orderMoney && !type) {
          this.editPriceToLowAfterModel = true;
        } else if ((status === 'waiting_modify' || status === 'waiting_pay') && _this.paidDeposit > 0 && _this.paidDeposit < _this.orderMoney && !type) {
          _this.editPriceAfterModel = true;
          _this.priceHasChange = true;
        } else if (type && type === 'copy') {
          _this.taskCreate(false);
        } else {
          _this.taskCreate(false);
        }
      },
      taskCreate(type) {
        let _this = this;
        let pcTaskDetail = extendDeep(_this.PcTaskDetail);
        let appTaskDetail = extendDeep(_this.AppTaskDetail);
        switch (_this.taskRelease.taskType) {
          case 'pc_search' :
            pcTaskDetail.searchPagePrice = (pcTaskDetail.searchPagePrice * 100).toFixed(0) * 1;
            pcTaskDetail.priceRangeMax = pcTaskDetail.priceRangeMax > 0 ? (pcTaskDetail.priceRangeMax * 100).toFixed(0) * 1 : null;
            pcTaskDetail.priceRangeMin = pcTaskDetail.priceRangeMin > 0 ? (pcTaskDetail.priceRangeMin * 100).toFixed(0) * 1 : null;
            _this.taskRelease.taskDetail = JSON.stringify(pcTaskDetail);
            break;
          case 'app_search' :
            appTaskDetail.searchPagePrice = (appTaskDetail.searchPagePrice * 100).toFixed(0) * 1;
            appTaskDetail.priceRangeMax = appTaskDetail.priceRangeMax > 0 ? (appTaskDetail.priceRangeMax * 100).toFixed(0) * 1 : null;
            appTaskDetail.priceRangeMin = appTaskDetail.priceRangeMin > 0 ? (appTaskDetail.priceRangeMin * 100).toFixed(0) * 1 : null;
            _this.taskRelease.taskDetail = JSON.stringify(appTaskDetail);
            break;
          case 'tao_code' :
            _this.taskRelease.taskDetail = JSON.stringify(_this.taoCodeTaskDetail);
            break;
          case 'direct_access' :
            _this.taskRelease.taskDetail = null;
            break;
        }
        api.taskCreate(_this.taskRelease).then(res => {
          if (res.status) {
            _this.taskPayId = res.data.id;
            if (!_this.taskRelease.taskId) {
              _this.taskRelease.taskId = res.data.id;
            }
            if (type === true) {
              _this.$router.push({name: 'ActivitiesList'});
            } else {
              _this.nextCurrent();
              _this.stepName = 'deposit';
            }
          } else {
            _this.$Message.error(res.msg);
          }
        });
      },
      returnUpStep() {
        let _this = this;
        let type = _this.$route.query.type;
        if ((type && type === 'copy') || !type) {
          _this.editTaskId = _this.taskPayId;
          _this.getTaskInfo();
        } else {
          _this.getTaskInfo();
        }
        _this.stepName = 'information';
        _this.current = 0;
      },
      nextCurrent() {
        this.current += 1;
      },
      IThink() {
        let _this = this;
        _this.editPriceAfterModel = false;
        _this.editPriceToLowAfterModel = false;
      },
      continueNextStep() {
        let _this = this;
        _this.taskCreate(false);
        _this.editPriceAfterModel = false;
      },
      toLowContinueNextStep() {
        this.taskCreate(true);
      },
      getTaskInfo() {
        let _this = this;
        let type = _this.$route.query.type;
        api.getTaskInfo({
          taskId: _this.editTaskId
        }).then(res => {
          if (res.status) {
            _this.mainDefaultList = [];
            _this.pcDefaultList = [];
            _this.appDefaultList = [];
            if (!type) {
              _this.taskRelease.taskId = res.data.id;
            }
            _this.paidDeposit = (res.data.marginPaid + res.data.promotionExpensesPaid) / 100 || 0;
            _this.taskStatus = res.data.taskStatus;
            _this.mainDefaultList.push({src: res.data.taskMainImage});
            res.data.pinkage = res.data.pinkage.toString();
            _this.taskRelease.itemType = res.data.itemCatalog.id;
            for (let k in _this.taskRelease) {
              for (let i in res.data) {
                if (k === i) {
                  _this.taskRelease[k] = res.data[i];
                }
              }
            }
            _this.taskRelease.itemPrice = _this.taskRelease.itemPrice / 100;
            _this.taskRelease.taskDetail = {};
            if (res.data.taskType === 'tao_code') {
              _this.taoCodeTaskDetail = JSON.parse(res.data.taskDetail);
            } else if (res.data.taskType === 'pc_search') {
              _this.PcTaskDetail = JSON.parse(res.data.taskDetail);
              _this.pcDefaultList.push({src: _this.PcTaskDetail.itemMainImage});
              _this.conversionPrice('pc_search');
            } else if (res.data.taskType === 'app_search') {
              _this.AppTaskDetail = JSON.parse(res.data.taskDetail);
              _this.appDefaultList.push({src: _this.AppTaskDetail.itemMainImage});
              _this.conversionPrice('app_search');
            } else {
              _this.taskRelease.taskDetail = {};
            }
          }
        })
      },
      conversionPrice(type) {
        let _this = this;
        switch (type) {
          case 'pc_search' :
            _this.PcTaskDetail.searchPagePrice = (_this.PcTaskDetail.searchPagePrice / 100).toFixed(2) * 1;
            _this.PcTaskDetail.priceRangeMax = _this.PcTaskDetail.priceRangeMax > 0 ? (_this.PcTaskDetail.priceRangeMax / 100).toFixed(2) * 1 : null;
            _this.PcTaskDetail.priceRangeMin = _this.PcTaskDetail.priceRangeMin > 0 ? (_this.PcTaskDetail.priceRangeMin / 100).toFixed(2) * 1 : null;
            break;
          case 'app_search' :
            _this.AppTaskDetail.searchPagePrice = (_this.AppTaskDetail.searchPagePrice / 100).toFixed(2) * 1;
            _this.AppTaskDetail.priceRangeMax = _this.AppTaskDetail.priceRangeMax > 0 ? (_this.AppTaskDetail.priceRangeMax / 100).toFixed(2) * 1 : null;
            _this.AppTaskDetail.priceRangeMin = _this.AppTaskDetail.priceRangeMin > 0 ? (_this.AppTaskDetail.priceRangeMin / 100).toFixed(2) * 1 : null;
            break;
        }
      },
      getItemCatalog() {
        let _this = this;
        api.itemCatalog().then(res => {
          if (res.status) {
            _this.itemCatalogList = res.data
          }
        })
      },
      uploadImg(e) {
        let _this = this;
        let file = e.target.files[0];
        let key = 'task' + '/' + randomString();
        aliUploadImg(key, file).then(res => {
          if (res) {
            let value = aliCallbackImgUrl + res.name + '!orgi75';
            _this.addImgRange = _this.$refs.myTextEditor.quill.getSelection();
            _this.$refs.myTextEditor.quill.insertEmbed(_this.addImgRange !== null ? _this.addImgRange.index : 0, 'image', value, Quill.sources.USER);
            document.getElementById(_this.uniqueId).value = '';
            _this.$Message.success('亲，图片上传成功！');
          }
        }).catch(err => {
          document.getElementById(_this.uniqueId).value = '';
          _this.$Message.warning('亲，图片上传失败！');
        })
      },
      removeMainImage() {
        this.taskRelease.taskMainImage = null;
      },
      removeAppImage() {
        this.AppTaskDetail.itemMainImage = null;
      },
      removePcImage() {
        this.PcTaskDetail.itemMainImage = null;
      },
      openRecharge() {
        this.showPayModel = true;
      },
      closeRecharge() {
        this.showPayModel = false;
      },
      confirmPayment(pwd) {
        let _this = this;
        api.payByBalance({
          fee: _this.orderMoney,
          payPassword: pwd,
          taskId: _this.taskPayId,
          type: _this.priceHasChange ? 'supply_pay' : 'first_pay'
        }).then(res => {
          if (res.status) {
            _this.$store.dispatch('getUserInformation');
            _this.showPayModel = false;
            _this.$Message.success({
              content: '支付成功！',
              duration: 6
            });
            _this.nextCurrent();
            _this.stepName = 'audit';
          } else {
            _this.$Message.error({
              content: res.msg,
              duration: 6
            })
          }
        })
      },
    }
  }
</script>

<style lang="scss" scoped>
  @import 'src/css/mixin';

  .task-release {
    [v-cloak]{
      display: none
    }
    .check-member {
      width: 200px;
      font-size: 18px;
      height: 40px;
      background-color: $mainColor;
      border-color: $mainColor;
    }
    .ml-38{
      margin-left: 38px;
    }
    .main-color {
      color: $mainColor;
    }
    .second-color {
      color: $secondColor;
    }

    .size-color {
      color: #A5A5A5;
    }

    .size-color2 {
      color: #91A2BD;
    }

    .size-color3 {
      color: #FF0100;
    }

    .task-release-title {
      height: 52px;
      line-height: 52px;
      @include sc(20px, #666)
    }

    .activity-con {
      border: 1px solid #F5F5F5;
      padding-bottom: 42px;
    }

    .activity-info-title {
      height: 40px;
      line-height: 40px;
      background-color: #F8F8F8;
      border-bottom: 1px solid #f5f5f5;
      padding-left: 16px;
      @include sc(16px, #666)
    }

    .quill-editor {
      width: 880px;
      display: inline-block;
      height: 200px;
    }

    .footer-btn {
      @include wh(240px, 42px);
      line-height: 42px;
      @include sc(24px, #fff);
      background-color: $mainColor;
      text-align: center;
      margin: 20px auto 42px auto;
      @include transition;
      cursor: pointer;
      &:hover {
        background-color: darken($mainColor, 10%);
      }
    }

    .deposits-received {
      padding-bottom: 226px;
      .deposits-received-title {
        @include sc(16px, #000);
        text-align: center;
      }
      .deposits-received-info {
        text-align: left;
        padding: 0 120px;
        line-height: 32px;
        @include sc(14px, #333);
      }
      .description-fees {
        padding: 0 42px;
      }
      .pay-info {
        @include sc(18px, #000);
        text-align: center;
      }
      .description-fees-footer {
        text-align: center;
        .pay-btn {
          display: inline-block;
          @include wh(120px, 36px);
          line-height: 36px;
          @include sc(18px, #fff);
          background-color: $mainColor;
          text-align: center;
          margin: 20px auto 42px auto;
          @include transition;
          cursor: pointer;
          &:hover {
            background-color: darken($mainColor, 10%);
          }
        }
        .return {
          color: #5980D4;
          margin-left: 20px;
          margin-right: 20px;
          @include transition;
          cursor: pointer;
          &:hover {
            color: darken(#5980D4, 10%);
            text-decoration: underline;
          }
        }
      }
    }
    .description-fees-con {
      padding: 12px;
      border: 1px solid #FFD6D0;
      background-color: #FFF5E0;
    }
    .audit {
      .audit-title {
        @include sc(22px, #5C5C5C);
        line-height: 46px;
        text-align: center;
      }
      .audit-con {
        text-align: center;
        font-size: 16px;
      }
      .audit-footer {
        text-align: center;
        color: #50B9DB;
        font-size: 16px;
        a {
          color: #50B9DB;
          @include transition;
          &:hover {
            color: darken(#50B9DB, 10%);
            text-decoration: underline;
          }
        }
        span {
          cursor: pointer;
          @include transition;
          &:hover {
            color: darken(#50B9DB, 10%);
            text-decoration: underline;
          }
        }
      }
    }
    .ivu-steps-item {
      line-height: 26px;
    }
    .pay-model {
      @include fullScreenModel
    }
    .title-tip {
      height: 36px;
      line-height: 36px;
      margin: 52px auto 28px auto;
      color: #000;
      background-color: #FFF6F3;
      padding-left: 26px;
      font-size: 16px;
    }
    .task-remark-input{
      width: 600px;
    }
  }

</style>

