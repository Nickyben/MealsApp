import React from 'react';
import { View, FlatList, StyleSheet, useState } from 'react-native';
import MealItem from './MealItem';
import { useSelector } from 'react-redux';

const MealList = (props) => {
    const favMeals = useSelector(state => state.mealsRed.favoriteMeals);
   
    const renderMealItem = (itemData) => {
        const isFavMeal = favMeals.some(meal => meal.id === itemData.item.id);
        return (
            <MealItem
                title={itemData.item.title}
                duration={itemData.item.duration}
                complexity={itemData.item.complexity}
                affordability={itemData.item.affordability}
                image={itemData.item.imageUri}
                onSelectMeal={() => {
                    props.nav.navigate({
                        routeName: 'MealDetail',
                        params: {
                            //check if it's better to just pass the object itself (meal itself)
                            //instead of it's id
                            mealId: itemData.item.id,
                            mealTitle: itemData.item.title,
                            isFav: isFavMeal,//this was added to avoid the flickering of the button on the screen
                        }
                    });
                }}

            />
        );
    }


    return (
        <View style={styles.list}>
            <FlatList
                showsVerticalScrollIndicator={false}
                keyExtractor={(item, index) => item.id}
                data={props.displayedMeals}
                renderItem={renderMealItem}
                style={{ width: '100%' }}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    list: {
        paddingHorizontal: 20,
        paddingTop: 20,
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    }

});

export default MealList;