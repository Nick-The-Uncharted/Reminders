// @flow

import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Navigator,
  TouchableOpacity,
  TextInput,
  Image,
  Platform,
  Dimensions,
  ListView
} from 'react-native';
import {scheduleColor} from '../common/StandardColor'
import {scheduleFont} from '../common/StandardFont'
import {CheckButton} from '../common/CheckButton'

type ScheduleColor = "#CC73E1" | "#63DA38" | "#1BADF8" | "#EABB00" | "#A2845E" | "#FF2968" | "#FDA62C"

export var StandardScheduleColor = {
    purple: "#CC73E1",
    green: "#63DA38",
    blue: "#1BADF8",
    yellow: "#EABB00",
    grown: "#A2845E",
    red: "#FF2968",
    orange: "#FDA62C"
}

type ScheduleItem = {
    name: string,
    completed: ?boolean
}

export type Schedule = {
    title: string,
    tintColor: ScheduleColor,
    scheduleItems: ScheduleItem[]
}

type Prop = {
    schedule: Schedule;
    onSelect: {(): void};
    style: Object,
    listing: boolean,
    onUpdateHeaderHeight: (height: number) => void
}

type TitleProp = {
    schedule: Schedule;
    onSelect: {(): void};
    listing: boolean;
    onUpdateHeaderHeight: (height: number) => void
}

class ScheduleTitle extends Component {
    props: TitleProp;


    render() {
        return (
            <TouchableOpacity style={styles.header} onPress={this.props.onSelect}>
                <View onLayout={(evt) => {
                    this.props.onUpdateHeaderHeight(evt.nativeEvent.layout.height)
                }}>
                    <View style={styles.titleContainer}>
                        <Text style={[styles.title, {color: this.props.schedule.tintColor}]}>
                            {this.props.schedule.title}
                        </Text>
                        <Text style={[styles.title, {color: this.props.schedule.tintColor}]}>
                            {this.props.schedule.scheduleItems.length}
                        </Text>
                    </View>
                    <TouchableOpacity>
                        <Text style={{alignSelf: 'flex-end'}}>{this.props.listing ? '' : 'Edit'}</Text>
                    </TouchableOpacity>
                </View>
            </TouchableOpacity>
        )
    }
}

class ScheduleItemList extends Component {
    state: {
        dataSource: any
    };
    constructor(props) {
        super(props)
        this.state = {dataSource: new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2}).cloneWithRows(this.props.scheduleItems)}
    }

    renderRow(scheduleItem) {
        return (
            <View style={styles.itemContainer}>
                <CheckButton/>
                <TextInput style={styles.item} value={scheduleItem.name}></TextInput>
            </View>
        )
    }

    render() {

        return (
            <ListView
                dataSource={this.state.dataSource}
                renderRow={this.renderRow}
                enableEmptySections = {true}
                renderSeparator={(sectionID, rowID) => <View key={`${sectionID}-${rowID}`} style={styles.separator} />}
                />
        )
    }
}

export class ScheduleCard extends Component {
    static headerHeight: number;
    props: Prop;

    render() {
        return (
            <View style={[styles.container, this.props.style]}>
                <ScheduleTitle {...this.props}/>
                <ScheduleItemList scheduleItems = {this.props.schedule.scheduleItems} />
            </View>
        )
    }
}

let windowHeight = Dimensions.get('window').height

ScheduleCard.headerHeight = windowHeight / 7

var styles = StyleSheet.create({
    container: {
        backgroundColor: scheduleColor.backgroundColor,
        flex: 1,
        borderRadius: 10,
        shadowColor: 'black',
        shadowOffset: {width: 0, height: 0},
        shadowOpacity: 0.6,
        shadowRadius: 2,
    },
    header: {
        height: ScheduleCard.headerHeight,
        justifyContent: 'space-between',
        paddingHorizontal: 18,
        paddingTop: 20,
    },
    title: {
        backgroundColor: 'transparent',
        fontSize: scheduleFont.titleFont,
        fontWeight: "500",
    },
    titleContainer: {
        flexDirection: "row",
        justifyContent: "space-between"
    },
    separator: {
        height: 1,
        backgroundColor: '#CCCCCC',
    },
    itemContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        height: 40
    },
    item: {
        fontSize: scheduleFont.itemFont,
        flex: 1,
        paddingLeft: 10,
        alignSelf: 'stretch'
    }
})
