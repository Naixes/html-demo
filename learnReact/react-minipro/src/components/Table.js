import React, {Component} from 'react';
import {connect} from 'react-redux';

class Table extends Component{
  constructor(...args){
    super(...args)
    this.state = {

    }
  }

  delItem(ID){
    this.props.del_callback && this.props.del_callback(ID);
  }

  componentDidMount() {

  }

  render(){
    return (
      <table className="table">
        <thead>
          <tr>
            <th>名称</th>
            <th>价格</th>
            <th>库存</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {this.props.items.map(i => (
            <tr key={i.ID}>
              <td>{i.name}</td>
              <td>￥{i.price}</td>
              <td>{i.count}</td>
              <td>
                <a href="#" className="glyphicon glyphicon-trash" onClick={this.delItem.bind(this, i.ID)}>
                  删除
                </a>
              </td>
            </tr>
            ))
          }
        </tbody>
      </table>
    );
  }
}

export default connect(function (state, props){
  return state;
}, {

})(Table);
