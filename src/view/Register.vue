<template>
  <div class="register-ctt">
    <role-top></role-top>
    <div class="container">
      <div class="register-ctt-top pos-rel">
        <div class="left active">
          <span>1</span>
          填写注册信息
        </div>
        <div class="left pos-rel">
          <div class="fs-22 left">
            <Icon type="checkmark-circled" size="50px" color="#ccc"></Icon>
          </div>
          注册成功
        </div>
        <div class="register-ctt-top-line"></div>
      </div>
      <div class="container">
        <div class="register-form-box">
          <div class="register-form-sel">
            <a :class="[selLogin.buyer ? 'buyActive' : '']" @click="selLoginFunc(0)">
              <img v-show="selLogin.buyer" src="~assets/img/register/register_01.png" alt="">
              <img v-show="!selLogin.buyer" src="~assets/img/register/register_03.png" alt="">
              拿手注册
            </a>
            <a :class="[selLogin.seller ? 'sellerActive' : '']" @click="selLoginFunc(1)">
              <img v-show="selLogin.seller" src="~assets/img/register/register_04.png" alt="">
              <img v-show="!selLogin.seller" src="~assets/img/register/register_02.png" alt="">
              商家注册
            </a>
          </div>
          <div class="mt-80 form-box over-hd">
            <iForm ref="formCustom" :model="formCustom" :rules="ruleCustom" :label-width="400">
              <div class="clear form-input-box">
                <Form-item label="手机号码:" prop="phone" class="left" style="width: 650px">
                  <iInput size="large" v-model="formCustom.phone"></iInput>
                </Form-item>
              </div>
              <div class="clear form-input-box">
                <Form-item label="设置登录密码" prop="pwd" class="left" style="width: 650px">
                  <iInput type="password" v-model="formCustom.pwd" size="large"></iInput>
                </Form-item>
              </div>
              <div class="clear form-input-box">
                <Form-item label="确认密码" prop="repwd" class="left" style="width: 650px">
                  <iInput type="password" v-model="formCustom.repwd" size="large"></iInput>
                </Form-item>
              </div>
              <div class="clear form-input-box">
                <Form-item label="图形验证码" prop="validateCode" class="left" style="width: 550px">
                  <iInput type="text" size="large" v-model="formCustom.validateCode"></iInput>
                </Form-item>
                <div style="width: 100px; float:left;">
                  <img :src="regImgSrc" width="100%" alt="" @click="getRegVrcode">
                </div>
              </div>
              <div class="clear form-input-box">
                <Form-item label="短信验证码" prop="smsCode" class="left pos-rel" style="width: 650px">
                  <iInput type="text" v-model="formCustom.smsCode" number size="large"></iInput>
                  <SmsCountdown style="top: 3px;"
                                :on-success="sendCodeSuccess"
                                :phone="formCustom.phone"
                                :purpose="formCustom.purpose"
                                :validateCode="formCustom.validateCode">
                  </SmsCountdown>
                </Form-item>
              </div>

              <Form-item prop="agreeStrip">
                <Checkbox-group v-model="checked">
                  <Checkbox label="agree" v-model="formCustom.agreeStrip">我已仔细阅读并同意接受</Checkbox>
                  <a class="fs-12" @click="agreementShow = true">《用户使用协议》</a>
                </Checkbox-group>
              </Form-item>
              <div>
                <Form-item v-show="selLogin.buyer">
                  <iButton  :class="[btnState.registerBuyerBtn ? '' : 'register-buyer-btn']"
                           @click="handleSubmit('formCustom',registerBuyer)" :disabled="btnState.registerBuyerBtn" >立即注册
                  </iButton>
                  <iButton type="ghost" @click="handleReset('formCustom')" style="margin-left: 8px">重置</iButton>
                </Form-item>
                <Form-item v-show="selLogin.seller">
                  <iButton  :class="[btnState.registerSellerBtn ? '' : 'register-seller-btn']"
                           @click="handleSubmit('formCustom',registerSeller)">立即注册
                  </iButton>
                  <iButton type="ghost" @click="handleReset('formCustom')" style="margin-left: 8px">重置</iButton>
                </Form-item>
              </div>
            </iForm>
            <p class="fs-14 text-ct vtc-mid">
              <a v-if="false">
                <img class="vtc-mid" src="~assets/img/common/qq_logo.png" alt="">
                QQ账号登录
              </a>
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              <span>我已有账号，现在就</span>
              <router-link class="" to="/login">登录</router-link>
            </p>
          </div>
        </div>
      </div>
    </div>
    <Modal v-model="agreementShow" width="900">
      <p slot="header" class="main-color text-ct">
        <span class="cl000 fs-18">白拿拿服务协议</span>
      </p>
      <div style="text-align:center">
        <p style="height:500px; overflow-y: scroll; text-align: left; padding: 0 20px;" class="fs-14">
          欢迎您使用白拿拿平台服务！
          <br>
          <br>

          特别提示：
          <br>
          <br>
          在使用白拿拿平台服务之前，您应当认真阅读并遵守《白拿拿服务协议》（以下简称“本协议”），请您务必审慎阅读、充分理解各条款内容，特别是免除或者限制责任的条款、争议解决和法律适用条款。免除或者限制责任的条款可能将以加粗字体显示，您应重点阅读。如您对协议有任何疑问的，应向白拿拿客服咨询。
          <br>
          <br>
          当您按照注册页面提示填写信息、阅读并同意本协议且完成全部注册程序后，或您按照激活页面提示填写信息、阅读并同意本协议且完成全部激活程序后，或您以其他白拿拿允许的方式实际使用白拿拿平台服务时，即表示您已充分阅读、理解并接受本协议的全部内容，并与白拿拿平台达成协议。您承诺接受并遵守本协议的约定， 届时您不应以未阅读本协议的内容或者未获得白拿拿对您问询的解答等理由，主张本协议无效，或要求撤销本协议。
          <br>
          <br>

          一、 协议范围
          <br>
          <br>

          1、本协议由您与白拿拿平台的经营者共同缔结，本协议具有合同效力。
          <br>
          白拿拿平台的经营者是指法律认可的经营白拿拿平台网站的责任主体，白拿拿平台为包含51bainana.com该域名下的所有平台，本协议项下各白拿拿平台的经营者可单称或合称为“白拿拿”。有关白拿拿平台经营者的信息请查看各白拿拿平台首页底部公布的公司信息和证照信息。
          <br>
          <br>
          2、除另行明确声明外，白拿拿平台服务包含任何白拿拿及其关联公司提供的基于互联网以及移动网的相关服务，且均受本协议约束。如果您不同意本协议的约定，您应立即停止注册/激活程序或停止使用白拿拿平台服务。
          <br>
          <br>
          3、本协议内容包括协议正文、法律声明 、《白拿拿规则》及所有白拿拿已经发布或将来可能发布的各类规则、公告或通知（以下合称“白拿拿规则”或“规则”）。所有规则为本协议不可分割的组成部分，与协议正文具有同等法律效力。
          <br>
          <br>
          4、白拿拿有权根据需要不时地制订、修改本协议及/或各类规则，并以网站公示的方式进行变更公告，无需另行单独通知您。变更后的协议和规则一经在网站公布后，立即或在公告明确的特定时间自动生效。若您在前述变更公告后继续使用白拿拿平台服务的，即表示您已经阅读、理解并接受经修订的协议和规则。若您不同意相关变更，应当立即停止使用白拿拿平台服务。
          <br>
          <br>

          二、 注册与账户
          <br>
          <br>

          1、主体资格
          <br>
          <br>

          您确认，在您完成注册程序或以其他白拿拿允许的方式实际使用白拿拿平台服务时，您应当是具备完全民事行为权利能力和完全民事力的自然人、法人或其他组织。若您不具备前述主体资格，则您及您的监护人应承担因此而导致的一切后果，且白拿拿有权注销或永久冻结您的账户，并向您及您的监护人索偿相应损失。
          <br>
          <br>

          2、注册和账户
          <br>
          <br>

          a）当您按照注册页面提示填写信息、阅读并同意本协议且完成全部注册程序后，或在您按照激活页面提示填写信息、阅读并同意本协议且完成全部激活程序后，或您以其他白拿拿允许的方式实际使用白拿拿平台服务时，您即受本协议约束。您可以使用您提供或确认的邮箱或者白拿拿允许的其它方式作为登录手段进入白拿拿平台。
          <br>
          <br>

          b）您了解并同意，如您在白拿拿平台注册成功，您即可以同步获得由杭州秀客科技有限公司其他平台的登录名（包含但不仅限于白拿拿网登录名）。您可以通过您的白拿拿登录名直接登录杭州秀客科技有限公司支持白拿拿登录名登录的其他任意一家网站而无需重新注册。
          <br>
          <br>

          c）您在注册时可以对账户设置账号名称，一旦注册成功后，账号名称不予修改。您设置的白拿拿名称不得侵犯或涉嫌侵犯他人合法权益。如您设置的白拿拿名称涉嫌侵犯他人合法权益，白拿拿有权终止向您提供白拿拿平台服务，并冻结您的白拿拿账号。白拿拿账号一旦冻结将无法再进行使用。
          <br>
          <br>

          d）您的登录名、白拿拿账号和密码不得以任何方式买卖、转让、赠与或继承，除非有法律明确规定或司法裁定，并经白拿拿同意，且需提供白拿拿要求的合格的文件材料并根据白拿拿制定的操作流程办理。
          <br>
          <br>

          3、用户信息
          <br>
          <br>

          a）在注册或激活流程时，您应当依照法律法规要求，按相应页面的提示准确提供您的资料，并于资料信息变更时及时更新，以保证您所提交资料的真实、及时、完整和准确。如有合理理由怀疑您提供的资料错误、不实、过时或不完整的，白拿拿有权向您发出询问及/或要求改正的通知，并有权直接做出删除相应资料的处理，直至中止、终止对您提供部分或全部白拿拿平台服务。白拿拿对此不承担任何责任，您将承担因此产生的任何直接或间接损失及不利后果。
          <br>
          <br>

          b）您应当准确填写并及时更新您提供的电子邮件地址、联系电话、联系地址、邮政编码等联系方式，以便白拿拿或其他用户与您进行有效联系，因通过这些联系方式无法与您取得联系，导致您在使用白拿拿平台服务过程中产生任何损失或增加费用的，应由您完全独自承担。您了解并同意，您有义务保持您提供的联系方式的真实性和有效性，如有变更或需要更新的，您应按白拿拿的要求进行操作。
          <br>
          <br>

          4、账户安全
          <br>
          <br>

          您须自行负责对您在白拿拿注册时使用的邮箱、手机号码和密码保密，且须对您在该登录名、白拿拿昵称和密码下发生的所有活动（包括但不限于信息披露、发布信息、网上点击同意或提交各类规则协议、网上续签协议或购买服务等）承担责任。
          <br>
          您同意：
          <br>
          (a) 如发现任何人未经授权使用您的白拿拿账号，或发生违反保密规定的任何其他情况，您会立即通知白拿拿；
          <br>
          (b) 确保您在每个上网时段结束时，以正确步骤离开网站/服务。白拿拿不能也不会对因您未能遵守本款规定而发生的任何损失负责。您理解白拿拿对您的请求采取行动需要合理时间，白拿拿对在采取行动前已经产生的后果（包括但不限于您的任何损失）不承担任何责任。
          <br>
          <br>
          三、 白拿拿平台服务
          <br>
          <br>

          1、通过白拿拿及其关联公司提供的白拿拿平台服务和其它服务，会员可在白拿拿平台上创建活动、发布推广信息、查询商品和服务信息、达成试用意向并获取试用资格、对其他会员进行评价、参加白拿拿组织的活动以及使用其它信息服务及技术服务，具体以所开通的平台提供的服务内容为准。
          <br>
          <br>

          2、您在白拿拿平台使用服务过程中与其他会员发生纠纷时，一旦您或其它会员任一方或双方共同提交白拿拿要求调处，则白拿拿作为独立第三方，有权根据单方判断做出调处决定，您了解并同意接受白拿拿的判断和调处决定。
          <br>
          <br>

          3、您了解并同意，白拿拿有权应政府部门（包括司法及行政部门）的要求，向其提供您向白拿拿提供的用户信息和使用记录等必要信息。如您涉嫌侵犯他人利益、知识产权等合法权益，则白拿拿亦有权在初步判断涉嫌侵权行为存在的情况下，向权利人提供您必要的身份信息。
          <br>
          <br>

          4、您在使用白拿拿平台服务过程中，所产生的服务费，以及一切硬件、软件及其它方面的费用，均由您独自承担。
          <br>
          <br>

          四、白拿拿平台服务使用规范
          <br>
          <br>

          1、在白拿拿平台上使用白拿拿服务过程中，您承诺遵守以下约定：
          <br>
          <br>

          a)实施的所有行为均遵守国家法律、法规等规范性文件及白拿拿平台各项规则的规定和要求，不违背社会公共利益或公共道德，不损害他人的合法权益，不偷逃应缴税费，不违反本协议及相关规则。
          <br>
          <br>

          b)在与其他会员交易过程中，遵守诚实信用原则，不采取不正当竞争行为，不扰乱网上交易的正常秩序，不从事与网上交易无关的行为。
          <br>
          <br>

          c)不发布国家禁止销售的或限制推广的商品或服务信息（除非取得合法且足够的许可），不发布涉嫌侵犯他人知识产权或其它合法权益的商品或服务信息，不发布违背社会公共利益或公共道德或白拿拿认为不适合在白拿拿平台上推广的商品或服务信息，不发布其它涉嫌违法或违反本协议及各类规则的信息。
          <br>
          <br>

          d)不以虚构或歪曲事实的方式不当评价其他会员。
          <br>
          <br>

          e)不对白拿拿平台上的任何数据作商业性利用，包括但不限于在未经白拿拿事先书面同意的情况下，以复制、传播等任何方式使用白拿拿平台站上展示的资料。
          <br>
          <br>

          f)不使用任何装置、软件或例行程序干预或试图干预白拿拿平台的正常运作或正在白拿拿平台上进行的任何活动。您不得采取任何将导致不合理的庞大数据负载加诸白拿拿平台网络设备的行动。
          <br>
          <br>

          2、您了解并同意：
          <br>
          <br>
          a)您如果违反前述承诺，产生任何法律后果的，您应以自己的名义独立承担所有的法律责任，并确保白拿拿免于因此产生任何损失或增加费用。
          <br>
          <br>
          b)基于维护白拿拿平台活动秩序及交易安全的需要，白拿拿有权在发生恶意行为等扰乱活动秩序导致活动无法正常进行的情形下，执行限制申请活动等操作。
          <br>
          <br>
          c)经国家行政或司法机关的生效法律文书确认您存在违法或侵权行为，或者白拿拿根据自身的判断，认为您的行为涉嫌违反法律法规的规定或涉嫌违反本协议和/或相关规则的条款的，则白拿拿有权在白拿拿平台上公示您的涉嫌违法或违约行为及白拿拿已对您采取的措施。
          <br>
          <br>
          d)对于您在白拿拿平台上发布的涉嫌违法、涉嫌侵犯他人合法权利和/或违反本协议或相关规则的信息，白拿拿有权不经通知您即予以删除，且按照相关规则的规定对您进行处罚。
          <br>
          <br>
          e)对于您违反本协议项下承诺，或您在白拿拿平台上实施的行为，包括您未在白拿拿平台上实施但已经对白拿拿平台及其用户产生影响的行为，白拿拿有权单方认定您行为的性质及是否构成对本协议和/或规则的违反，并根据单方认定结果适用规则予以处理或终止向您提供服务，且无须征得您的同意或提前通知予您。您应自行保存与您行为有关的全部证据，并应对无法提供充要证据而承担的不利后果。
          <br>
          <br>
          f)如您涉嫌违反有关法律或者本协议之规定，使白拿拿遭受任何损失，或受到任何第三方的索赔，或受到任何行政管理部门的处罚，您应当赔偿白拿拿因此造成的损失和/或发生的费用，包括合理的律师费用。
          <br>
          <br>

          五、特别授权
          <br>
          <br>

          您完全理解并不可撤销地授予白拿拿及其关联公司下列权利：
          <br>
          <br>

          1、您完全理解并不可撤销地授权白拿拿或白拿拿授权的第三方或您与白拿拿一致同意的第三方，根据本协议及白拿拿规则的规定，处理您在白拿拿平台上发生的所有交易及可能产生的交易纠纷。您同意接受白拿拿或白拿拿授权的第三方或您与白拿拿一致同意的第三方的判断和调处决定。该决定将对您具有法律约束力。
          <br>
          <br>

          2、一旦您向白拿拿或其关联公司，作出任何形式的承诺，且相关公司已确认您违反了该承诺，则白拿拿有权立即按您的承诺或协议约定的方式对您的账户采取限制措施，包括中止或终止向您提供服务，并公示相关公司确认的您的违约情况。您了解并同意，白拿拿无须就相关确认与您核对事实，或另行征得您的同意，且白拿拿无须就此限制措施或公示行为向您承担任何的责任。
          <br>
          <br>

          3、一旦您违反本协议，或与白拿拿签订的其他协议的约定，白拿拿有权以任何方式通知白拿拿关联公司，要求其对您的权益采取限制措施，包括但不限于要求将您账户内的款项支付给白拿拿指定的对象，要求白拿拿关联公司中止、终止对您提供部分或全部服务，且在其经营或实际控制的任何网站公示您的违约情况。
          <br>
          <br>

          4、对于您提供的资料及数据信息，您授予白拿拿及其关联公司独家的、全球通用的、永久的、免费的许可使用权利 (并有权在多个层面对该权利进行再授权)。此外，白拿拿及其关联公司有权(全部或部份地) 使用、复制、修订、改写、发布、翻译、分发、执行和展示您的全部资料数据（包括但不限于注册资料、交易行为数据及全部展示于白拿拿平台的各类信息）或制作其派生作品，并以现在已知或日后开发的任何形式、媒体或技术，将上述信息纳入其它作品内。
          <br>
          <br>

          5、为方便您使用白拿拿平台服务或其他组织的服务（以下称其他服务），您同意并授权白拿拿将您在账户注册/激活、使用白拿拿平台服务过程中提供、形成的信息传递给向您提供其他服务或其他组织，或从提供其他服务其他组织获取您在注册/激活、使用其他服务期间提供、形成的信息。您同意不会因此追究白拿拿的责任。
          <br>
          <br>

          六、责任范围和责任限制
          <br>
          <br>

          1、白拿拿负责按"现状"和"可得到"的状态向您提供白拿拿平台服务。但白拿拿对白拿拿平台服务不作任何明示或暗示的保证，包括但不限于白拿拿平台服务的适用性、没有错误或疏漏、持续性、准确性、可靠性、适用于某一特定用途。同时，白拿拿也不对白拿拿平台服务所涉及的技术及信息的有效性、准确性、正确性、可靠性、质量、稳定、完整和及时性作出任何承诺和保证。
          <br>
          <br>
          2、您了解白拿拿平台上的信息系用户自行发布，且可能存在风险和瑕疵。白拿拿平台仅作为宣传推广的交易平台。白拿拿平台仅作为您获取物品或服务信息、提供推广渠道、购物资讯、交流、交易进行协商及开展交易的场所，但白拿拿无法控制交易所涉及的物品的质量、安全或合法性，商贸信息的真实性或准确性，以及交易各方履行其在贸易协议中各项义务的能力。您应自行谨慎判断确定相关物品及/或信息的真实性、合法性和有效性，并自行承担因此产生的责任与损失。
          <br>
          <br>

          3、除非法律法规明确要求，或出现以下情况，否则，白拿拿没有义务对所有用户的信息数据、商品和服务信息、交易行为以及与交易有关的其它事项进行事先审查：
          <br>
          <br>

          a)白拿拿有合理的理由认为特定会员及具体交易事项可能存在重大违法或违约情形。
          <br>
          <br>

          b)白拿拿有合理的理由认为用户在白拿拿平台的行为涉嫌违法或不当。
          <br>
          <br>

          4、白拿拿或白拿拿授权的第三方或您与白拿拿一致同意的第三方有权基于您不可撤销得授权受理您与其他会员因交易产生的争议，并有权单方判断与该争议相关的事实及应适用的规则，进而作出处理决定，包括但不限于调整相关试用的参与流程状态，将争议款项的全部或部分支付给交易一方或双方。该处理决定对您有约束力。如您未在限期内执行处理决定的，则白拿拿有权利（但无义务）直接使用您账户内的款项，或您向白拿拿及其关联公司交纳的保证金/违约金代为支付。您应及时补足保证金/违约金并弥补白拿拿及其关联公司的损失，否则白拿拿及其关联公司有权直接抵减您在其它合同项下的权益，并有权继续追偿。

          您理解并同意，白拿拿或白拿拿授权的第三方或您与白拿拿一致同意的第三方并非司法机构，仅能以普通人的身份对证据进行鉴别，白拿拿或白拿拿授权的第三方或您与白拿拿一致同意的第三方对争议的调处完全是基于您不可撤销得授权，其无法保证争议处理结果符合您的期望，也不对争议调处结论承担任何责任。如您因此遭受损失，您同意自行向受益人索偿。
          <br>
          <br>

          5、您了解并同意，白拿拿不对因下述任一情况而导致您的任何损害赔偿承担责任，包括但不限于商誉、使用、数据、资金等方面的损失或其它无形损失的损害赔偿 (无论白拿拿是否已被告知该等损害赔偿的可能性) ：
          <br>
          <br>

          a)使用或未能使用白拿拿平台服务。
          <br>
          <br>

          b)第三方未经批准的使用您的账户或更改您的数据。
          <br>
          <br>

          c)通过白拿拿平台服务试用或获取任何商品、样品、数据、信息或进行试用等行为或替代行为产生的费用及损失。
          <br>
          <br>

          d)您对白拿拿平台服务的误解。
          <br>
          <br>

          e)任何非因白拿拿的原因而引起的与白拿拿平台服务有关的其它损失。
          <br>
          <br>

          6、不论在何种情况下，白拿拿均不对由于信息网络正常的设备维护，信息网络连接故障，电脑、通讯或其他系统的故障，电力故障，罢工，劳动争议，暴乱，起义，骚乱，生产力或生产资料不足，火灾，洪水，风暴，爆炸，战争，政府行为，司法行政机关的命令或第三方的不作为而造成的不能服务或延迟服务承担责任。
          <br>
          <br>

          七、协议终止
          <br>
          <br>

          1、您同意，白拿拿有权自行全权决定以任何理由不经事先通知的中止、终止向您提供部分或全部白拿拿平台服务，暂时冻结或永久冻结您的账户在白拿拿平台的权限，且无须为此向您或任何第三方承担任何责任。
          <br>
          <br>

          2、出现以下情况时，白拿拿有权直接以冻结账户的方式终止本协议，并有权永久冻结您的账户在白拿拿平台的权限：
          <br>
          <br>

          a)白拿拿终止向您提供服务后，您涉嫌再一次直接或间接以他人名义注册为白拿拿用户的；
          <br>
          <br>

          b)您提供的电子邮箱不存在或无法接收电子邮件，且没有其他方式可以与您进行联系，或白拿拿以其它联系方式通知您更改电子邮件信息，而您在白拿拿通知后三个工作日内仍未更改为有效的电子邮箱的。
          <br>
          <br>

          c)您提供的用户信息中的主要内容不真实或不准确或不及时或不完整；
          <br>
          <br>

          d)本协议（含规则）变更时，您明示并通知白拿拿不愿接受新的服务协议的；
          <br>
          <br>

          e)其它白拿拿认为应当终止服务的情况。
          <br>
          <br>

          3、您的账户服务被终止或者账户在白拿拿平台的权限被永久冻结后，白拿拿没有义务为您保留或向您披露您账户中的任何信息，也没有义务向您或第三方转发任何您未曾阅读或发送过的信息。
          <br>
          <br>

          4、您同意，您与白拿拿的合同关系终止后，白拿拿仍享有下列权利：
          <br>
          <br>

          a）继续保存您的用户信息及您使用白拿拿平台服务期间的所有交易信息。
          <br>
          <br>

          b)您在使用白拿拿平台服务期间存在违法行为或违反本协议和/或规则的行为的，白拿拿仍可依据本协议向您主张权利。
          <br>
          <br>

          5、白拿拿中止或终止向您提供白拿拿平台服务后，对于您在服务中止或终止之前的交易行为依下列原则处理，您应独力处理并完全承担进行以下处理所产生的任何争议、损失或增加的任何费用，并应确保白拿拿免于因此产生任何损失或承担任何费用：
          <br>
          <br>

          a)您在服务中止或终止之前已经上传至白拿拿平台的活动或未上线的活动，白拿拿有权在中止或终止服务的同时删除此项活动商品或服务的相关信息；
          <br>
          <br>

          b)您在服务中止或终止之前已经与其他会员达成试用关系，但试用流程尚未实际履行的，白拿拿有权删除该试用活动及其活动商品或服务的相关信息；
          <br>
          <br>

          c)您在服务中止或终止之前已经与其他会员达成试用关系且试用流程已部分履行的，白拿拿可以不删除该项活动，但白拿拿有权在中止或终止服务的同时将相关情形通知您的试用对方。
          <br>
          <br>
          八、隐私权政策
          <br>
          <br>
          白拿拿将在白拿拿平台公布并不时修订隐私权政策，隐私权政策构成本协议的有效组成部分。
          <br>
          <br>
          九、法律适用、管辖与其他
          <br>
          <br>
          1、本协议之效力、解释、变更、执行与争议解决均适用中华人民共和国大陆地区法律，如无相关法律规定的，则应参照通用国际商业惯例和/或行业惯例。
          <br>
          <br>
          2、本协议包含了您使用各家平台需遵守的一般性规范，您在使用某个台时还需遵守适用于该平台的特殊性规范（具体请参见您与该平台签署的其他协议以及平台规则等内容）。一般性规范如与特殊性规范不一致或有冲突，则特殊性规范具有优先效力。
          <br>
          <br>
          3、因本协议产生之争议需根据您使用的服务归属的平台确定具体的争议对象，例如因您使用白拿拿服务所产生的争议应由白拿拿的经营者与您沟通并处理。一旦产生争议，您与白拿拿平台的经营者均同意以被告住所地人民法院为第一审管辖法院。
          <br>
          <br>
      </p>
      </div>
      <div slot="footer" class="text-ct">
        <iButton type="error" size="large"   @click="agreementShow = false;">关闭</iButton>
      </div>
    </Modal>
  </div>
</template>

<script>
  import Icon from 'iview/src/components/icon'
  import Form from 'iview/src/components/form'
  import Input from 'iview/src/components/input'
  import Button from 'iview/src/components/button'
  import Checkbox from 'iview/src/components/checkbox'
  import api from '@/config/apiConfig'
  import SmsCountdown from '@/components/SmsCountdown'
  import RoleTop from '@/components/RoleTop.vue'
  import Modal from 'iview/src/components/modal'
  import {getCookie,setCookie,delCookie,setStorage, getStorage,removeStorage} from '@/config/utils'
  export default {
    name: 'register',
    components: {
      iInput: Input,
      iForm: Form,
      FormItem: Form.Item,
      iButton: Button,
      Checkbox: Checkbox,
      CheckboxGroup: Checkbox.Group,
      Icon: Icon,
      SmsCountdown: SmsCountdown,
      RoleTop: RoleTop,
      Modal: Modal,
    },
    data() {
      //表单验证
      const validatePhone = (rule, value, callback) => {
        if (!(/^1[34578]\d{9}$/.test(value))) {
          callback(new Error('请输入正确手机号'));
        } else {
          callback();
        }
      };
      const validatePass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入密码'));
        } else {
          if (this.formCustom.pwd !== '') {
            // 对第二个密码框单独验证
            this.$refs.formCustom.validateField('repwd');
          }
          callback();
        }
      };
      const validateImgCode = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入验证码'));
        } else {
          callback()
        }
      };
      const validatePassCheck = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请再次输入密码'));
        } else if (value !== this.formCustom.pwd) {
          callback(new Error('两次输入密码不一致!'));
        } else {
          callback();
        }
      };
      const validateSmsCode = (rule, value, callback) => {
        if (!value) {
          return callback(new Error('不能为空'));
        } else if (!Number.isInteger(value)) {
          callback(new Error('请输入数字值'));
        } else {
          callback()
        }
      };
      const validateAgreeStrip = (rule, value, callback) => {
        if (!this.formCustom.agreeStrip) {
          return callback(new Error('请仔细阅读，并勾选！'));
        } else {
          callback();
        }
      };
      return {
        agreementShow: false,
        countRegTimeText: "获取动态码",
        regImgSrc: null,
        selLogin: {
          buyer: true,
          seller: false
        },
        formRes: {
          phoneRes: false,
        },
        btnState: {
          registerBuyerBtn: false,
          registerSellerBtn: false,
        },
        formCustom: {
          phone: '',
          pwd: '',
          repwd: '',
          validateCode: '',
          smsCode: '',
          role: '',
          purpose: 'reg',
          agreeStrip: true,
        },
        checked:['agree'],
        ruleCustom: {
          phone: [
            {validator: validatePhone, trigger: 'blur'}
          ],
          pwd: [
            {validator: validatePass, trigger: 'blur'}
          ],
          repwd: [
            {validator: validatePassCheck, trigger: 'blur'}
          ],
          validateCode: [
            {validator: validateImgCode, trigger: 'blur'}
          ],
          smsCode: [
            {validator: validateSmsCode, trigger: 'blur'}
          ],
          agreeStrip: [
            {validator: validateAgreeStrip, trigger: 'blur'}
          ]

        }
      }
    },
    created() {
      this.getRegVrcode();
      if (this.$route.name === 'seller') {
        this.selLogin.buyer = false;
        this.selLogin.seller = true;
      }
    },
    methods: {
      getRegVrcode() {
        this.regImgSrc = "/api/vrcode.json?rand=" + new Date() / 100
      },
      selLoginFunc(num) {
        if(num === 0){
          this.selLogin.buyer = true;
          this.selLogin.seller = false
        }else {
          this.selLogin.seller = true;
          this.selLogin.buyer = false;
        }
      },
      showFormWarn(res) {
        res = true;
      },
      handleSubmit(name, callback) {
        let res = false;
        this.$refs[name].validate((valid) => {
          res = valid
        });
        if (typeof callback === 'function' && res) {
          callback();
        }
      },
      handleReset(name) {
        this.$refs[name].resetFields();
      },
      registerBuyer() {
        this.formCustom.role = 0;
        let self = this;
        let recommendCode = '';
        self.btnState.registerBuyerBtn = true;
        if(getCookie('recommendCode')){
          recommendCode = getCookie('recommendCode');
        }
        api.register({
          phone: self.formCustom.phone,
          pwd: self.formCustom.pwd,
          repwd: self.formCustom.repwd,
          nickName: '',
          smsCode: self.formCustom.smsCode,
          validateCode: self.formCustom.validateCode,
          role: self.formCustom.role,
          purpose: 'reg',
          recommendCode: recommendCode,
          platForm: 'PC',
        }).then((res) => {
          if (res.status) {
            self.$Message.success({
              content: "注册成功",
              duration: 1,
              onClose: function () {
                delCookie('recommendCode');
                self.setUserInfo(self.formCustom.phone, self.formCustom.pwd);
              }
            });
          } else {
            self.$Message.error({
              content: res.msg,
              duration: 9
            });
            self.getRegVrcode();
          }
          self.btnState.registerBuyerBtn = false;
        })
      },
      registerSeller() {
        let self = this;
        self.formCustom.role = 1;
        let recommendCode = '';
        self.btnState.registerSellerBtn = true;
        if(getCookie('recommendCode')){
          recommendCode = getCookie('recommendCode');
        }
        api.register({
          phone: self.formCustom.phone,
          pwd: self.formCustom.pwd,
          repwd: self.formCustom.repwd,
          nickName: '',
          smsCode: self.formCustom.smsCode,
          validateCode: self.formCustom.validateCode,
          role: self.formCustom.role,
          purpose: 'reg',
          recommendCode: recommendCode,
          platForm: 'PC',
        }).then((res) => {
          if (res.status) {
            self.$Message.success({
              content: "注册成功",
              duration: 1,
              onClose: function () {
                delCookie('recommendCode');
                self.setUserInfo(self.formCustom.phone, self.formCustom.pwd,self.formCustom.role);
              }
            });

          } else {
            self.$Message.error({
              content: res.msg,
              duration: 9
            });
            self.getRegVrcode();
          }
          self.btnState.registerSellerBtn = false;
        })
      },
      setUserInfo(phone, pwd) {
        let self = this;
        api.login({
          phone: phone,
          passWord: pwd,
          platForm: 'PC'
        }).then((res) => {
          if (res.status) {
            self.$store.commit({
              type: 'RECORD_USER_INFO',
              info: res.data
            });
            if(res.data.role === 1) {
              self.$router.push({name: 'SellerTest'});
            }else {
              self.$router.push({name: 'WwBind'});
            }
//            self.$store.dispatch('getDetectionMerchantGuide');
          } else {
            self.$Message.error({
              content: res.msg,
              duration: 9
            });
          }
        })
      },
      sendCodeSuccess(res) {
        let self = this;
        if (res.status) {
          self.$Message.success({
            content:  "短信验证码发送成功！",
            duration: 1,
          });
        } else {
          self.$Message.error({
            content: res.msg,
            duration: 9
          });
          self.getRegVrcode();
        }
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import 'src/css/mixin';

  .register-ctt {
    padding-bottom: 50px;
  }

  .register-ctt-top {
    margin-top: 60px;
    border-bottom: 2px solid #E6E6E6;
    height: 42px;
    line-height: 42px;
    > div {
      width: 172px;
      text-align: center;
      font-size: 16px;
      span {
        display: inline-block;
        width: 22px;
        height: 22px;
        line-height: 22px;
        background-color: #CCCCCC;
        color: #fff;
        border-radius: 50%;
        text-align: center;
      }
      > div {
        position: relative;
        left: 40px;
      }
    }
    > div.active {
      color: #000;
      font-weight: bold;
      span {
        background-color: $mainColor;
      }
    }
    > div:first-child {
      margin-left: 360px;
      margin-right: 129px;
    }
    .register-ctt-top-line {
      position: absolute;
      width: 172px;
      border-bottom: 2px solid $mainColor;
      left: 360px;
      bottom: -2px;
    }
  }

  .register-form-box {
    width: 1000px;
    margin: 40px auto auto auto;
    border: 1px solid #ccc;
    .form-box {
      padding-bottom: 30px;
      .register-seller-btn{
        background-color: #FF6865;
        color: #fff;
      }
      .register-buyer-btn{
        background-color: #ff6633;
        color: #fff;
      }
      div.form-input-box {
        width: 800px;
        > div {
          span {
            background-color: #EAEAEA;
            color: #999;
            padding: 0 10px;
            position: absolute;
            right: 7px;
            top: 7px;
            height: 24px;
            line-height: 24px;
          }
        }
        > a {
          display: inline-block;
          height: 38px;
          line-height: 38px;
          margin-left: 30px;
        }
      }
    }
    .register-form-sel {
      overflow: hidden;
      > a {
        float: left;
        width: 50%;
        height: 48px;
        line-height: 48px;
        background-color: #ccc;
        color: #fff;
        text-align: center;
        font-size: 16px;

        img {
          vertical-align: middle;
        }
      }
      > a.buyActive {
        background-color: $mainColor;
      }
      > a.sellerActive {
        background-color: #FF6865;
      }
    }
  }
</style>

