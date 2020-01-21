// navigation/Navigation.tsx

import {createAppContainer } from 'react-navigation'
import {createStackNavigator} from 'react-navigation-stack'

import SearchComponent from "../components/SearchComponent";

const SearchStackNavigator = createStackNavigator({
    Search: {
        screen: SearchComponent,
        navigationOptions: {
            title: 'Rechercher'
        }

    }
})

export default createAppContainer(SearchStackNavigator)