import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import {useSelector} from 'react-redux';

import { HeaderButtons, Item } from 'react-navigation-header-buttons'

import HeaderBtn from '../components/HeaderBtn';
import MealList from '../components/MealList';
import DefaultText from '../components/DefaultText';
import {} from '../data/dummyData';//MEALS was removed and managed with useSelector

const FavoritesScreen = props => {
    //state is passed auto by redux and contains the present state
    const favMeals = useSelector((state) => state.mealsRed.favoriteMeals); //we don't want to use the filteredMeals here
    if(favMeals.length === 0 || !favMeals){
        return (
            <View style= {styles.content}>
                <DefaultText>You Have No Favorite Meals For Now.</DefaultText>
            </View>
        );
    }
    return (
       <MealList displayedMeals={favMeals} nav={props.navigation}/>
    );
};

//passing a function instead of an obj if there is dynamic/changing data.
//rem: you can also set the navOptions config in the screen's navigator file

FavoritesScreen.navigationOptions = (navDataProps) => {

    return ({
        headerTitle: 'Favorite Meals',
        headerLeft: () => (
            //you can put this HeaderButton in a different file for multiple use
            <HeaderButtons HeaderButtonComponent={HeaderBtn}>
                <Item
                    title='Menu'
                    iconName='ios-menu'
                    onPress={() => {
                        navDataProps.navigation.toggleDrawer();
                    }}
                />
            </HeaderButtons>
        ),
    });

};

const styles = StyleSheet.create({
   content:{
       flex: 1,
       justifyContent: 'center',
       alignItems: 'center',
   },
});

export default FavoritesScreen;