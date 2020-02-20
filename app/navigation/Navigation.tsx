// navigation/Navigation.tsx

import {createAppContainer} from 'react-navigation'
import {createStackNavigator} from 'react-navigation-stack'
import {createBottomTabNavigator} from 'react-navigation-tabs'

import SearchComponent from "../components/SearchComponent";
import FilmDetail from "../components/FilmDetail";
import Favorites from "../components/Favorites";
import {StyleSheet, Image} from "react-native";
import React from 'react'

const SearchStackNavigator = createStackNavigator({
    Search: {
        screen: SearchComponent,
        navigationOptions: {
            title: 'Rechercher'
        }

    },
    FilmDetail: {
        screen: FilmDetail,
        navigationOptions: {
            title: 'Détail'
        }
    }
})

const MoviesTabNavigator = createBottomTabNavigator({
    Search: {
        screen: SearchStackNavigator,
        navigationOptions: {
            tabBarIcon: () => {
                return <Image source={require('../images/ic_search.png')} style={styles.icon}/>
            }
        }
    },
    Favorites: {
        screen: Favorites,
        navigationOptions: {
            tabBarIcon: () => {
                return <Image source={require('../images/ic_favorite.png')} style={styles.icon}/>
            }
        }
    }

})

const styles = StyleSheet.create({
  icon: {
      width: 30,
      height: 30
  }
})

export default createAppContainer(MoviesTabNavigator)