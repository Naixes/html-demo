import React, { Component } from 'react'
import { View, Text, Image, StyleSheet, Picker, TextInput, Button, Alert } from 'react-native'
import { Actions } from 'react-native-router-flux';

import {calc} from '../util/index'

export default class AddModal extends Component {
    constructor(...args) {
      super(...args)
      this.state = {
        income: 0,
        title: '',
        amount: 0
      }
    }

    async submit() {
        let url = `http://192.168.31.34:8080/add/${this.state.title}/${this.state.amount}/${this.state.income}`
        try {
            let res = await fetch(url)
            let {ok} = await res.json()
            
            if(ok) {
                Actions.pop()
            }else {
                Alert.alert('错误', '请确认网络通畅后重试', {text: '确定'})
            }
        } catch (error) {
            Alert.alert('错误', '请确认网络通畅后重试', {text: '确定'})
        }
    }

    cancel() {
        Actions.pop()
    }

    render() {
        return (
            <View>
                <View>
                    <Picker selectedValue={this.state.income} onValueChange={(value) => {this.setState({income: value})}}>
                        <Picker.Item label="支出" value={0}></Picker.Item>
                        <Picker.Item label="收入" value={1}></Picker.Item>
                    </Picker>
                    <TextInput onChangeText={(text) => {this.setState({title: text})}} placeholder="请输入记账项目"></TextInput>
                    <TextInput onChangeText={(text) => {this.setState({amount: text})}} placeholder="请输入金额" keyboardType="number-pad"></TextInput>
                    <View style={styles.btnGrp}>
                        {/* 直接写button时flex不起作用 */}
                        <View style={{flex: 1}}>
                            <Button title="提交" color="#fada63" onPress={this.submit.bind(this)}></Button>
                        </View>
                        <View style={{flex: 1}}>
                            <Button title="取消" color="#ccc" onPress={this.cancel.bind(this)}></Button>
                        </View>
                    </View>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    btnGrp: { flexDirection: 'row', width: '100%' }
})