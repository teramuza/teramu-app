import React, { Component } from 'react';
import { createBottomTabNavigator, createStackNavigator,createSwitchNavigator, createAppContainer } from 'react-navigation';
import { Icon } from 'native-base';
import { Provider } from 'react-redux';

//store redux
import store from './src/publics/redux/store';

//splash
import Splash from './src/screens/Splash';

//auth
import Login from './src/screens/auth/Login';
import Register from './src/screens/auth/Register';

//contents
import Home from './src/screens/contents/Home';
import Favorite from './src/screens/contents/Favorite';
import Search from './src/screens/contents/Search';
import Profile from './src/screens/contents/Profile';
import Player from './src/screens/contents/Player';

// export default class App extends Component {
//   render() {
//     return <Player tracks={TRACKS} />
//   }
// }

// const tabNavigator = createBottomTabNavigator({

//   home : {

//   }

// })
// 
const AppSplash = createStackNavigator({
    splash : {
        screen : Splash,
    }
})

const AppAuth = createStackNavigator({
    login : {
        screen : Login,
    },
    register : {
        screen : Register,
    }
})

const AppTabNavigator = createBottomTabNavigator({
    home : {
        screen : Home,
        navigationOptions :{
            title : 'Beranda',
        }
    },
    favorite : {
        screen : Favorite,
        navigationOptions :{
            title : 'Favorit',
        }
    },
    search : {
        screen : Search,
        navigationOptions :{
            title : 'Cari',
        }
    },
    profile : {
        screen : Profile,
        navigationOptions :{
            title : 'Akun'
        }
    }
},
{
    defaultNavigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ focused, horizontal, tintColor }) => {
        const { routeName } = navigation.state;
        
        let iconType = 'MaterialIcons';
        let iconName;
        if (routeName === 'home') {
            iconType = `MaterialCommunityIcons`;
            iconName = `home${focused ? '' : '-outline' }`;
        } 
        else if (routeName === 'favorite') {
            iconType = `MaterialCommunityIcons`;
            iconName = `bookmark${focused ? '' : '-outline'}`;
        } 
        else if (routeName === 'search') {
            iconType = `${focused ? 'FontAwesome' : 'AntDesign'}`;
            iconName = 'search';
        } 
        else if (routeName === 'profile') {
            iconName = `person${focused ? '' : '-outline'}`;
        }

        // You can return any component that you like here!
        return <Icon type={iconType} name={iconName} size={24} color={tintColor} style={{color: '#b2b2b2'}}/>;
      },
    }),
    tabBarOptions: {
      activeTintColor: '#f0f0f0',
      inactiveTintColor: 'gray',
      style:{
        paddingTop: 3,
        backgroundColor: '#303030',
      }
    },
    navigationOptions : {
        header : null,
    }
}

)

const AppContents = createStackNavigator({
    navigator : AppTabNavigator,

    player : {
        screen : Player,
        navigationOption: {}
    }
})

const AppNavigator = createSwitchNavigator({
    splashScreen : AppSplash,
    contents : AppContents,
    auth : AppAuth,
})

const AppRoot = createAppContainer(AppNavigator);

export default class Root extends Component {
    render(){
        return(
            <Provider store={store}>
                <AppRoot />
            </Provider>
        )
    }
}