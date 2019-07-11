import React, {Component} from 'react';
import {View, Text, Image, StyleSheet, FlatList, Button} from 'react-native';
import {calc} from '../util/index';

export default class List extends Component{
  constructor(...args){
    super(...args);

    this.state={
      accounts: [
        {ID: 1, title: '通讯', amount: 100, income: 0},
        {ID: 2, title: '购物', amount: 58, income: 0},
        {ID: 3, title: '工资', amount: 8000, income: 1},
      ]
    };
  }

  fn(){
  }

  render(){
    return (
      <View style={{backgroundColor: '#FFF', height: '100%'}}>
        <View style={styles.header}>
          <Image source={require('../assets/title.png')} style={{width: calc(172), height: calc(87)}} />
        </View>
        <View style={{backgroundColor: '#fada63', height: calc(136), flexDirection: 'row'}}>
          <View style={{flex: 1}}>
            <Text style={styles.smallTxt}>2019年</Text>
            <Text style={styles.bigTxt}>1月</Text>
          </View>
          <View style={{flex: 2}}>
            <Text style={styles.smallTxt}>收入</Text>
            <Text style={styles.bigTxt}>0.00</Text>
          </View>
          <View style={{flex: 2}}>
            <Text style={styles.smallTxt}>支出</Text>
            <Text style={styles.bigTxt}>158.00</Text>
          </View>
        </View>
        <View>
          {/* 列表 */}
          <FlatList
            data={this.state.accounts}
            keyExtractor={data=>data.ID+''}
            renderItem={({item, index})=>(
              <View>
                <View style={{flexDirection: 'row', height: calc(109)}}>
                  <Text style={{flex: 1, lineHeight: calc(109)}}>{item.title}</Text>
                  <Text style={{width: calc(100), textAlign: 'right', lineHeight: calc(109)}}>{item.income?'+':'-'}{item.amount}</Text>
                </View>
                <View style={{height: 1, backgroundColor: '#e9e9e9'}} />
              </View>
            )}
          />
        </View>
        <View style={{position: 'absolute', bottom: 0, left: 0, width: '100%'}}>
          <Button title="记账" color="#fada63" onPress={this.fn.bind(this)} />
        </View>
      </View>
    );
  }
}

const styles=StyleSheet.create({
  header: {backgroundColor: '#fada63', height: calc(87), flexDirection: 'row', justifyContent: 'center'},
  smallTxt: {fontSize: calc(23), color: '#333'},
  bigTxt: {fontSize: calc(44), color: '#000'},
});
