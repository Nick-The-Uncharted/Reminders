// @flow

import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  TouchableOpacity,
} from 'react-native';

export class CheckButton extends Component {
    props: {
        onPress?: () => void,
        color?: string,
        outterRadius?: number,
        innerRadius?: number
    };

    onPress() {

    }

    render() {
        let color = this.props.color || 'black'
        let outterRadius = this.props.outterRadius || 11
        let innerRadius = this.props.innerRadius || (outterRadius - 3)
        return (
            <TouchableOpacity onPress={this.onPress}>
                <View style={[styles.outterCircle, {width: outterRadius * 2, height: outterRadius * 2, backgroundColor: 'transparent', borderColor: color, borderRadius: outterRadius}]}>
                    <View style={[styles.innerCircle, {width: innerRadius * 2, height: innerRadius * 2,backgroundColor: color, borderRadius: innerRadius}]}>
                    </View>
                </View>
            </TouchableOpacity>
        )
    }
}

const styles = StyleSheet.create({
    outterCircle: {
        width: 20,
        height: 20,
        borderRadius: 10,
        borderWidth: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    innerCircle: {
        width: 10,
        height: 10,
        borderRadius: 5
    }
})
