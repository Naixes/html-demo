import React from 'react';
import {
  createPortal,
  unmountComponentAtNode,
  unstable_renderSubtreeIntoContainer
} from "react-dom";

export class Dialog2 extends React.Component {
    render() {
        return null
    }

    componentDidMount() {
        this.node = document.createElement('div')
        document.body.appendChild(this.node)
        this.createPortal()
    }

    createPortal = () => {
        unstable_renderSubtreeIntoContainer(
            this, // 当前组件
            <div className="dialog">{this.props.children}</div>, // jsx
            this.node // 传送到的dom
        )
    }

    // 清理node
    componentWillUnmount() {
        // 清理节点
        unmountComponentAtNode(this.node);
        document.body.removeChild(this.node)
    }
}

// 16.6版本以上
export default class Dialog extends React.Component {
    constructor(props) {
        super(props)

        this.node = document.createElement('div')
        document.body.appendChild(this.node)
    }

    render() {
        // 将参数1声明的jsx挂载到node上
        return createPortal(<div>{this.props.children}</div>, this.node)
    }

    // 清理node
    componentWillUnmount() {
        document.body.removeChild(this.node)
    }
}