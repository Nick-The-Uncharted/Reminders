import {Text,TouchableHighlight,StyleSheet} from 'react-native'
import React from 'react'

export var CommonNavigationBarRouteMapper = {
  LeftButton: function( route, navigator, index, navState ){
      if(index > 0) {
          var prevName = navState && navState.routeStack && navState.routeStack[index - 1] && navState.routeStack[index - 1].title
          console.log(prevName);
        return (
          <TouchableHighlight
            underlayColor="transparent"
            onPress={() => { if (index > 0) { navigator.pop() } }}>
            <Text style={ styles.leftNavButtonText }>{prevName && prevName.length < 10 ? prevName : "Back"}</Text>
          </TouchableHighlight>)
      }
  },
  Title: function( route, navigator, index, navState ){
    return(
      <Text>{ route.title }</Text>
    )
  },
  RightButton: function( route, navigator, index, navState ){
      if (route.onPress) return (
        <TouchableHighlight
           onPress={ () => route.onPress() }>
           <Text style={ styles.rightNavButtonText }>
                { route.rightText || 'Right Button' }
           </Text>
         </TouchableHighlight>
     )
  }
}

var styles = StyleSheet.create({

})
