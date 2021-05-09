import React from 'react';
import {Text, StyleSheet} from 'react-native';


const DefaultText = props =>{
    return (<Text {...props} style={{ ...props.style, ...styles.text}}>{props.children}</Text>);
};

const styles = StyleSheet.create({
    text:{
      fontFamily: 'OpenSansBold', 
    },
});

export default DefaultText;