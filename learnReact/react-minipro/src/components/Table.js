import React, {Component} from 'react';
import {connect} from 'react-redux';

class Table extends Component{
  constructor(...args){
    super(...args);
  }

  fnDel(ID){
    this.props.del_callback && this.props.del_callback(ID);
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
          <tr>
            <td>xxx衣服</td>
            <td>￥39.6</td>
            <td>537</td>
            <td>
              <a href="#" className="glyphicon glyphicon-trash">删除</a>
            </td>
          </tr>
        </tbody>
      </table>
    );
  }
}

export default connect(function (state, props){
  return state;
}, {

})(Table);
