<template>
  <div class="clear">
    <!--已通过-->
    <div class="probation-pass mt-20" v-show="!showPassOperation">
      <div class="check-status clear">
        <div class="left mr-10" style="margin-top: 2px;">
          <Checkbox
            :value="checkAll"
            @click.prevent.native="handleCheckAll">所有
          </Checkbox>
        </div>
        <div class="left">
          <Checkbox-group v-model="checkPassList" @on-change="checkChange">
            <Checkbox label="pass_and_unclaimed">
              <span>已通过待下单</span>
            </Checkbox>
            <Checkbox label="order_num_waiting_audit">
              <span>订单号待审核</span>
            </Checkbox>
            <Checkbox label="trial_report_waiting_submit">
              <span>已下订单待交买家秀</span>
            </Checkbox>
            <Checkbox label="trial_report_waiting_confirm">
              <span>买家秀待确认</span>
            </Checkbox>
            <Checkbox label="trial_finished">
              <span>活动完成</span>
            </Checkbox>
            <Checkbox label="order_num_error">
              <span>订单号有误</span>
            </Checkbox>
            <Checkbox label="trial_report_unqualified">
              <span>买家秀不合格</span>
            </Checkbox>
            <Checkbox label="trial_end">
              <span>活动终止</span>
            </Checkbox>
          </Checkbox-group>
        </div>
      </div>
      <div class="order-query">
        <iSelect v-model="selectStatus" style="width: 120px;margin-right: 12px;">
          <iOption placeholder="请选择类型查询" v-for="item in SelectList" :value="item.value" :key="item.value">{{
            item.label}}
          </iOption>
        </iSelect>
        <iInput v-model="searchValue" style="width: 160px;margin-right: 8px;"></iInput>
        <span class="ml-10">订单号：</span>
        <iInput v-model="orderNumber" placement="请输入订单号查询" style="width: 160px;margin-right: 8px;"></iInput>
        <span class="ml-10">通过日期：</span>
        <Date-picker format="yyyy-MM-dd" type="daterange" placement="bottom-end" placeholder="请选择日期查询"
                     style="width: 200px" @on-change="handleDataChange"></Date-picker>
        <iButton type="primary" class="ml-20" :loading="searchLoading" @click="searchShowkerPassTask">搜索</iButton>
      </div>
      <div class="probation-table mt-20">
        <table>
          <thead>
          <tr>
            <th width="25%">活动标题</th>
            <th width="12%">绑定淘宝会员名</th>
            <th width="14%">实付金额 / 活动担保金（元）</th>
            <th width="17%">订单号</th>
            <th width="12%">流程状态</th>
            <th width="10%">操作</th>
          </tr>
          </thead>
          <tbody v-if="applySuccessList.length > 0" v-for="item in applySuccessList" :key="item.id">
          <tr class="task-number">
            <td colspan="6">
              <span>活动编号：{{item.orderNumber || '------'}}</span>
              <span class="ml-20">通过日期：{{item.createTime | dateFormat('YYYY-MM-DD hh:mm:ss')}}</span>
            </td>
          </tr>
          <tr>
            <td class="cursor-p" @click="goTaskDetails(item.taskId)">
              <img class="left ml-10" :src="item.taskMainImage + '!thum54'">
              <a class="img-title left" :title="item.taskName">{{item.taskName}}</a>
            </td>
            <td>{{item.alitmAccount}}</td>
            <td>{{item.orderPrice}} / {{item.perMarginNeed}}</td>
            <td>{{item.orderNum || '-----'}}</td>
            <td>
              <div
                v-if="item.status !== 'trial_end' && item.status !== 'order_num_error' && item.status !== 'trial_report_unqualified'">
                <p>{{getTaskStatus(item.status)}}</p>
                <p v-if="item.status !== 'trial_finished'">
                  <time-down color='#ff4040' :fontWeight=600 :endTime="item.currentGenerationEndTime"></time-down>
                </p>
              </div>
              <div class="mt-5 main-color cursor-p" v-if="item.status === 'order_num_error'">
                <Tooltip :content="item.auditDescription" placement="top">
                  <Icon color="#f60" type="information-circled"></Icon>
                  <span>订单号有误</span>
                </Tooltip>
                <p>
                  <time-down color='#ff4040' :fontWeight=600 :endTime="item.currentGenerationEndTime"></time-down>
                </p>
              </div>
              <div class="mt-5 main-color cursor-p" v-if="item.status === 'trial_report_unqualified'">
                <Tooltip :content="item.auditDescription" placement="top">
                  <Icon color="#f60" type="information-circled"></Icon>
                  <span>报告不合格</span>
                </Tooltip>
                <p>
                  <time-down color='#ff4040' :fontWeight=600 :endTime="item.currentGenerationEndTime"></time-down>
                </p>
              </div>
              <div class="mt-5 main-color cursor-p" v-if="item.status === 'trial_end'">
                <Tooltip
                  :content="item.trialEndReason === 'admin_manual_close' ? getTaskStatus(item.trialEndReason) +'：'+ item.auditDescription : getTaskStatus(item.trialEndReason)"
                  placement="top">
                  <Icon color="#f60" type="information-circled"></Icon>
                  <span>活动终止</span>
                </Tooltip>
              </div>
            </td>
            <td>
              <p v-if="item.status === 'pass_and_unclaimed' || item.status === 'order_num_error'" class="operation"
                 @click="changePassOperation('place','', item.id, item.taskType, item.activityCategory)">去下单</p>
              <p v-if="item.status === 'trial_report_waiting_submit'" class="operation"
                 @click="changePassOperation('report','write',item.id)">制作买家秀</p>
              <p v-if="item.status === 'trial_report_unqualified'" class="operation"
                 @click="changePassOperation('report','amend',item.id)">修改买家秀</p>
              <p v-if="item.status === 'pass_and_unclaimed'" class="operation mt-5"
                 @click="openAuditOrder(item.id, item.taskType, item.activityCategory, item.status, item.statusDesc, item.auditDescription)">
                填订单号</p>
              <p v-if="item.status === 'order_num_error'" class="operation mt-5"
                 @click="openAuditOrderModify(item.id, item.taskType, item.activityCategory, item.orderNum, item.orderPrice, item.status, item.statusDesc, item.auditDescription)">
                修改订单号</p>
              <p v-if="item.status === 'trial_report_waiting_confirm' || item.status === 'trial_finished'"
                 class="operation mt-5"
                 @click="lookReportInfo(item.id)">查看买家秀详情</p>
              <p v-if="item.status === 'trial_finished'" class="operation mt-5">
                <router-link
                  :to="{path:'/user/money-management/transaction-record',query:{taskNumber:item.orderNumber}}">查看活动账单
                </router-link>
              </p>
              <p v-if="item.status !== 'trial_end' && item.status !== 'trial_finished'" class="operation mt-5"
                 @click="endTrialModel(item.id)">结束活动</p>
            </td>
          </tr>
          </tbody>
          <tbody v-if="applySuccessList.length === 0">
          <tr>
            <td colspan="6" width="100%">暂无数据</td>
          </tr>
          </tbody>
        </table>
      </div>
      <div class="activity-page mt-20 right mr-10" v-show="applySuccessList.length > 0 && !showPassOperation">
        <Page :total="totalElements" :page-size="pageSize" :current="pageIndex" @on-change="pageChange"></Page>
      </div>
    </div>
    <!--已通过-去下单-->
    <div class="pass-place" v-if="showPassOperation === 'place'">
      <div class="my-probation-title pl-10">
        <span class="left">去下单</span>
        <span class="right mr-30" @click="returnUpPage">返回上页</span>
      </div>
      <div class="commodity-info mt-20">
        <div class="clear">
          <div class="commodity-img left">
            <img :src="taskPlaceInfo.taskMainImage + '!thum54'" alt="">
          </div>
          <div class="commodity-text left ml-5">
            <p>{{taskPlaceInfo.taskName}}</p>
            <p class="mt-15">总份数<strong>&nbsp;{{taskPlaceInfo.taskCount || 0}}&nbsp;</strong>，宝贝单价<strong>&nbsp;{{taskPlaceInfo.itemPrice
              / 100 || 0}}&nbsp;</strong>元</p>
          </div>
        </div>
        <div class="mt-10">
          <strong>当前流程状态：</strong>
          <Icon v-if="showkerTask.status === 'order_num_error'" type="information-circled" color="#f60"></Icon>
          <span :class="[showkerTask.status === 'order_num_error' ? 'main-color': '']">{{showkerTask.statusDesc}}</span>
          <strong class="ml-10" v-if="showkerTask.status === 'order_num_error'">原因：{{showkerTask.latestShowkerTaskOpLog.auditDescription}}</strong>
        </div>
      </div>
      <place-order-step v-if="Object.keys(showkerTask).length > 0" :showkerTaskInfo="showkerTask"
                        @changeTask="getShowkerToProcessOrder"></place-order-step>
      <div class="precautions-tip-info mt-20"
           v-if="showkerTask.task && showkerTask.task.itemReviewRequired === 'review_by_showker_self'">
        <Icon type="information-circled" color="#FF0100"></Icon>
        <span class="sizeColor3">注意：</span>
        <span>亲收到货后记得</span>
        <span class="sizeColor3">在淘宝</span>
        <span>给出好评哦，</span>
        <span>商家若有备注</span>
        <span class="sizeColor3">“勿晒图”</span>
        <span>的，</span>
        <span class="sizeColor3">请勿在淘宝评价中晒图片！</span>
      </div>
      <div class="precautions-tip-info mt-20"
           v-if="showkerTask.task && showkerTask.task.itemReviewRequired === 'offer_review_summary'">
        <Icon type="information-circled" color="#FF0100"></Icon>
        <span class="sizeColor3">注意：</span>
        <span>商家希望亲</span>
        <span class="sizeColor3">在淘宝</span>
        <span>从以下角度进行评价！</span>
      </div>
      <div class="evaluation-content-tip mt-10"
           v-if="showkerTask.task && showkerTask.task.itemReviewRequired === 'offer_review_summary'">
        {{showkerTask.task.itemReviewSummary}}
      </div>
      <div class="precautions-tip-info mt-20"
           v-if="showkerTask.task && showkerTask.task.itemReviewRequired === 'assign_review_detail'">
        <Icon type="information-circled" color="#FF0100"></Icon>
        <span class="sizeColor3">注意：</span>
        <span>商家要求</span>
        <span class="sizeColor3">在淘宝</span>
        <span>使用下方提供的内容进行评价，为避免纠纷，</span>
        <span class="sizeColor3">请务必按照要求操作！</span>
      </div>
      <div class="evaluation-content-tip-assign mt-10"
           v-if="showkerTask.task && showkerTask.task.itemReviewRequired === 'assign_review_detail'">
        <div id="copyEvaluation2">{{showkerTask.other.itemReviewAssign.reviewContent}}</div>
        <div class="copy-evaluation-tbn mt-10" id="copyEvaluationBtn2">复制评价内容</div>
      </div>
      <div class="write-order-number mt-20">
        <span
          @click="openAuditOrder(null,orderType, null, showkerTask.status, showkerTask.statusDesc, showkerTask.latestShowkerTaskOpLog.auditDescription)">下单完成，填订单号</span>
        <span class="ml-35" @click="returnUpPage">返回上页</span>
      </div>
    </div>
    <!--已通过-制作买家秀-->
    <div class="fill-report" v-if="showPassOperation === 'report'">
      <div class="my-probation-title pl-10">
        <span class="left">制作买家秀</span>
        <span class="left fs-12">（提交高质量的买家秀，有助于提高账户的信誉等级，参与活动的中奖率也越高）</span>
        <span class="right mr-30" @click="returnUpPage">返回上页</span>
      </div>
      <div class="commodity-info clear mt-20">
        <div class="commodity-img left">
          <img :src="showkerTask.task.taskMainImage + '!thum54'">
        </div>
        <div class="commodity-text left ml-5">
          <p>{{showkerTask.task.taskName}}</p>
          <p class="mt-15">
            总份数<strong>&nbsp;{{showkerTask.task.taskCount || 0}}&nbsp;</strong>，宝贝单价<strong>&nbsp;{{showkerTask.task.itemPrice
            / 100 || 0}}&nbsp;</strong>元
          </p>
        </div>
      </div>
      <div class="order-info mt-10">
        <p>
          <span>订单号：</span>
          <span>{{showkerTask.orderNum}}</span>
        </p>
        <p>
          <span>实付金额：</span>
          <span>{{showkerTask.orderPrice / 100 || 0}}</span>
          <span>元</span>
        </p>
        <p>
          <strong>当前流程状态：</strong>
          <Icon v-if="showkerTask.status === 'trial_report_unqualified'" type="information-circled" color="#f60"></Icon>
          <span :class="[showkerTask.status === 'trial_report_unqualified' ? 'main-color': '']">{{getTaskStatus(showkerTask.status)}}</span>
          <strong v-if="showkerTask.status === 'trial_report_unqualified'" class="ml-10">原因：{{showkerTask.latestShowkerTaskOpLog.auditDescription}}</strong>
          <span class="main-color ml-10"><time-down color='#ff4040' :fontWeight=600
                                                    :endTime="showkerTask.currentGenerationEndTime"></time-down></span>
        </p>
      </div>
      <div class="precautions-info mt-10" v-if="showkerTask.task.remark">
        <p>注意事项：</p>
        <p class="mt-10 mr-10">
          <span>商家备注：</span>
          <span>{{showkerTask.task.remark}}</span>
        </p>
      </div>
      <div class="precautions-tip-info mt-20" v-if="showkerTask.task.itemReviewRequired === 'review_by_showker_self'">
        <Icon type="information-circled" color="#FF0100"></Icon>
        <span class="sizeColor3">注意：</span>
        <span>亲收到货后记得</span>
        <span class="sizeColor3">在淘宝</span>
        <span>给出好评哦，</span>
        <span>商家若有备注</span>
        <span class="sizeColor3">“勿晒图”</span>
        <span>的，</span>
        <span class="sizeColor3">请勿在淘宝评价中晒图片！</span>
      </div>
      <div class="precautions-tip-info mt-20" v-if="showkerTask.task.itemReviewRequired === 'offer_review_summary'">
        <Icon type="information-circled" color="#FF0100"></Icon>
        <span class="sizeColor3">注意：</span>
        <span>商家希望亲</span>
        <span class="sizeColor3">在淘宝</span>
        <span>从以下角度进行评价！</span>
      </div>
      <div class="evaluation-content-tip mt-10" v-if="showkerTask.task.itemReviewRequired === 'offer_review_summary'">
        {{showkerTask.task.itemReviewSummary}}
      </div>
      <div class="precautions-tip-info mt-20" v-if="showkerTask.task.itemReviewRequired === 'assign_review_detail'">
        <Icon type="information-circled" color="#FF0100"></Icon>
        <span class="sizeColor3">注意：</span>
        <span>商家要求</span>
        <span class="sizeColor3">在淘宝</span>
        <span>使用下方提供的内容进行评价，为避免纠纷，</span>
        <span class="sizeColor3">请务必按照要求操作！</span>
      </div>
      <div class="evaluation-content-tip-assign mt-10"
           v-if="showkerTask.task.itemReviewRequired === 'assign_review_detail'">
        <div id="copyEvaluation">{{showkerTask.other.itemReviewAssign.reviewContent}}</div>
        <div class="copy-evaluation-tbn mt-10" id="copyEvaluationBtn">复制评价内容</div>
      </div>
      <div class="mt-20 pos-rel">
        <p class="fs-14"><span class="des-text">1.淘宝评价截图</span><span class="cl666">（商家返款凭证，必传）</span></p>
        <Upload
          class="mt-10 cursor-p"
          ref="uploadScreenShot"
          :show-upload-list="false"
          :default-file-list="defaultTaobaoScreenShotImg"
          :on-success="uploadTaobaoImgSuccess"
          :on-remove="removeTaobaoImg"
          :format="['jpg','jpeg','png','gif','bmp']"
          :max-size="10240"
          name="report"
          :uploadLength="1"
          :on-format-error="handleFormatError"
          :on-exceeded-size="handleMaxSize"
          type="drag">
          <div style="width: 58px;height:58px;line-height: 58px;">
            <Icon type="camera" size="20"></Icon>
          </div>
        </Upload>
        <div class="watch-example-pic"><p>该截图将作为商家审核返款的凭证哦，请根据要求评价！</p>
          <p class="mt-5"><span class="example-pic" @click="watchExamplePic">查看示例图</span></p></div>
      </div>
      <div class="experience mt-22">
        <p class="mb-10"><span class="des-text">2.说说体验</span><span class="cl666">（秀吧平台要求，必填）</span></p>
        <iInput v-model="trialReportText" type="textarea" :autosize="{minRows: 5,maxRows: 12}"
                placeholder="请填写在试用过程中，对于宝贝的真实使用体会及感受，可以和淘宝上的宝贝评价一致"></iInput>
      </div>
      <div class="experience-img mt-22">
        <div class="mb-10">
          <p><span class="des-text">3.买家秀图片</span><span class="cl666">（秀吧平台要求）</span></p>
          <p class="cl666">
            请上传宝贝试用和体验的相关图片，不是淘宝好评的截图。图片支持jpg、jpeg、png、gif、bmp格式，大小不超过10M,该组图片将会在秀吧平台展示哦，多多晒图，更有利于商家选中你哦</p>
        </div>
        <Upload
          ref="upload"
          :show-upload-list="false"
          :default-file-list="defaultImageList"
          :on-success="uploadImgSuccess"
          :on-remove="removeImage"
          :format="['jpg','jpeg','png','gif','bmp']"
          :max-size="10240"
          name="report"
          :uploadLength="5"
          :on-format-error="handleFormatError"
          :on-exceeded-size="handleMaxSize"
          type="drag">
          <div style="width: 58px;height:58px;line-height: 58px;">
            <Icon type="camera" size="20"></Icon>
          </div>
        </Upload>
      </div>
      <!--  <div class="experience-video mt-22">
          <p class="mb-20">买家秀视频：（视频支持wmv、asf、rmvb、mpg、mpeg、3gp、mov、mp4、avi、dat、mkv、flv、vob格式，大小不超过200M）</p>
          <Upload
            upload-type="video"
            :format="['wmv','asf','rmvb','mpg','mpeg','3gp','mov','mp4','avi','dat','mkv','flv','vob']"
            :max-size="200000"
            name="report-video"
            type="drag">
            <div class="pt-20 pb-20" style="width: 280px;">
              <Icon type="ios-cloud-upload" size="52" style="color: #999"></Icon>
              <p class="main-color">上传买家秀视频</p>
            </div>
          </Upload>
        </div>-->
      <div class="write-order-number mt-40">
        <span @click="submitReport">提交买家秀</span>
        <span class="ml-35" @click="returnUpPage">返回上页</span>
      </div>
    </div>
    <!--填写订单号弹窗-->
    <div class="audit-order-number-model" v-if="showAuditOrderNumber">
      <div class="audit-order-number-con showSweetAlert" :style="{height:needBrowseCollectAddCart?520+'px':290+'px'}">
        <i class="close-model right mr-10" @click="closeAuditOrder">&times;</i>
        <p class="tip-title mt-10">
          <span>注意：订单号及实付金额提交后商家审核前不能修改，请正确填写！</span>
        </p>
        <div class="ml-45 mt-15 pr-20">
          <strong class="cl000">当前流程状态：</strong>
          <Icon v-if="currentOrderStatusInfo.status === 'order_num_error'" type="information-circled"
                color="#f60"></Icon>
          <span :class="[currentOrderStatusInfo.status === 'order_num_error' ? 'main-color': '']">{{currentOrderStatusInfo.statusDesc}}</span>
          <strong class="ml-10" v-if="currentOrderStatusInfo.status === 'order_num_error'">原因：{{currentOrderStatusInfo.auditDescription}}</strong>
        </div>
        <div v-if="needBrowseCollectAddCart" class="mt-20 ml-45 des-text">1.收藏、加入购物车，提交相关截图</div>
        <div v-if="needBrowseCollectAddCart" class="clear text-ct ml-45 mt-20">
          <div class="left ml-10 " v-if="taskType === 'pc_search'">
            <Upload
              class="ml-5"
              ref="uploadCondition"
              :show-upload-list="false"
              :default-file-list="defaultImageSearchCondition"
              :on-remove="removeMainImageCondition"
              :on-success="searchConditionImageFun"
              :format="['jpg','jpeg','png','gif','bmp']"
              :max-size="10240"
              name="task"
              :on-format-error="handleFormatError"
              :on-exceeded-size="handleMaxSize"
              type="drag">
              <div style="width: 58px;height:58px;line-height: 58px;">
                <Icon type="camera" size="20"></Icon>
              </div>
            </Upload>
            <p class="mt-8">搜索条件截图</p>
            <p class="mt-8 cursor-p example-pic" @click="pcSearchSelectFun('one')">查看示例图</p>
          </div>
          <div class="left ml-20" v-if="taskType === 'pc_search'|| taskType === 'app_search'">
            <Upload
              class="ml-5"
              ref="uploadItemLocation"
              :show-upload-list="false"
              :default-file-list="defaultImageItemLocation"
              :on-remove="removeMainImageLocation"
              :on-success="itemLocationImageFun"
              :format="['jpg','jpeg','png','gif','bmp']"
              :max-size="10240"
              name="task"
              :on-format-error="handleFormatError"
              :on-exceeded-size="handleMaxSize"
              type="drag">
              <div style="width: 58px;height:58px;line-height: 58px;">
                <Icon type="camera" size="20"></Icon>
              </div>
            </Upload>
            <p class="mt-8">所在位置截图</p>
            <p class="mt-8 cursor-p example-pic" @click="pcSearchSelectFun('two')">查看示例图</p>
          </div>
          <div class="left ml-20">
            <Upload
              class="ml-5"
              ref="uploadEnshrine"
              :show-upload-list="false"
              :default-file-list="defaultImageEnshrine"
              :on-remove="removeMainImageEnshrineImage"
              :on-success="enshrineImageFun"
              :format="['jpg','jpeg','png','gif','bmp']"
              :max-size="10240"
              name="task"
              :on-format-error="handleFormatError"
              :on-exceeded-size="handleMaxSize"
              type="drag">
              <div style="width: 58px;height:58px;line-height: 58px;">
                <Icon type="camera" size="20"></Icon>
              </div>
            </Upload>
            <p class="mt-8">宝贝加入收藏夹</p>
            <p class="mt-8 cursor-p example-pic" @click="pcSearchSelectFun('four')">查看示例图</p>
          </div>
          <div class="left ml-20">
            <Upload
              class="ml-5"
              ref="uploadAddToCart"
              :show-upload-list="false"
              :default-file-list="defaultImageAddToCart"
              :on-remove="removeMainImageAddToCart"
              :on-success="addToCartImageFun"
              :format="['jpg','jpeg','png','gif','bmp']"
              :max-size="10240"
              name="task"
              :on-format-error="handleFormatError"
              :on-exceeded-size="handleMaxSize"
              type="drag">
              <div style="width: 58px;height:58px;line-height: 58px;">
                <Icon type="camera" size="20"></Icon>
              </div>
            </Upload>
            <p class="mt-8">宝贝加入购物车</p>
            <p class="mt-8 cursor-p example-pic" @click="pcSearchSelectFun('five')">查看示例图</p>
          </div>
        </div>
        <div class="mt-10 ml-45">
          <p class="mt-20 mb-20 des-text" v-if="needBrowseCollectAddCart">2.填写下单信息</p>
          <span>请输入订单号：</span>
          <iInput v-model="affirmOrderNumber" style="width: 300px;"></iInput>
          <iButton @click="orderImg = true">什么是订单号？</iButton>
          <Modal v-if="pcOrApp === 'pcOrder'" v-model="orderImg" width="1000" :transfer="false">
            <div class="text-ct">
              <img style="width: 900px;height: 750px;" src="~assets/img/order-number/order_pc.png" alt="">
            </div>
          </Modal>
          <Modal v-else v-model="orderImg" width="360" :transfer="false">
            <div class="text-ct">
              <img style="width: 300px;height: 450px;" src="~assets/img/order-number/order_phone.png" alt="">
            </div>
          </Modal>
        </div>
        <p class="mt-20 ml-35">
          <span>请输入实付金额：</span>
          <iInput v-model.number="payMoney" style="width: 120px;"></iInput>
          <span class="ml-5">元</span>
        </p>
        <div class="submit-btn mt-20" @click="saveOrUpdateOrderNumber">确认提交</div>
      </div>
    </div>
    <!--结束活动确认弹框-->
    <Modal v-model="deleteModal" width="360">
      <p slot="header" style="color:#f60;text-align:center">
        <Icon type="information-circled"></Icon>
        <span>结束确认</span>
      </p>
      <div>
        <p style="text-indent:25px;font-weight: bold;">您好，为了更好地改善平台试用体验并提高活动的质量，请告诉我们您结束活动的原因：</p>
        <p>
          <RadioGroup v-model="endReason">
            <Radio label="流程太繁琐了" class="mt-20 mr-40"></Radio>
            <Radio label="找不到商家发布的宝贝" class="mt-20"></Radio>
            <Radio label="没有收到宝贝" class="mt-20 mr-40"></Radio>
            <Radio label="我不想做了" class="mt-20"></Radio>
            <Radio label="其他" class="mt-20">
              <span>其他：</span>
              <iInput v-model="otherReason" style="width: 200px"></iInput>
            </Radio>
          </RadioGroup>
        </p>
      </div>
      <div slot="footer" class="text-ct">
        <iButton class="mr-20" type="error" size="large" :loading="modalLoading" @click="endTrial">确认提交</iButton>
        <iButton size="large" @click="unSelectSubmit">取消</iButton>
      </div>
    </Modal>
    <Modal v-model="watchExample" width="500" title="照片查看器">
      <div class="text-ct">
        <img width="400" src="~assets/img/screen-shot/taobao-screenShot.jpg" alt="">
      </div>
    </Modal>
    <Modal v-model="pcSearch" title="照片查看器" width="800" :styles="{top:'20px'}">
      <div v-if="pcSearchSelect.one && taskType === 'pc_search'" class="text-ct">
        <img width="700" src="~assets/img/screen-shot/select_type.jpg" alt="">
      </div>
      <div v-if="pcSearchSelect.two" class="text-ct">
        <img width="700" v-if="taskType === 'pc_search'" src="~assets/img/screen-shot/position_pc.jpg" alt="">
        <img width="400" v-if="taskType === 'app_search'" src="~assets/img/screen-shot/position_app.png" alt="">
      </div>
      <div v-if="pcSearchSelect.four" class="text-ct">
        <img width="700" v-if="taskType ==='direct_access'|| taskType=== 'pc_search'"
             src="~assets/img/screen-shot/collect_pc.jpg" alt="">
        <img width="400" v-if="taskType ==='app_search'|| taskType=== 'tao_code'"
             src="~assets/img/screen-shot/collect_app.png" alt="">
      </div>
      <div v-if="pcSearchSelect.five" class="text-ct">
        <img width="700" v-if="taskType ==='direct_access'|| taskType=== 'pc_search'"
             src="~assets/img/screen-shot/shop_car_pc.jpg" alt="">
        <img width="400" v-if="taskType ==='app_search'|| taskType=== 'tao_code'"
             src="~assets/img/screen-shot/shop_car_app.png" alt="">
      </div>
    </Modal>
    <Modal v-model="appSearch" title="照片查看器" width="500" :styles="{top:'20px'}">
      <div v-if="pcSearchSelect.one && taskType === 'pc_search'" class="text-ct">
        <img width="700" src="~assets/img/screen-shot/select_type.jpg" alt="">
      </div>
      <div v-if="pcSearchSelect.two" class="text-ct">
        <img width="700" v-if="taskType === 'pc_search'" src="~assets/img/screen-shot/position_pc.jpg" alt="">
        <img width="400" v-if="taskType === 'app_search'" src="~assets/img/screen-shot/position_app.png" alt="">
      </div>
      <div v-if="pcSearchSelect.four" class="text-ct">
        <img width="700" v-if="taskType ==='direct_access'|| taskType=== 'pc_search'"
             src="~assets/img/screen-shot/collect_pc.jpg" alt="">
        <img width="400" v-if="taskType ==='app_search'|| taskType=== 'tao_code'"
             src="~assets/img/screen-shot/collect_app.png" alt="">
      </div>
      <div v-if="pcSearchSelect.five" class="text-ct">
        <img width="700" v-if="taskType ==='direct_access'|| taskType=== 'pc_search'"
             src="~assets/img/screen-shot/shop_car_pc.jpg" alt="">
        <img width="400" v-if="taskType ==='app_search'|| taskType=== 'tao_code'"
             src="~assets/img/screen-shot/shop_car_app.png" alt="">
      </div>
    </Modal>
    <!--用户服务条款弹框-->
    <div v-if="isShowUserClause" class="user-clause-model">
      <user-clause @closeClauseModel="closeClauseModel" isShowClause="showker"></user-clause>
    </div>
  </div>
</template>

<script>
  import Button from 'iview/src/components/button'
  import Input from 'iview/src/components/input'
  import Icon from 'iview/src/components/icon'
  import {Select, Option, OptionGroup} from 'iview/src/components/select'
  import Page from 'iview/src/components/page'
  import Radio from 'iview/src/components/radio'
  import Checkbox from 'iview/src/components/checkbox'
  import DatePicker from 'iview/src/components/date-picker'
  import Tooltip from 'iview/src/components/tooltip'
  import Modal from 'iview/src/components/modal'
  import Clipboard from 'clipboard'
  import Upload from '@/components/upload'
  import TimeDown from '@/components/TimeDown'
  import PlaceOrderStep from '@/components/PlaceOrderStep'
  import UserClause from '@/components/UserClause'
  import api from '@/config/apiConfig'
  import {aliCallbackImgUrl} from '@/config/env'
  import {TaskErrorStatusList, isNumber, encryption} from '@/config/utils'

  export default {
    name: 'ApplyPassAudit',
    components: {
      iButton: Button,
      Icon: Icon,
      iInput: Input,
      iSelect: Select,
      iOption: Option,
      OptionGroup: OptionGroup,
      Page: Page,
      Checkbox: Checkbox,
      CheckboxGroup: Checkbox.Group,
      DatePicker: DatePicker,
      Tooltip: Tooltip,
      Modal: Modal,
      Radio: Radio,
      RadioGroup: Radio.Group,
      Upload: Upload,
      TimeDown: TimeDown,
      PlaceOrderStep: PlaceOrderStep,
      UserClause: UserClause,
    },
    data() {
      return {
        appSearch: false,
        downloadButton: false,
        showPassOperation: '',
        showAuditOrderNumber: false,
        SelectList: [
          {
            value: '1',
            label: '活动名称'
          },
          {
            value: '2',
            label: '淘宝会员名'
          }
        ],
        searchLoading: false,
        selectStatus: null,
        searchValue: null,
        orderNumber: null,
        totalElements: null,
        pageSize: 5,
        checkAll: false,
        checkPassList: [],
        queryToData: [],
        pageIndex: 1,
        applySuccessList: [],
        taskPlaceInfo: {},
        showkerTask: {},
        itemId: null,
        orderStatus: null,
        reportStatus: null,
        affirmOrderNumber: null,
        payMoney: null,
        auditTimeStart: '',
        auditTimeEnd: '',
        trialReportImages: [],
        trialReportText: null,
        modalLoading: false,
        deleteModal: false,
        deleteId: null,
        orderImg: false,
        orderType: null,
        taskOrderType: null,
        activityCategory: null,
        currentOrderStatusInfo: {},
        endReason: null,
        otherReason: null,
        isShowUserClause: false,
        taobaoScreenShotImg: null,
        defaultTaobaoScreenShotImg: [],
        needBrowseCollectAddCart: false,
        upLoadImageUrl: {
          searchConditionImage: null,
          itemLocationImage: null,
          browseToBottomImage: null,
          enshrineImage: null,
          addToCartImage: null
        },
        pcSearch: false,
        pcSearchSelect: {
          one: false,
          two: false,
          three: false,
          four: false,
          five: false
        },
        taskType: '',
        defaultImageList: [],
        defaultImageAddToCart: [],
        defaultImageEnshrine: [],
        defaultImageItemLocation: [],
        defaultImageSearchCondition: [],
        watchExample: false,
      }
    },
    mounted() {
    },
    created() {
      let _this = this;
      let status = _this.$route.query.status;
      if (status) {
        if (status === 'order_num_error') {
          _this.checkPassList.push('order_num_error');
          _this.checkPassList.push('trial_report_unqualified');
          _this.showkerSuccessList();
        } else {
          _this.checkPassList.push(status);
          _this.showkerSuccessList();
        }
      } else {
        _this.showkerSuccessList();
      }
      _this.$nextTick(() => {
        let clipboard = new Clipboard('#copyEvaluationBtn', {
          target: () => document.getElementById('copyEvaluation')
        });
        clipboard.on('success', () => {
          _this.$Message.success("复制评价内容成功！");
          clipboard.destroy();
        });
        clipboard.on('error', () => {
          _this.$Message.error("复制评价内容失败！");
          clipboard.destroy();
        });
      });
      _this.$nextTick(() => {
        let clipboard = new Clipboard('#copyEvaluationBtn2', {
          target: () => document.getElementById('copyEvaluation2')
        });
        clipboard.on('success', () => {
          _this.$Message.success("复制评价内容成功！");
          clipboard.destroy();
        });
        clipboard.on('error', () => {
          _this.$Message.error("复制评价内容失败！");
          clipboard.destroy();
        });
      });
      _this.getDetectionUserClauseTip();
    },
    computed: {
      pcOrApp: function () {
        let type = this.orderType;
        return type === 'pc_search' || type === 'direct_access' ? 'pcOrder' : 'appOrder';
      }
    },
    methods: {

      watchExamplePic() {
        this.watchExample = true;
      },
      pcSearchSelectFun(type) {
        if (this.taskType === 'pc_search' || this.taskType === 'direct_access') {
          console.log(111);
          this.pcSearch = true;
        } else {
          this.appSearch = true;
        }
        for (let k in this.pcSearchSelect) {
          k === type ? this.pcSearchSelect[k] = true : this.pcSearchSelect[k] = false;
        }
      },
      removeMainImageCondition() {
        this.upLoadImageUrl.searchConditionImage = null;
      },
      removeMainImageLocation() {
        this.upLoadImageUrl.itemLocationImage = null;
      },
      removeMainImageEnshrineImage() {
        this.upLoadImageUrl.enshrineImage = null;
      },
      removeMainImageAddToCart() {
        this.upLoadImageUrl.addToCartImage = null;
      },
      //获搜索条件截图片地址
      searchConditionImageFun(res) {
        this.upLoadImageUrl.searchConditionImage = aliCallbackImgUrl + res.name
      },
      //宝贝所在位置截图
      itemLocationImageFun(res) {
        this.upLoadImageUrl.itemLocationImage = aliCallbackImgUrl + res.name
      },
      //浏览见底截图
      browseToBottomImageFun(res) {
        this.upLoadImageUrl.browseToBottomImage = aliCallbackImgUrl + res.name
      },
      //收藏截图
      enshrineImageFun(res) {
        this.upLoadImageUrl.enshrineImage = aliCallbackImgUrl + res.name
      },
      //加入购物车截图
      addToCartImageFun(res) {
        this.upLoadImageUrl.addToCartImage = aliCallbackImgUrl + res.name
      },
      encryptionId(id) {
        return encryption(id)
      },
      getTaskStatus(type) {
        return TaskErrorStatusList(type);
      },
      goTaskDetails(id) {
        this.$router.push({name: 'TaskDetails', query: {q: encryption(id)}})
      },
      changePassOperation(type, status, id, orderType, activityCategory) {
        let _this = this;
        _this.reportStatus = status;
        _this.itemId = id;
        _this.orderType = orderType;
        _this.activityCategory = activityCategory;
        if (type === 'report') {
          api.showkerTaskInfo({id: id,}).then(res => {
            if (res.status) {
              _this.showPassOperation = type;
              _this.showkerTask = res.data;
              if (status === 'write') {
                _this.trialReportImages = [];
                _this.trialReportText = null;
              } else {
                api.showkerTaskReport({id: id,}).then(res => {
                  if (res.status) {
                    _this.trialReportImages = [];
                    _this.defaultTaobaoScreenShotImg = [];
                    _this.taobaoScreenShotImg = [];
                    _this.taobaoScreenShotImg = res.data.taobaoCommentImage;
                    _this.defaultTaobaoScreenShotImg.push({src: res.data.taobaoCommentImage});
                    let ImageList = JSON.parse(res.data.trialReportImages);
                    for (let i = 0, len = ImageList.length; i < len; i++) {
                      ImageList[i] = ImageList[i].indexOf('aliyuncs') > 0 ? ImageList[i] : aliCallbackImgUrl + ImageList[i];
                    }
                    _this.trialReportImages = ImageList;
                    for (let i = 0, len = ImageList.length; i < len; i++) {
                      _this.defaultImageList.push({src: ImageList[i]});
                    }
                    _this.trialReportText = res.data.trialReportText;
                  } else {
                    _this.$Message.error(res.msg);
                  }
                });
              }
            } else {
              _this.$Message.error(res.msg);
            }
          });
        } else {
          _this.showPassOperation = type;
          _this.getShowkerToProcessOrder();
        }
      },
      getShowkerToProcessOrder() {
        let _this = this;
        api.showkerToProcessOrder({id: _this.itemId}).then(res => {
          if (res.status) {
            _this.showkerTask = res.data.showkerTask;
            _this.taskPlaceInfo = res.data.showkerTask.task;
            _this.needBrowseCollectAddCart = res.data.taskInfo.needBrowseCollectAddCart;
            _this.taskType = res.data.taskInfo.taskType;
            let screenShot = JSON.parse(res.data.taskApply.screenshot);
            _this.defaultImageAddToCart = screenShot.addToCart ? [{src: screenShot.addToCart}] : [];
            _this.upLoadImageUrl.addToCartImage = screenShot.addToCart ? screenShot.addToCart : null;
            _this.defaultImageEnshrine = screenShot.enshrine ? [{src: screenShot.enshrine}] : [];
            _this.upLoadImageUrl.enshrineImage = screenShot.enshrine ? screenShot.enshrine : null;
            _this.defaultImageItemLocation = screenShot.itemLocation ? [{src: screenShot.itemLocation}] : [];
            _this.upLoadImageUrl.itemLocationImage = screenShot.itemLocation ? screenShot.itemLocation : null;
            _this.defaultImageSearchCondition = screenShot.searchCondition ? [{src: screenShot.searchCondition}] : [];
            _this.upLoadImageUrl.searchConditionImage = screenShot.searchCondition ? screenShot.searchCondition : null;
          } else {
            _this.$Message.error(res.msg);
          }
        })
      },
      pageChange(data) {
        this.pageIndex = data;
        this.showkerSuccessList();
      },
      returnUpPage() {
        this.showPassOperation = '';
        this.trialReportImages = [];
        this.defaultImageList = [];
        this.trialReportText = null;
      },
      handleCheckAll() {
        this.checkAll = !this.checkAll;
        if (this.checkAll) {
          this.checkPassList = ['pass_and_unclaimed', 'order_num_waiting_audit', 'trial_report_waiting_submit', 'trial_report_waiting_confirm', 'trial_finished', 'order_num_error', 'trial_report_unqualified', 'trial_end'];
        } else {
          this.checkPassList = [];
        }
        this.pageIndex = 1;
        this.showkerSuccessList()
      },
      checkChange() {
        if (this.checkPassList.length === 8) {
          this.checkAll = true;
        } else if (this.checkPassList.length > 0) {
          this.checkAll = false;
        } else {
          this.checkAll = false;
        }
        this.pageIndex = 1;
        this.showkerSuccessList();
      },
      handleDataChange(data) {
        this.auditTimeStart = data[0];
        this.auditTimeEnd = data[1];
      },
      closeAuditOrder() {
        this.showAuditOrderNumber = false;
      },
      openAuditOrderModify(id, type, activityCategory, orderNum, orderPrice, status, statusDesc, auditDescription) {
        this.affirmOrderNumber = orderNum;
        this.payMoney = orderPrice;
        this.orderType = type;
        this.activityCategory = activityCategory;
        this.currentOrderStatusInfo.status = status;
        this.currentOrderStatusInfo.statusDesc = statusDesc;
        this.currentOrderStatusInfo.auditDescription = auditDescription;
        this.showAuditOrderNumber = true;
        if (id && !this.itemId) {
          this.itemId = id;
          this.getShowkerToProcessOrder();
        }
      },
      openAuditOrder(id, type, activityCategory, status, statusDesc, auditDescription) {
        this.affirmOrderNumber = null;
        this.payMoney = null;
        this.orderType = type;
        this.activityCategory = activityCategory;
        this.currentOrderStatusInfo.status = status;
        this.currentOrderStatusInfo.statusDesc = statusDesc;
        this.currentOrderStatusInfo.auditDescription = auditDescription;
        this.showAuditOrderNumber = true;
        if (id && !this.itemId) {
          this.itemId = id;
          this.getShowkerToProcessOrder();
        }
      },
      uploadTaobaoImgSuccess(res) {
        this.taobaoScreenShotImg = aliCallbackImgUrl + res.name;
      },
      uploadImgSuccess(res) {
        this.trialReportImages.push(aliCallbackImgUrl + res.name);
      },
      removeTaobaoImg() {
        this.taobaoScreenShotImg = null;
      },
      removeImage(file) {
        let index = this.trialReportImages.indexOf(file.src);
        this.trialReportImages.splice(index, 1);
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
          content: '图片 ' + file.name + ' 太大，不能超过 10M'
        });
      },
      searchShowkerPassTask() {
        this.pageIndex = 1;
        this.showkerSuccessList();
      },
      showkerSuccessList() {
        let _this = this;
        _this.searchLoading = true;
        api.showkerSuccessList({
          selectStatus: _this.selectStatus,
          orderNum: _this.orderNumber,
          searchValue: _this.searchValue,
          auditTimeStart: _this.auditTimeStart,
          auditTimeEnd: _this.auditTimeEnd,
          statusList: JSON.stringify(_this.checkPassList),
          pageSize: 5,
          pageIndex: _this.pageIndex,
        }).then(res => {
          if (res.status) {
            _this.searchLoading = false;
            _this.applySuccessList = [];
            let content = res.data.content;
            content.forEach(item => {
              let data = {};
              data.id = item.id;
              data.taskId = item.task.id;
              data.alitmAccount = item.alitmAccount;
              data.orderPrice = (item.orderPrice / 100).toFixed(2);
              data.currentGenerationEndTime = item.currentGenerationEndTime;
              data.orderNum = item.orderNum;
              data.status = item.status;
              data.statusDesc = item.statusDesc;
              data.trialEndReason = item.trialEndReason;
              data.taskMainImage = item.task.taskMainImage;
              data.taskName = item.task.taskName;
              data.perMarginNeed = (item.task.perMarginNeed / 100).toFixed(2);
              data.createTime = item.createTime;
              data.orderNumber = item.task.number;
              data.taskType = item.task.taskType;
              data.activityCategory = item.task.activityCategory;
              if (item.latestShowkerTaskOpLog) {
                data.auditDescription = item.latestShowkerTaskOpLog.auditDescription;
              } else {
                data.auditDescription = '';
              }
              _this.applySuccessList.push(data);
            });
            _this.totalElements = res.data.totalElements;
          } else {
            _this.$Message.error(res.msg);
          }
        })
      },
      saveOrUpdateOrderNumber() {
        let _this = this;
        if (!_this.affirmOrderNumber) {
          _this.$Message.error("亲，请输入订单号！");
          return;
        }
        if (_this.affirmOrderNumber.length > 22) {
          _this.$Message.error("亲，订单号长度过长，请输入正确的订单号！");
          return;
        }
        if (!_this.payMoney) {
          _this.$Message.error("亲，请输入订单金额！");
          return;
        }
        if (!isNumber(_this.payMoney)) {
          _this.$Message.error("亲，输入的金额格式有误！");
          return;
        }
        if (_this.activityCategory === 'pinkage_for_10' && _this.payMoney < 10) {
          _this.$Message.error("亲，当前活动是10元包邮活动，订单金额不能低于10元！");
          return;
        }
        api.showkerOrderSave({
          id: _this.itemId,
          orderNum: _this.affirmOrderNumber,
          actualPayMoney: _this.payMoney,
          searchCondition: _this.upLoadImageUrl.searchConditionImage,
          itemLocation: _this.upLoadImageUrl.itemLocationImage,
          enshrine: _this.upLoadImageUrl.enshrineImage,
          addToCart: _this.upLoadImageUrl.addToCartImage,
        }).then(res => {
          if (res.status) {
            _this.$Message.success('订单号提交成功，请耐心等待商家审核！');
            _this.showkerSuccessList();
            _this.showAuditOrderNumber = false;
            _this.returnUpPage();
          } else {
            _this.$Message.error(res.msg);
          }
        })
      },
      submitReport() {
        let _this = this;
        if (!_this.taobaoScreenShotImg) {
          _this.$Message.error("亲，请上传淘宝截图！");
          return;
        }
        if (!_this.trialReportText) {
          _this.$Message.error("亲，请描述您的活动过程与体验！");
          return;
        }
        if (_this.trialReportImages.length > 5) {
          _this.$Message.error("亲，图片上传数量最多5张！");
          return;
        }
        if (_this.reportStatus === 'write') {
          api.showkerSaveReport({
            id: _this.itemId,
            trialReportText: _this.trialReportText,
            trialReportImages: JSON.stringify(_this.trialReportImages),
            taoBaoCommentImage: _this.taobaoScreenShotImg
          }).then(res => {
            if (res.status) {
              _this.$Message.success({
                content: '买家秀提交成功，请耐心等待商家审核！',
                duration: 6
              });
              _this.showkerSuccessList();
              _this.returnUpPage();
            } else {
              _this.$Message.error(res.msg);
            }
          })
        } else {
          api.showkerModifyReport({
            id: _this.itemId,
            trialReportText: _this.trialReportText,
            trialReportImages: JSON.stringify(_this.trialReportImages),
            taoBaoCommentImage: _this.taobaoScreenShotImg
          }).then(res => {
            if (res.status) {
              _this.$Message.success('买家秀修改成功，请耐心等待商家审核！');
              _this.showkerSuccessList();
              _this.returnUpPage();
            } else {
              _this.$Message.error(res.msg);
            }
          })
        }
      },
      endTrialModel(id) {
        this.deleteModal = true;
        this.deleteId = id;
      },
      endTrial() {
        let _this = this;
        let endReasonContent = null;
        _this.modalLoading = true;
        if (!_this.endReason) {
          _this.$Message.warning('请选择你结束活动的理由！');
          _this.modalLoading = false;
          return;
        }
        if (_this.endReason === '其他') {
          if (!_this.otherReason) {
            _this.$Message.warning('请填写你结束活动的理由！');
            _this.modalLoading = false;
            return
          }
          endReasonContent = _this.otherReason;
        } else {
          endReasonContent = _this.endReason;
        }
        api.showkerTrialEed({
          id: _this.deleteId,
          endReason: endReasonContent
        }).then(res => {
          if (res.status) {
            _this.modalLoading = false;
            _this.$Message.success('结束活动成功！');
            this.deleteModal = false;
            _this.showkerSuccessList();
          } else {
            _this.$Message.error(res.msg);
          }
        })
      },
      unSelectSubmit() {
        this.deleteModal = false;
      },
      lookReportInfo(id) {
        this.$router.push({path: '/user/my-probation/report', query: {id: encryption(id), from: 'buyer'}});
      },
      closeClauseModel() {
        this.isShowUserClause = false;
      },
      getDetectionUserClauseTip() {
        let _this = this;
        api.detectionUserClauseTip().then(res => {
          if (res.status) {
            _this.isShowUserClause = !res.data;
          } else {
            _this.$Message.error(res.msg);
          }
        })
      }
    }
  }
</script>
