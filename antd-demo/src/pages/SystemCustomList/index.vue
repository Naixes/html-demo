<template>
  
  <a-layout-content style="padding: 16px">
    <!-- 白色容器 -->
    <div :style="{ background: '#fff', minHeight: '360px' }">
      <!-- 头部 -->
      <div class="table-header">
        <h3 class="table-title">系统用户管理</h3> 
        <!-- 检索 -->
        <a-input-search
          placeholder="请输入用户账号/名称"
          style="width: 200px"
        />
        <!-- 按钮 -->
        <a-button class="editable-add-btn" type="primary" @click="handleAdd">创建</a-button>
        <!-- 创建模态框 -->
        <!-- centered：位置居中 -->
        <a-modal
          title="创建用户"
          v-model="visible"
          @ok="handleOk"
          width="570px"
          :bodyStyle="bodyStyle"
          :maskClosable="maskClosable"
          centered

        >
          <!-- 模态框表单 -->
          <a-form
            :form="form"
          >
            <!-- v-bind="formItemLayout"设置表单元素样式 -->
            <a-form-item
              v-bind="formItemLayout"
              label="账号"
            >
              <a-input
                v-decorator="[
                  'account',
                  {
                    rules: [{
                      required: true
                    }]
                  }
                ]"
                placeholder="请输入用户账号"
              ></a-input>
            </a-form-item>

            <a-form-item
              v-bind="formItemLayout"
              label="用户名称"
            >
              <a-input
                v-decorator="[
                  'userName',
                  {
                    rules: [{
                      required: true
                    }]
                  }
                ]"
                placeholder="请输入用户名称"
              ></a-input>
            </a-form-item>

            <a-form-item
              v-bind="formItemLayout"
              label="密码"
            >
              <!-- rules：校验规则 -->
              <a-input
                v-decorator="[
                  'password',
                  {
                    rules: [
                      { required: true, message: '密码不能为空' },
                      { min: 8, message: '密码长度为8-20位' },
                      { max: 20, message: '密码长度为8-20位' },
                    ]
                  }
                ]"
                placeholder="请输入8-20位的密码"
              ></a-input>
            </a-form-item>

            <a-form-item
              v-bind="formItemLayout"
              label="部门"
            >
              <a-input
                v-decorator="[
                  'department',
                  {
                    rules: [{
                      required: true
                    }]
                  }
                ]"
                placeholder="请输入用户所属部门"
              ></a-input>
            </a-form-item>

            <a-form-item
              v-bind="formItemLayout"
              label="岗位"
            >
              <a-input
                v-decorator="[
                  'post',
                  {
                    rules: [{
                      required: true
                    }]
                  }
                ]"
                placeholder="请输入用户所在岗位"
              ></a-input>
            </a-form-item>

            <a-form-item
              v-bind="formItemLayout"
              label="所属权限组"
            >
              <a-select
                v-decorator="[
                  'post',
                  {
                    rules: [{
                      required: true
                    }]
                  }
                ]"
                placeholder="请选择所属的权限组"
              >
                <a-select-option value="publicRelations">
                  公关组
                </a-select-option>
                <a-select-option value="frontEnd">
                  前端用户
                </a-select-option>
              </a-select>
            </a-form-item>
          </a-form>
        </a-modal>
      </div>
      <a-table 
      :dataSource="dataSource" 
      :columns="columns"
      :pagination="pagination"
      >
        <!-- 操作列 -->
        <template slot="operation" slot-scope="text, record">
          <a-popconfirm
            v-if="dataSource.length"
            title="Sure to delete?"
            @confirm="() => onDelete(record.key)">
            <a class="table-operation" href="javascript:;">查看</a>
            <a-divider type="vertical" />
            <a class="table-operation" href="javascript:;">编辑</a>
            <a-divider type="vertical" />
            <a class="table-operation" href="javascript:;">删除</a>
          </a-popconfirm>
        </template>
      </a-table>
    </div>
  </a-layout-content>
</template>
<script>

export default {
  components: {
    // Pagination
  },
  data () {
    return {
      // 分页配置
      pagination: {
        showQuickJumper: true,
        showSizeChanger: true,
        pageSize: 10
      },

      // 检索框
      formLayout: 'horizontal',
      form: this.$form.createForm(this),

      // 模态框
      visible: false,
      bodyStyle: {
        height: "307px"
      },
      // 点击外侧不关闭模态框
      maskClosable: false,

      // 表单
      formItemLayout: {
        // 栅格化布局
        // 也可以在模板上直接绑定
        // 标签的宽度
        labelCol: {
          sm: { span: 8 }
        },
        // 输入框的宽度
        wrapperCol: {
          sm: { span: 11 }
        }
      },

      // 数据
      dataSource: Array.from(Array(50), (x,i) => ({
        key: i + 1,
        account: 'zhangsan.com',
        name: '张三',
        department: '采购部',
        post: '采购组长',
        group: '权限组A',
      })),
      count: 6,
      columns: [{
        title: '编号',
        dataIndex: 'key',
      }, 
      {
        title: '用户账号',
        dataIndex: 'account',
      }, 
      {
        title: '用户名称',
        dataIndex: 'name',
      },
      {
        title: '部门',
        dataIndex: 'department',
      }, 
      {
        title: '岗位',
        dataIndex: 'post',
      }, 
      {
        title: '所属权限组',
        dataIndex: 'group',
      }, 
      {
        title: '操作',
        align: 'center',
        dataIndex: 'operation',
        scopedSlots: { customRender: 'operation' },
      }],
    }
  },
  beforeCreate () {
    this.form = this.$form.createForm(this);
  },
  methods: {
    onDelete (key) {
      const dataSource = [...this.dataSource]
      this.dataSource = dataSource.filter(item => item.key !== key)
    },
    handleAdd () {
      this.showModal()
      // const { count, dataSource } = this
      // const newData = {
      //   key: count,
      //   account: 'zhangsan.com',
      //   name: '张三',
      //   department: '采购部',
      //   post: '采购组长',
      //   group: '权限组A',
      // }
      // this.dataSource = [...dataSource, newData]
      // this.count = count + 1
    },
    showModal() {
      this.visible = true
    },
    handleOk() {
      // console.log(e);
      this.visible = false
    },
  },
}
</script>

<style lang="scss">

// 模态框（全局模态框过多时，可移到父组件，利用slot优化）
.ant-modal{
  .ant-modal-content {
    border-radius: 10px;
    .ant-modal-header {
      .ant-modal-title {
        font-weight: 700;
      }
      padding: 30px 24px;
      border-radius: 10px 10px 0 0;
      border-bottom: none;
      text-align: center;
    }
    .ant-modal-body {
      padding: 0 24px;

      // 登录表单
      .ant-form {

        .ant-form-item {
          margin-bottom: 10px;

          .ant-form-explain {
            position: absolute;
            line-height: 1;
          }
        }
      }
    }
    .ant-modal-footer {
      border-top: 1px solid #E9E9E9;
      padding: 24px 16px;
    }
  }
}
.ant-layout-content {
  // 覆盖原有的min-height: 0;
  min-height: fit-content;

  font-size:16px;
  font-family:PingFangSC-Medium;
  font-weight:400;
  color:rgba(51,51,51,1);

  // 头部样式 
  .table-header {
    position: relative;
    padding: 16px;
    height: 56px;
    border-bottom: 1px solid #E9E9E9;
    // 标题样式
    .table-title {
      margin: 0;
      display: inline-block;
      font-size:16px;
      font-weight:700;
      color:rgba(51,51,51,1);
    }
    // 检索框
    .ant-input-search {
      position: absolute;
      top: 12px;
      right: 102px;
    }
    // 头部按钮
    .editable-add-btn {
      position: absolute;
      top: 12px;
      right: 16px;
    }
  }

  // 表格容器
  .ant-table-wrapper {
    padding: 16px;
    padding-top: 0;
    min-width: 912px;
    .ant-spin-nested-loading {

      .ant-table {
        // 显示滚动条
        .ant-table-content {
          min-width: 1078px;
        }
        overflow-x: auto;
      }
    }

    .ant-table-body {
      margin-top: 16px;

      // 修改表头样式
      .ant-table-thead > tr > th {
        font-weight:700;
        white-space: nowrap;
        color:rgba(51,51,51,1);
      }
      .table-operation {
        padding: 0 10px;
      }

      .table-operation:nth-of-type(1) {
        color: #21B35D;
      }
      .table-operation:nth-of-type(3) {
        color: #FA5555;
      }
    }
  }

  // 覆盖修改行的内边距
  // .ant-table-thead > tr > th, .ant-table-tbody > tr > td {
  //   // 修改后表格内容会超出
  //   padding: 16px 40px;
  //   white-space: nowrap;
  // }

  .editable-cell {
    position: relative;
  }

  .editable-cell-input-wrapper,
  .editable-cell-text-wrapper {
    padding-right: 24px;
  }

  .editable-cell-text-wrapper {
    padding: 5px 24px 5px 5px;
  }

  .editable-add-btn {
    margin-bottom: 8px;
  }
}
</style>
