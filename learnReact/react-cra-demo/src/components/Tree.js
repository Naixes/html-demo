import React from 'react';

class TreeNode extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            // 标志是否展开
            open: false
        }
    }

    // 标志是否有子元素,有则返回长度
    get isFolder() {
        return this.props.model.children && this.props.model.children.length
    } 

    open = () => {
        if(this.isFolder) {
            this.setState({
                open: !this.state.open
            })
        }
    }

    render() {
        return (
            <ul>
                {/* 根节点 */}
                <li>
                    <p onClick={this.open}>
                        <span>{this.props.model.title}</span>
                        {this.isFolder && 
                        <span>{this.state.open ? '-' : '+'}</span>
                        }
                    </p>
                    {this.isFolder && 
                    <div style={{display: this.state.open ? 'block' : 'none'}}>
                        {this.props.model.children.map(child => (
                            <TreeNode model={child} key={child.title}></TreeNode>
                        ))
                        }
                    </div>
                    }
                </li>
            </ul>
        )
    }
}

class Tree extends React.Component {
    treeData = {
      title: "Web全栈架构师",
      children: [
        { title: "Java架构师" },
        {
          title: "JS高级",
          children: [
            { title: "ES6" },
            { title: "动效" }
          ]
        },
        {
          title: "Web全栈",
          children: [
            {
              title: "Vue训练营",
              expand: true,
              children: [
                { title: "组件化" },
                { title: "源码" },
                { title: "docker部署" }
              ]
            },
            {
              title: "React",
              children: [
                { title: "JSX" },
                { title: "虚拟DOM" }
              ]
            },
            { title: "Node" }
          ]
        }
      ]
    };
  render() {
    return (
      <div>
          <TreeNode model={this.treeData}></TreeNode>
      </div>
    )
  }
}

export default Tree