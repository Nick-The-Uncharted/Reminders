import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Navigator,
  TouchableOpacity,
  TextInput,
  Image,
  ScrollView,
  Animated
} from 'react-native';
import {SearchBar} from './common/SearchBar'
import {StandardStyle} from './common/StandardStyle'
import {CommonNavigationBarRouteMapper} from './common/CommonNavigationBarRouteMapper'
import {categoryColor} from './common/StandardColor'
import {ScheduleList} from './schedule/ScheduleList'

export default class ReminderNavigator extends Component {
    constructor(props) {
        super(props)
        this.renderScene = this.renderScene.bind(this)
    }

    render() {
        return (
            <Navigator
                configureScene = {
                    (route) => {
                        return Navigator.SceneConfigs.FloatFromBottom
                    }
                }
                initialRoute = {{}}
                renderScene = {this.renderScene}
            />
        )
    }

    renderScene(route: any) {
        return (
            <View style={styles.container}>
                <View style={styles.searchBarWrapper}>
                    <SearchBar style={styles.searchBar} textInputStyle={styles.searchBar}/>
                    <TouchableOpacity>
                        <Image source={require('../image/Add.png')} style={[StandardStyle.navigationBarItemSize, styles.searchBarButton]}/>
                    </TouchableOpacity>
                </View>
                <ScheduleList />
            </View>
        )
    }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'stretch',
    backgroundColor: categoryColor.backgroundColor
  },
  searchBarWrapper: {
      flexDirection: 'row',
      justifyContent: 'space-around',
      alignItems: 'center',
      backgroundColor: categoryColor.backgroundColor,
      paddingBottom: 16,
      paddingTop: 28,
  },
  searchBar: {
      flex: 1,
      marginHorizontal: 20
  },
  searchBarButton: {
      marginRight: 20
  },
});
