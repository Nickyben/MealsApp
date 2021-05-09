import React, { useEffect, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { View, Text, StyleSheet, Button, Image, ScrollView, Alert } from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons'

import { } from '../data/dummyData';// MEALS was removed and managed with useSelector
import HeaderBtn from '../components/HeaderBtn';
import DefaultText from '../components/DefaultText'
import Colors from '../constants/Colors';
import { toggleFavorite } from '../store/actions/mealsAction';//toggleFavorite is an action creator that takes an arg and returns action obj 

const TextListItem = props => {
    return (
        <View style={styles.listItem}>
            <Text style={styles.listItemText}>{props.children}</Text>
        </View>
    );
};

const MealDetailScreen = props => {
    const mealId = props.navigation.getParam('mealId');
    const mealsAvailable = useSelector((state) => state.mealsRed.meals); //we don't want to use the filteredMeals here
    const isFavMeal = useSelector(state =>
        state.mealsRed.favoriteMeals.some(meal => meal.id === mealId)
    );

    //isn't it better to get the meal obj directly from params?
    const selectedMeal = mealsAvailable.find(meal => meal.id === mealId);

    const dispatch = useDispatch();//returns redux store's dispatch function.

    const toggleFavHandler = useCallback(() => {//used probably to avoid infinite loop
        dispatch(toggleFavorite(mealId)); //dispatches the action with the arg
    }, [dispatch, mealId]);//the dependencies won't change

    useEffect(() => {
        props.navigation.setParams({
            toggleFav: toggleFavHandler
        });
    }, [toggleFavHandler]);

    useEffect(() => {
        props.navigation.setParams({
            isFav: isFavMeal
        });
    }, [isFavMeal]);

    const durColor =
        selectedMeal.duration >= 60
            ? 'red'
            : selectedMeal.duration < 31
                ? 'green'
                : 'orange'; const complexColor =
                    selectedMeal.complexity === 'challenging'
                        ? 'orange'
                        : selectedMeal.complexity === 'hard'
                            ? 'red'
                            : 'green';
    const affordColor =
        selectedMeal.affordability === 'affordable'
            ? 'green'
            : selectedMeal.affordability === 'luxurious'
                ? 'red'
                : 'orange';



    return (

        <ScrollView>
            <Image source={selectedMeal.imageUri} style={styles.img} />

            <View style={styles.details}>
                {/*you can style/color the duration, complexity, affordability
                 according to their values ie using if statements...eg if duration> 30 mins color with red ,etc*/}
                <DefaultText style={{ color: durColor }}>{selectedMeal.duration}mins</DefaultText>
                <DefaultText style={{ color: complexColor }}>{selectedMeal.complexity.toUpperCase()}</DefaultText>
                <DefaultText style={{ color: affordColor }}>{selectedMeal.affordability.toUpperCase()}</DefaultText>
            </View>

            <Text style={styles.title}>Ingredients</Text>
            {selectedMeal.ingredients.map(
                (ingredient) => <TextListItem key={ingredient}>{ingredient}</TextListItem>
            )}

            <Text style={styles.title}>Steps</Text>
            {selectedMeal.steps.map(
                (step) => <TextListItem key={step}>{step + '\n'}</TextListItem>
            )}

        </ScrollView>
    );
};


MealDetailScreen.navigationOptions = (navData) => {
    //const mealId = navData.navigation.getParam('mealId');

    // const selectedMeal = MEALS.find(meal => meal.id === mealId);//useSelector cannot be used here

    const toggleFav = navData.navigation.getParam('toggleFav');
    const mealTitle = navData.navigation.getParam('mealTitle');
    const isFav = navData.navigation.getParam('isFav');
    const favIcon = isFav? 'ios-star': 'ios-star-outline'
    return {
        headerTitle: mealTitle,
        headerRight: () => (
            <HeaderButtons HeaderButtonComponent={HeaderBtn}>
                <Item
                    title='Favorite'
                    iconName={favIcon}  
                    onPress={
                        toggleFav
                        // () => {
                        //     Alert.alert('Marked as Favorite', 'Meal has been added to your Favorites',
                        //         [<Button>Okay</Button>]);
                        // }
                    }
                />
            </HeaderButtons>
        )
    };
};

const styles = StyleSheet.create({
    title: {
        fontFamily: 'OpenSansBold',
        fontSize: 20,
        textAlign: 'center',
    },

    img: {
        width: '100%',//set this w.r.t device dimensions
        height: 200,
    },

    details: {
        flexDirection: 'row',
        padding: 15,
        justifyContent: 'space-around',
    },

    listItem: {
        marginVertical: 10,
        marginHorizontal: 20,
        borderColor: '#bbb',
        borderWidth: 2,
        padding: 10,
        borderRadius: 10,

    },

    listItemText: {
        fontFamily: 'OpenSansBold',
    },
});

export default MealDetailScreen;