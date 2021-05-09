import React, { useState, useEffect, useCallback } from 'react';
import {useDispatch} from 'react-redux';
import { View, Text, Switch, StyleSheet, Platform } from 'react-native';

import { HeaderButtons, Item } from 'react-navigation-header-buttons'

import HeaderBtn from '../components/HeaderBtn';
import Colors from '../constants/Colors';
import {setFilters} from '../store/actions/mealsAction'

const FilterSwitch = props => {
    return (
        <View style={styles.filterContainer}>
            <Text style={styles.switchLabel}>{props.label}</Text>
            <Switch
                value={props.switchState}
                onValueChange={props.onToggle}
                trackColor={{ true: Colors.primary, }}
                thumbColor={Platform.OS === 'android' ? Colors.primary : ''}

            />

        </View>
    );
};



const FiltersScreen = props => {
    const { navigation } = props;

    const [isGlutenFree, setIsGlutenFree] = useState(false);
    const [isLactoseFree, setIsLactoseFree] = useState(false);
    const [isVegan, setIsVegan] = useState(false);
    const [isVegetarian, setIsVegetarian] = useState(false);

    const dispatch = useDispatch();

    const saveFilters = useCallback(() => {
        const appliedFilters = {
            wantGlutenFree: isGlutenFree,
            wantLactoseFree: isLactoseFree,
            wantVegan: isVegan,
            wantVegetarian: isVegetarian,
        };
       // console.log(appliedFilters);
        dispatch(setFilters(appliedFilters));
    }, [isGlutenFree, isLactoseFree, isVegan, isVegetarian, dispatch]);

    useEffect(() => {
        navigation.setParams({
            savedFilters: saveFilters,
        })
    }, [saveFilters,]);

    return (
        <View style={styles.screen}>
            <Text style={styles.title}>Available Filters / Restrictions</Text>
            <FilterSwitch
                label='Gluten-free'
                onToggle={newVal => setIsGlutenFree(newVal)}
                switchState={isGlutenFree}
            />
            <FilterSwitch
                label='Lactose-free'
                onToggle={newVal => setIsLactoseFree(newVal)}
                switchState={isLactoseFree}
            />
            <FilterSwitch
                label='Vegan'
                onToggle={newVal => setIsVegan(newVal)}
                switchState={isVegan}
            />
            <FilterSwitch
                label='Vegetarian'
                onToggle={newVal => setIsVegetarian(newVal)}
                switchState={isVegetarian}
            />
        </View>
    );
};



FiltersScreen.navigationOptions = (navDataProps) => {

    return ({
        headerTitle: 'Filtered',
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
        headerRight: () => (
            //you can put this HeaderButton in a different file for multiple use
            <HeaderButtons HeaderButtonComponent={HeaderBtn}>
                <Item
                    title='Save'
                    iconName='ios-save'
                    onPress={() => {
                        const itemsFunc = navDataProps.navigation.getParam('savedFilters');
                       itemsFunc();
                    }}
                />
            </HeaderButtons>
        ),
    });

};


const styles = StyleSheet.create({
    screen: {
        flex: 1,
        //justifyContent: 'center',
        alignItems: 'center'
    },

    filterContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '80%',
        marginVertical: 10,
    },
    title: {
        fontFamily: 'OpenSansBold',
        fontSize: 22,
        margin: 20,
        textAlign: 'center'
    },
    switchLabel: {
        fontSize: 18,
        fontFamily: 'OpenSansRegular'
    }
});

export default FiltersScreen;