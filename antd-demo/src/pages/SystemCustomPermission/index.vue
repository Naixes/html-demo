<template>
    <a-layout-content style="margin: 16px">
      <!-- 白色容器 -->
      <div :style="{ background: '#fff', minHeight: '360px' }">
        <!-- 头部 -->
        <div class="table-header">
          <h3 class="table-title">系统用户管理</h3> 
          <!-- 按钮 -->
          <a-button class="editable-save-btn" type="primary">保存</a-button>
          <a-button class="editable-return-btn" type="default">返回</a-button>
        </div>
        <div class="table-content" style="padding: 16px">
          <!-- 表单 -->
          <a-form :form="form">
            <a-form-item label="权限组名称">
              <a-input
                v-decorator="[
                  'postGroup',
                  {
                    rules: [{
                      required: true, message: '权限组名称不能为空'
                    }]
                  }
                ]"
              ></a-input>
            </a-form-item>
            <!-- 包含权限 -->
            <label class="permission-label">包含权限：</label>
            <ul class="form-permission">
              <li>
                <h4 class="permission-title">
                  <!-- option：valuePropName：属性名；initialValue：初始值 -->
                  <a-checkbox
                    @change="handleChange('systemUserClass')"
                    v-decorator="[
                      'systemUser',
                      {
                        valuePropName: 'checked',
                        initialValue: false
                      }
                    ]"
                  >
                  系统用户
                  </a-checkbox>
                </h4>
                <div class="permission-content">
                    <!-- ant-checkbox-checked：设置选中 -->
                    <a-checkbox :class="systemUserClass" value="systemUserManage">
                      系统用户管理
                    </a-checkbox>
                    <a-checkbox :class="systemUserClass" value="permissionGroup">
                      权限组
                    </a-checkbox>
                </div>
              </li>
              <li>
                <h4 class="permission-title">
                  <a-checkbox
                    :indeterminate="indeterminate"
                    @change="onCheckAllChange"
                    :checked="checkAll"
                  >
                  前端用户
                  </a-checkbox>
                </h4>
                <div class="permission-content">
                   <a-checkbox-group :options="plainOptions" v-model="checkedList" @change="onChange" />

                  <!-- <label :class="frontEndUserWrapperClass" class="ant-checkbox-wrapper" @change="handleChange('frontEndUserClass')">
                    <span :class="frontEndUserClass" class="ant-checkbox"></span>
                    <span>代理商管理</span>
                  </label>
                  <label :class="frontEndUserWrapperClass" class="ant-checkbox-wrapper">
                    <span :class="frontEndUserClass" class="ant-checkbox"></span>
                    <span>准代理商管理</span>
                  </label>
                  <label :class="frontEndUserWrapperClass" class="ant-checkbox-wrapper">
                    <span :class="frontEndUserClass" class="ant-checkbox"></span>
                    <span>仓管人员管理</span>
                  </label> -->
                </div>
              </li>
              <li>
                <h4 class="permission-title">
                  <!-- option：valuePropName：属性名；initialValue：初始值 -->
                  <a-checkbox
                    @change="handleChange('teamManageClass')"
                    v-decorator="[
                      'teamManage',
                      {
                        valuePropName: 'checked',
                        initialValue: false
                      }
                    ]"
                  >
                  团队管理
                  </a-checkbox>
                </h4>
                <div class="permission-content">
                  <a-checkbox :class="teamManageClass" value="team">
                    团队
                  </a-checkbox>
                  <a-checkbox :class="teamManageClass" value="trainingTeam">
                    培训团队人员
                  </a-checkbox>
                  <a-checkbox :class="teamManageClass" value="courseManage">
                    课件管理
                  </a-checkbox>
                </div>
              </li>
              <li>
                <h4 class="permission-title">
                  <!-- option：valuePropName：属性名；initialValue：初始值 -->
                  <a-checkbox
                    @change="handleChange('orderManageClass')"
                    v-decorator="[
                      'orderManage',
                      {
                        valuePropName: 'checked',
                        initialValue: false
                      }
                    ]"
                  >
                  订单管理
                  </a-checkbox>
                </h4>
                <div class="permission-content">
                  <a-checkbox :class="orderManageClass" value="">
                    向公司进货
                  </a-checkbox>
                  <a-checkbox :class="orderManageClass" value="">
                    向公司进货（优惠券）
                  </a-checkbox>
                  <a-checkbox :class="orderManageClass" value="">
                    向代理商进货
                  </a-checkbox>
                  <a-checkbox :class="orderManageClass" value="">
                    代理商订单发货
                  </a-checkbox>
                  <a-checkbox :class="orderManageClass" value="">
                    公司发货
                  </a-checkbox>
                  <a-checkbox :class="orderManageClass" value="">
                    产品扫码
                  </a-checkbox>
                </div>
              </li>
              <li>
                <h4 class="permission-title">
                  <!-- option：valuePropName：属性名；initialValue：初始值 -->
                  <a-checkbox
                    @change="handleChange('productManageClass')"
                    v-decorator="[
                      'productManage',
                      {
                        valuePropName: 'checked',
                        initialValue: false
                      }
                    ]"
                  >
                  产品管理
                  </a-checkbox>
                </h4>
                <div class="permission-content">
                  <a-checkbox :class="productManageClass" value="allProduct">
                    全部产品
                  </a-checkbox>
                  <a-checkbox :class="productManageClass" value="addProduct">
                    添加产品
                  </a-checkbox>
                </div>
              </li>
              <li>
                <h4 class="permission-title">
                  <!-- option：valuePropName：属性名；initialValue：初始值 -->
                  <a-checkbox
                    @change="handleChange('materialManageClass')"
                    v-decorator="[
                      'materialManage',
                      {
                        valuePropName: 'checked',
                        initialValue: false
                      }
                    ]"
                  >
                  素材库管理
                  </a-checkbox>
                </h4>
                <div class="permission-content">
                  <a-checkbox :class="materialManageClass" value="materialSort">
                    素材分类
                  </a-checkbox>
                  <a-checkbox :class="materialManageClass" value="materialLibrary">
                    素材库
                  </a-checkbox>
                </div>
              </li>
              <li>
                <h4 class="permission-title">
                  <a-checkbox
                    @change="handleChange('integralManageClass')"
                    v-decorator="[
                      'integralManage',
                      {
                        valuePropName: 'checked',
                        initialValue: false
                      }
                    ]"
                  >
                  积分管理
                  </a-checkbox>
                </h4>
                <div class="permission-content">
                  <a-checkbox :class="integralManageClass" value="rules">
                    积分规则
                  </a-checkbox>
                  <a-checkbox :class="integralManageClass" value="bonus">
                    积分奖励
                  </a-checkbox>
                  <a-checkbox :class="integralManageClass" value="cash">
                    积分提现
                  </a-checkbox>
                </div>
              </li>
              <li>
                <h4 class="permission-title">
                  <a-checkbox
                    @change="handleChange('messageManageClass')"
                    v-decorator="[
                      'messageManage',
                      {
                        valuePropName: 'checked',
                        initialValue: false
                      }
                    ]"
                  >
                  消息通知
                  </a-checkbox>
                </h4>
                <div class="permission-content">
                  <a-checkbox :class="messageManageClass" value="messageList">
                    通知列表
                  </a-checkbox>
                  <a-checkbox :class="messageManageClass" value="complain">
                    投诉处理
                  </a-checkbox>
                </div>
              </li>
              <li>
                <h4 class="permission-title">
                  <!-- option：valuePropName：属性名；initialValue：初始值 -->
                  <a-checkbox
                    @change="handleChange('systemOperationClass')"
                    v-decorator="[
                      'systemOperation',
                      {
                        valuePropName: 'checked',
                        initialValue: false
                      }
                    ]"
                  >
                  系统运营
                  </a-checkbox>
                </h4>
                <div class="permission-content">
                  <a-checkbox :class="systemOperationClass" value="">
                    市场贡献指数
                  </a-checkbox>
                  <a-checkbox :class="systemOperationClass" value="">
                    销售额
                  </a-checkbox>
                  <a-checkbox :class="systemOperationClass" value="">
                    招募管理
                  </a-checkbox>
                  <a-checkbox :class="systemOperationClass" value="">
                    公司收款账号管理
                  </a-checkbox>
                  <a-checkbox :class="systemOperationClass" value="">
                    押金设置
                  </a-checkbox>
                  <a-checkbox :class="systemOperationClass" value="">
                    账号期限设置
                  </a-checkbox>
                </div>
                <div class="permission-content">
                    <a-checkbox :class="systemOperationClass" value="">
                      协议规则
                    </a-checkbox>
                    <a-checkbox :class="systemOperationClass" value="">
                      优惠券管理
                    </a-checkbox>
                </div>
              </li>
            </ul>
          </a-form>
        </div>
      </div>
    </a-layout-content>
</template>
<script>
const plainOptions = ['代理商管理', '准代理商管理', '仓管人员管理']
const defaultCheckedList = []

export default {

  data() {
    return {
      // checkbox
      checkedList: defaultCheckedList,
      indeterminate: true,
      checkAll: false,
      plainOptions,
      // 表单
      form: this.$form.createForm(this)
    }
  },
  methods: {
    // checkbox
    onChange (checkedList) {
      this.indeterminate = !!checkedList.length && (checkedList.length < plainOptions.length)
      this.checkAll = checkedList.length === plainOptions.length
    },
    onCheckAllChange (e) {
      Object.assign(this, {
        checkedList: e.target.checked ? plainOptions : [],
        indeterminate: false,
        checkAll: e.target.checked,
      })
    },
  }
  // beforeCreate () {
  //   this.form = this.$form.createForm(this);
  // }
}
</script>

<style lang="less">
.table-header {
  // 按钮可以优化统一样式
  .editable-save-btn {
    position: absolute;
    top: 12px;
    right: 96px;
  }
  .editable-return-btn {
    position: absolute;
    top: 12px;
    right: 16px;
  }
}
.table-content {
  // 输入框布局
  .ant-row {
    display: flex;
    label {
      font-size: 16px;
    }
    .ant-form-item-control{
      width: 400px;
      // 修改输入框高度
      // .ant-input {
      //   height: 38px;
      // }
    }
  }

  .permission-label {
      font-size: 16px;
  }

  .form-permission {
    padding: 0;
    margin: 0;
    li:nth-last-of-type(1) div:nth-last-of-type(2) {
      border-bottom: 1px solid #D9D9D9;
    }
    li {
      margin: 16px 0;
      border: 1px solid #D9D9D9;
      list-style: none;

      // 勾选框
      .ant-checkbox {
        margin-right: 16px; 
      }

      h4 {
        margin: 0;
        border-bottom: 1px solid #D9D9D9;
        .ant-checkbox-wrapper {
          display: flex;
          align-items: center;
          height: 54px;
          padding-left: 16px;
        }
        span {
          font-weight: 700;
        }
      }
      .permission-content {
        display: flex;
        flex-wrap: wrap;

        .ant-checkbox-wrapper {
          min-width: 148px;
          margin: 0;
          // span垂直居中
          display: flex;
          align-items: center;

          height: 54px;
          padding-left: 16px;
        }
      }
    }
  }
}
</style>
