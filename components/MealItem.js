import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    ImageBackground,
    Platform,
    TouchableOpacity,
    TouchableNativeFeedback,
} from 'react-native';

import DefaultText from '../components/DefaultText';

const MealItem = props => {
    let TouchableCmp = TouchableOpacity;

    if (Platform.OS === 'android' && Platform.Version >= 21) {
        TouchableCmp = TouchableNativeFeedback;
    }
    const durColor =
        props.duration >= 60
            ? 'red'
            : props.duration < 31
                ? 'green'
                : 'orange';

    const complexColor =
        props.complexity === 'challenging'
            ? 'orange'
            : props.complexity === 'hard'
                ? 'red'
                : 'green';
    const affordColor =
        props.affordability === 'affordable'
            ? 'green'
            : props.affordability === 'luxurious'
                ? 'red'
                : 'orange';


    return (

        <View style={styles.mealItem}>
            <TouchableCmp
                onPress={props.onSelectMeal}
            >
                <View>
                    <View style={{ ...styles.mealRow, ...styles.mealHeader }} >
                        <ImageBackground
                            source={props.image}
                            style={styles.bgImage}
                        >

                            <View style={styles.titleContainer}>
                                <Text style={styles.title} numberOfLines={1}>{props.title} </Text>
                            </View>
                        </ImageBackground>
                    </View>
                    <View style={{ ...styles.mealRow, ...styles.mealDetail }}>

                        <DefaultText style={{ color: durColor }}>{props.duration}mins</DefaultText>
                        <DefaultText style={{ color: complexColor }}>{props.complexity.toUpperCase()}</DefaultText>
                        <DefaultText style={{ color: affordColor }}>{props.affordability.toUpperCase()}</DefaultText>
                    </View>
                </View>
            </TouchableCmp>
        </View>
    );
};

const styles = StyleSheet.create({
    mealItem: {
        height: 200,//!!! please set this with respect to the device dimensions
        width: '100%',
        backgroundColor: '#f5f5c5',
        borderRadius: 10,
        overflow: 'hidden',
        marginVertical: 10,
    },

    bgImage: {
        width: '100%',
        height: '100%',
        justifyContent: 'flex-end'
    },



    mealRow: {
        flexDirection: 'row',
    },

    mealHeader: {
        height: '85%'
    },

    mealDetail: {
        height: '15%',
        paddingHorizontal: 10,
        justifyContent: 'space-between',
        backgroundColor: '#ddd',
        alignItems: 'center',

    },

    titleContainer: {
        backgroundColor: '#0005',
        paddingVertical: 5,
        paddingHorizontal: 12,
    },

    title: {
        fontFamily: 'OpenSansBold',
        fontSize: 20,
        color: 'white',
        textAlign: 'center',
    }
});

export default MealItem;