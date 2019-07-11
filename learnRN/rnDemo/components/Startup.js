import React, { Component } from 'react'
import { View, Text, Image, StyleSheet } from 'react-native'
import { Actions } from 'react-native-router-flux';

import {calc} from '../util/index'

export default class Startup extends Component {
    constructor(...args) {
        super(...args)
    }

    // 跳转到list
    componentDidMount() {
        setTimeout(function() {
            Actions.push('list', {})
        }, 2000)
    }
    render() {
        return (
            <View style={styles.bg}>
                <View style={{marginTop: calc(280), flexDirection: 'row', justifyContent: 'center'}}>
                    <Image source={require("../assets/logo.png")} style={{width: calc(101), height: calc(140)}}></Image>
                </View>
                <View style={{marginTop: calc(33)}}>
                    <Text style={{fontSize: calc(63), color: '#333', textAlign: 'center'}}>鲨鱼记账</Text>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    bg: {
        height: '100%',
        backgroundColor: '#fada63'
    }
})