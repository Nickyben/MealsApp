//const { createStackNavigator } = require("react-navigation-stack");
import React from 'react';
import {
    Platform, Text
} from 'react-native';

import { createStackNavigator } from 'react-navigation-stack';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { createDrawerNavigator } from 'react-navigation-drawer'
import { createAppContainer } from 'react-navigation';
import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs'

import { Ionicons } from '@expo/vector-icons';

import CategoriesScreen from '../screens/CategoriesScreen';
import CategoryMealsScreen from '../screens/CategoryMealsScreen';
import MealDetailScreen from '../screens/MealDetailScreen';
import FavoriteScreen from '../screens/FavoritesScreen';
import FiltersScreen from '../screens/FiltersScreen';

import Colors from '../constants/Colors';
import FavoritesScreen from '../screens/FavoritesScreen';


const defaultStackNavOptions = {
    headerTitle: 'Meals App', //overwritten if already  defined in first arg of navigator or in screen's file
    headerStyle: {
        backgroundColor: Colors.switchPrimary,
    },
    headerTitleStyle:{
        fontFamily: 'OpenSansBold',
    },
    headerBackTitleStyle:{
        fontFamily: 'OpenSansRegular',
    },
    headerTintColor: Colors.switchWhite,

};

/*const generalNavOptions = {
    headerStyle: {
        backgroundColor: Platform.OS === 'android' ? Colors.primary : 'white',
    },

    headerTintColor: Platform.OS === 'android' ? 'white' : Colors.primary,
}*/

const MealsStackNavigator = createStackNavigator(
    {
        // you can also use string ...'Categories' as key

        Categories: {
            screen: CategoriesScreen,
            navigationOptions: {
                //...generalNavOptions, is an alternative to using defaultNavigatorOptions
            },
        },
        //alternative way especially if other options/configs are needed
        CategoryMeals: {
            screen: CategoryMealsScreen,
            navigationOptions: {
                //...generalNavOptions, is an alternative to using defaultNavigatorOptions
            },
        },

        MealDetail: {
            screen: MealDetailScreen,
            navigationOptions: {
                //...generalNavOptions, is an alternative to using defaultNavigatorOptions
            },
        },

    },

    {
        //navigationOptions:{}  NB: this stackNavigator itself, 
        //can have its own navigationOptions just like normal screens, but here in 2nd arg

        //mode: 'modal',
        //initialRouteKey: ...
        //initialRouteName: ...
        //headerMode: "float",
        defaultNavigationOptions: defaultStackNavOptions,
    }
);

const FavStackNavigator = createStackNavigator(
    {   //rem: you can also set the navOptions inside the screen's file
        Favorites: {
            screen: FavoriteScreen,
            navigationOptions: {

            }
        },

        MealDetail: {
            screen: MealDetailScreen,
            navigationOptions: {

            },
        },
    },

    {
        defaultNavigationOptions: defaultStackNavOptions,
    }
);


const tabScreenConfig = {
    Meals: {
        screen: MealsStackNavigator,
        navigationOptions: {//you can also choose to put this in the 2nd arg of that navigator

            //tabInfo is auto passed
            //from the tabBar 's options info
            tabBarIcon: (tabInfo) => {
                return (
                    <Ionicons
                        name='ios-restaurant'
                        size={25}
                        //color={tabInfo.tintColor}
                        color={tabInfo.tintColor}
                    />
                );
            },

           // tabBarColor: '#dceeee', //only 'shifting: true' supports this..ie color when shift happens
            //tabBarLabel: (<Text style={{fontFamily:'OpenSansBold'}}>aMeals</Text>), //to overwrite the default text and font

        },
    },

    Favorites: {

        tabBarLabel: 'Favorites!', //overwrites the default label i.e this obj 's key
        screen: FavStackNavigator,
        navigationOptions: {
            tabBarIcon: (tabInfo) => {
                return (
                    <Ionicons
                        name='ios-star'
                        size={25}
                        color={tabInfo.tintColor}
                    />
                );
            },

            //tabBarColor: '#eeeedd', //only 'shifting: true' supports this..ie color when shift happens
        }
    },
};

const Meals_Fav_TabsNavigator = Platform.OS === 'ios'
    ? createMaterialBottomTabNavigator(tabScreenConfig, {//FOR ANDROID
        // inactiveColor: '#aaa',
        // activeColor: '#ff6f00',
        // shifting: true,
        inactiveColor: '#ddd',
        activeColor: '#fff',
        barStyle: {
            backgroundColor: Colors.switchPrimary,
        }

    })
    : createBottomTabNavigator(tabScreenConfig,//FOR IOS

        {     //navOptions can also be set here w.r.t the drawer


            //almost like defaultNavigationOptions of the stack Navigator
            //probably can be overridden in the stackNav obj 's navOptions
            tabBarOptions: {
                labelStyle: {
                    fontFamily: 'OpenSansBold',
                },
                activeBackgroundColor: '#fff',
                activeTintColor: '#ff6f00',
                inactiveBackgroundColor: '#eeeeee',
                inactiveTintColor: '#777'
            }

        }
    );

const FilterStackNav = createStackNavigator(
    {
        Filters: {
            screen: FiltersScreen,
        }
    },

    {
        //navOptions can also be set here w.r.t the drawer
        defaultNavigationOptions: defaultStackNavOptions,
    }
);
const MainNav_Drawer = createDrawerNavigator(
    {
        MealsFavTab: {
            screen: Meals_Fav_TabsNavigator,
            navigationOptions: {//can also be set in the 2nd arg of this stack' s create func
                drawerLabel: 'Meals'
            },
        },

        FiltersStack: {//this stack is at tab level !!!!
            screen: FilterStackNav,
            navigationOptions: {//can also be set in the 2nd arg of this stack' s create func
                drawerLabel: 'Filters'
            },
        }
    },
    {
        drawerBackgroundColor: '#ededed',
        drawerPosition: 'right',
        drawerType: 'front',
        drawerLabel: 'Menu',
        contentOptions: {

            activeTintColor: 'white',
            activeBackgroundColor: Colors.primary,
            inactiveBackgroundColor: 'white',
            labelStyle: {
                //fontFamily: 'OpenSansBold',
                fontSize: 18,
                alignItems: 'center',
            },

        }
    }
);

export default createAppContainer(MainNav_Drawer);
