import React, {Component} from 'react';

export default function (str){
  class Hello extends Component{
    constructor(...args){
      super(...args);
    }

    render(){
      return (
        <div>
          {str}
        </div>
      );
    }
  }

  return Hello;
};
