import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    Button,
    FlatList,
    Platform
} from 'react-native';

import {useSelector} from 'react-redux';// another approach is importing and using the connect function

import { CATEGORIES,    } from '../data/dummyData';//removed MEALS in order to get it/ it's data through useSelector
import Colors from '../constants/Colors';
import MealItem from '../components/MealItem';
import MealList from '../components/MealList';
import DefaultText from '../components/DefaultText';


const CategoryMealsScreen = props => {
    //console.log(props);

    const catId = props.navigation.getParam('categoryId');

    const MealsAvailable = useSelector((state)=> state.mealsRed.filteredMeals);

    const categoryMeals = MealsAvailable.filter(//MEALS WAS REPLACED data gotten with useSelector

        (meal) => meal.categoryIds.indexOf(catId) >= 0
    );

    if (categoryMeals.length === 0 ){
        return (
            <View style={styles.content}>
                <DefaultText style={styles.contentText}>No meals to display, please check your filters</DefaultText>
            </View>
        );
    }

    return (
        <MealList displayedMeals={categoryMeals} nav={props.navigation}/>
    );
};


//in bigger apps
CategoryMealsScreen.navigationOptions = (navData) => {

    const catId = navData.navigation.getParam('categoryId');

    const selectedCategory = CATEGORIES.find(
        (catObj) => catObj.id === catId
    );

    //the obj that would have been assigned to the comp's property
    //if it was not used as a function
    return {
        headerTitle: selectedCategory.title,

    }
};

const styles = StyleSheet.create({
    content:{
        flex: 1,
        justifyContent: 'center',
        padding: 20,
        alignItems: 'center',
        backgroundColor: '#ffcccc'
    },
    contentText:{
        fontSize: 18,
        textAlign: 'center',
    },
});

export default CategoryMealsScreen;