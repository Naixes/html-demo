import React, {Component} from 'react';
import {View, Text, Image, StyleSheet, FlatList, Button, Alert, ScrollView} from 'react-native';
import {calc} from '../util/index';
import { Actions } from 'react-native-router-flux';

export default class List extends Component{
  constructor(...args){
    super(...args);

    this.state={
      accounts: []
    };
  }

  // 计算总收入支出
  totalIncome() {
    return this.state.accounts.filter(account => account.income).reduce((ini, cur) => ini + Number(cur.amount), 0).toFixed(2)
  }
  totalOutcome() {
    return this.state.accounts.filter(account => !account.income).reduce((ini, cur) => ini + Number(cur.amount), 0).toFixed(2)
  }

  async getList() {
    // 这里不应该用localhost，localhost是模拟器的本地服务
    let res = await fetch('http://192.168.31.34:8080/list')
    let data = await res.json()
    this.setState({
      accounts: data
    })
  }

  // 引用类型时需要进行深度判断，这里简化了
  shouldComponentUpdate(nextProps, nextState) {
    return JSON.stringify(this.state.accounts) !== JSON.stringify(nextState.accounts)
  }

  // 会产生重复请求的问题，需要在shouldComponentUpdate中进行判断
  async componentDidMount() {
    await this.getList()
  }

  async componentDidUpdate() {
    await this.getList()
  }

  showAddModal(){
    Actions.push('addModal', {})
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
            <Text style={styles.bigTxt}>{this.totalIncome()}</Text>
          </View>
          <View style={{flex: 2}}>
            <Text style={styles.smallTxt}>支出</Text>
            <Text style={styles.bigTxt}>{this.totalOutcome()}</Text>
          </View>
        </View>
        <ScrollView>
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
        </ScrollView>
        <View style={{position: 'absolute', bottom: 0, left: 0, width: '100%'}}>
          <Button title="记账" color="#fada63" onPress={this.showAddModal.bind(this)} />
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
