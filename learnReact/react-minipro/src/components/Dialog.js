import React, {Component} from 'react';
import './Dialog.css';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';

class Dialog extends Component{
  constructor(...args){
    super(...args);

    this.state={
      show: false
    };
    this.callback=null;
  }

  show(fn){
    this.callback=fn;
    this.setState({
      show: true
    });
  }
  hide(){
    this.setState({
      show: false
    });
  }

  btnClick(index){
    this.callback && this.callback(index);
    this.hide();
  }

  render(){
    return (
      <div style={{display: this.state.show ? 'block' : 'none'}}>
        <div className="my-dialog-shadow"></div>
        <div className="panel panel-default my-dialog">
          <div className="panel-heading">
            <div className="panel-title">
              {this.props.title}
            </div>
          </div>
          <div className="panel-body">
            {this.props.msg}
          </div>
          <div className="panel-footer">
            <div className="btn-group">
              {this.props.buttons.map((btn, i) => (
                <button key={i} type="button" className="btn btn-default btn-sm" onClick={this.btnClick.bind(this, i)}>{btn.title}</button>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Dialog;
