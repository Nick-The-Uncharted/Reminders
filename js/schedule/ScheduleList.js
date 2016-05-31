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
  Animated,
  Dimensions,
  PanResponder,
  LayoutAnimation
} from 'react-native';
import {StandardScheduleColor, ScheduleCard} from './ScheduleCard'

import type {Schedule} from 'ScheduleCard'
var AnimatedScheduleCard = Animated.createAnimatedComponent(ScheduleCard)
var scheduleData: Schedule[] = [
    {title: "asdhjashfkasjfhka", tintColor: StandardScheduleColor.blue, scheduleItems: []},
    {title: "杂项",  tintColor: StandardScheduleColor.yellow, scheduleItems: [{name: "上课", completed: true}, {name: "中饭", completed: true}, {name: "午觉", completed: false}]},
    {title: "南大",  tintColor: StandardScheduleColor.green, scheduleItems: []},
    {title: "寒假",  tintColor: StandardScheduleColor.red, scheduleItems: []},
    {title: "买票", tintColor: StandardScheduleColor.purple, scheduleItems: []},
    {title: "驾校", tintColor: StandardScheduleColor.orange, scheduleItems: []}
]
var headerHeight = 8 + 30 + 16

export class ScheduleList extends Component {
    state: {
        scrollTop: any,
        selectedIndex: ?number
    };
    stopAtTop: boolean;
    _panResponder: any;
    itemHeaderHeight: number;

    constructor(props: any) {
        super(props)
        this.state = {scrollTop: new Animated.Value(headerHeight), selectedIndex: undefined, listing: true}
        this.stopAtTop = false
        this.itemHeaderHeight = 75
    }

    componentWillMount() {
        this._panResponder = PanResponder.create({
             // Ask to be the responder:
            //  onStartShouldSetPanResponder: (evt, gestureState) => gestureState.dx != 0 || gestureState.dy != 0,
             onMoveShouldSetPanResponder: (evt, gestureState) => true,

             onPanResponderGrant: (evt, gestureState) => {
               // The guesture has started. Show visual feedback so the user knows
               // what is happening!

               // gestureState.{x,y}0 will be set to zero now
             },
             onPanResponderMove: (evt, gestureState) => {
                 // The most recent move distance is gestureState.move{X,Y}

                 // The accumulated gesture distance since becoming responder is
                 // gestureState.d{x,y}
                 this.state.scrollTop.setValue(this.getContentOffSet(gestureState.dy))
             },
             onPanResponderTerminationRequest: (evt, gestureState) => true,
             onPanResponderRelease: (evt, gestureState) => {
               // The user has released all touches while this view is the
               // responder. This typically means a gesture has succeeded
               LayoutAnimation.configureNext(LayoutAnimation.create(600, LayoutAnimation.Types.easeInEaseOut, LayoutAnimation.Properties.Opacity))

               if (this.getContentOffSet(gestureState.dy) <= (headerHeight - 20) /2 ) {
                   this.stopAtTop = true
                   this.state.scrollTop.setValue(0)
               } else {
                   this.stopAtTop = false
                   this.state.scrollTop.setValue(headerHeight)
               }

             },
             onPanResponderTerminate: (evt, gestureState) => {
               // Another component has become the responder, so this gesture
               // should be cancelled
             },
             onShouldBlockNativeResponder: (evt, gestureState) => {
               // Returns whether this component should block native components from becoming the JS
               // responder. Returns true by default. Is currently only supported on android.
               return true;
             },
           });
       }

       getContentOffSet(dy: number) {
           if (this.stopAtTop) {
               return dy
           } else {
               return dy + headerHeight
           }
       }

       getBottomPosition(index: number) {

           if (this.state.selectedIndex == null || index === this.state.selectedIndex) {
               return
           }

           if (index > this.state.selectedIndex) {
               --index
           }

           index = scheduleData.length - 1 - index

           let windowHeight = Dimensions.get('window').height
           let bottomestCardHeight = 8
           let bottomCardHeight = 5

           return windowHeight - bottomestCardHeight - 20 - bottomCardHeight * (index - 1)
       }

       renderCards() {
           let windowHeight = Dimensions.get('window').height
           return scheduleData.map((schedule, index) => {
               var initHeight = this.itemHeaderHeight
               return (
                   <AnimatedScheduleCard key={index} style={[
                         {
                           height: windowHeight * 0.9,
                           position: 'absolute',
                           top: this.state.scrollTop.interpolate({
                               inputRange: [-index * initHeight * 4  , 0                 , headerHeight                     , headerHeight + 100],
                               outputRange: [0                       , index * initHeight, headerHeight + index * initHeight, headerHeight + index * initHeight + 10 * (index + 1)],
                               extrapolateLeft: 'clamp'
                            }),
                           width: Dimensions.get('window').width
                         },
                         !this.state.listing && {top: this.state.selectedIndex === index ? 0 : this.getBottomPosition(index)}
                       ]}
                    schedule={schedule}
                    onSelect={() => {
                        LayoutAnimation.easeInEaseOut()
                        if (!this.state.listing && index === this.state.selectedIndex) {
                            // dismiss
                            this.setState({listing: true})
                            this.setState({selectedIndex: undefined})
                        } else if (this.state.listing) {
                            this.setState({listing: false})
                            this.setState({selectedIndex: index})
                        }
                    }}
                    listing={this.state.listing}
                    onUpdateHeaderHeight={(itemHeaderHeight)=>{
                        console.log(itemHeaderHeight);
                        this.itemHeaderHeight = Math.max(itemHeaderHeight, this.itemHeaderHeight)
                    }}
                    />
                )
            })
       }

       render() {
           return (
               <View style={styles.scrollView} {...this._panResponder.panHandlers} pointerEvent= {'none'}
               >
                   {this.renderCards()}
               </View>
           )
       }
}

var styles = StyleSheet.create({
    scrollView: {
        position: 'absolute',
        top: 20,
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height
    }
})
