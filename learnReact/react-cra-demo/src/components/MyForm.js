import React from 'react';

import { Input, Button } from "antd";

// 高阶组件,添加表单校验的功能
const FormCreat = (Comp) => {
    return class extends React.Component {
        constructor(props) {
            super(props)
            // 表单配置项
            // field: options
            this.options = {}
            // 表单值和错误信息
            // field: value
            // fieldMessage: message
            this.state = {}
        }

        // 全部校验
        validateFields = cb => {
            const results = Object.keys(this.options).map(field => ( this.validateField(field) ))
            const result = results.every(r => r)
            cb(result, this.state)
        }

        // 单项校验
        validateField = (field) => {
            const {rules} = this.options[field]
            // result表示是否校验成功
            const result = !rules.some(r => {
                // 必填项校验
                if(r.required) {
                    if(!this.state[field]) {
                        // 设置错误信息
                        this.setState({[field+'Message'] : r.message})
                        // 校验失败
                        return true
                    }
                }
                // 校验成功
                return false
            })

            // 校验成功时清除错误信息
            if(result) {
                this.setState({[field+'Message']: ''})
            }
            
            return result
        }

        handleChange = (e) => {
            const {name, value} = e.target
            // 更改表单值并进行校验
            this.setState({[name]: value}, () => {
                this.validateField(name)
            })
        }

        // 高阶组件工厂函数:返回高阶组件
        getFieldDec = (field, option) => {
            this.options[field] = option

            return InputComp => (
                // 监听输入变化
                // 显示错误信息
                // 要改变传入组件的属性要克隆
                <div>
                    {React.cloneElement(InputComp, {
                        name: field,
                        value: this.state[field],
                        onChange: this.handleChange
                    })}
                    {/* 错误信息 */}
                    {this.state[field+'Message'] &&
                        <p style={{color: 'red'}}>{this.state[field+'Message']}</p>
                    }
                </div>
            )
        }

        render() {
            // 返回原组件并扩展功能
            return (<Comp
                {...this.props}
                getFieldDec = {this.getFieldDec}
                validateFields = {this.validateFields}
            ></Comp>)
        }
    }
}

@FormCreat
class MyForm extends React.Component {
    onLogin = () => {
        this.props.validateFields((isValid, data) => {
            if(isValid) {
                alert('校验成功')
            }else {
                alert('校验失败')
            }
        })
    }

    render() {
        return (
            <div>
                {this.props.getFieldDec("username", {
                    rules: [{required: true, message: "请输入用户名"}]
                })(<Input type="text"></Input>)}
                {this.props.getFieldDec("password", {
                    rules: [{required: true, message: "请输入密码"}]
                })(<Input type="password"></Input>)}
                <Button onClick={this.onLogin}>登录</Button>
            </div>
        )
    }
}

export default MyForm
