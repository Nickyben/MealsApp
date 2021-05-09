import React from 'react';
import {
    View,
    Text,
    Button,
    StyleSheet,
    FlatList,
    TouchableOpacity,
    Platform,
} from 'react-native';

import { HeaderButtons, Item } from 'react-navigation-header-buttons'



import { CATEGORIES } from '../data/dummyData';//an array
import Colors from '../constants/Colors';
import CategoryGridTile from '../components/CategoryGridTile';
import HeaderBtn from '../components/HeaderBtn';



const CategoriesScreen = props => {

    const renderGridItem = (itemData) => {
        return (
            <CategoryGridTile
                title={itemData.item.title}
                color={itemData.item.color}
                onSelect={() => {
                    props.navigation.navigate(
                        {
                            routeName: 'CategoryMeals',
                            params: {
                                categoryId: itemData.item.id,
                            },
                        }
                    );
                }}
            />
        );
    };

    return (
        <FlatList
            keyExtractor={(item, index) => item.id}
            data={CATEGORIES}
            renderItem={renderGridItem}
            numColumns={2}
        />

       /* //was replaced by <FlatList />
       <View style={styles.screen}>
            <Text>Categories Screen!</Text>
            <Button title='Go to Meals ' onPress={() => {
                props.navigation.navigate({
                    routeName: 'CategoryMeals'
                    // or just 'Category Meals' as first arg instead of obj
                });
                //a bit similar to props.navigation.push('Categories')....but .push()
                //can be used to navigate to same screen

                //props.navigation.replace('CategoryMeals')
                // can be used to replace this screen in the navigator/navigation

            }} />
        </View>
*/   );
};

//read about these options in the react navigation docs
CategoriesScreen.navigationOptions =(navDataProps)=> {



    return({
        headerTitle: 'Meal Categories',
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
    screen: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },


});

export default CategoriesScreen;