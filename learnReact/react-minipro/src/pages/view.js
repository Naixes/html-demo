import React, {Component} from 'react';
import Table from '../components/Table';
import Dialog from '../components/Dialog';
import {DEL_ITEM} from '../actions';
import {connect} from 'react-redux';
import data from '../data';

class View extends Component{
  constructor(...args){
    super(...args);
    this.state = {
        
    }
  }

  cb_delItem(ID){
    let del_dialog=this.refs.del_dialog;

    // index:按钮索引
    del_dialog.show(async index=>{
      // 是
      if(index === 0){
        await data.get(`del/${ID}`);
        this.props.delItem(ID);
      }
    });
  }

  render(){
    return (
      <div>
        <Dialog title="删除" msg="是否删除此数据" buttons={[
          {title: '是'},
          {title: '否'}
        ]} ref="del_dialog" />
        <Table del_callback={this.cb_delItem.bind(this)} />
      </div>
    );
  }
}

export default connect(function (state, props){
  return state;
}, {
  delItem(ID){
    return {
      type: DEL_ITEM,
      ID
    }
  }
})(View);
