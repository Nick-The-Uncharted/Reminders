// @flow
import React from 'react'
import {StyleSheet,TextInput,Dimensions} from 'react-native'

type Prop = {
    navigator: any,
    textInputStyle: Object
}

export class SearchBar extends React.Component {
    constructor(props: any) {
        super(props)
    }

    focus() {
        this.textInput && this.textInput.focus()
    }

    render() {
        return (
            <TextInput
                style={[SearchBarStyles.color, SearchBarStyles.shape, this.props.textInputStyle]}
                ref = {(ref)=>{this.textInput = ref}}
                placeholderTextColor="white"
                placeholder="Search"
            />
        )
    }
}

var SearchBarStyles = StyleSheet.create({
    shape: {
        height: 30,
        fontSize: 14,
        textAlign: 'center',
        borderRadius: 5,
        flex: 1,
    },
    color: {
        color: 'white',
        backgroundColor: '#818181',
    }
})
