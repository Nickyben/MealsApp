import {Platform } from 'react-native';

//for android
let primary = '#ff6f00'; 
let accent = '#ccc';
let switchColor = primary
let switchColorWhite = 'white';
let switchAccent = accent;
let switchWhiteAccent = '#d5d5d5';


//for ios
if(Platform.OS === 'ios'){
    switchColor = 'white'
    switchColorWhite= primary;
    switchAccent = '#d5d5d5'
    switchWhiteAccent = accent;
}




export default {
    //primary: '#8c144a',
    // accent: '#ff6f00'
    accent: '#8c4a14',
    primary: '#ff6f00',
    switchPrimary: switchColor,
    switchWhite : switchColorWhite,
    switchAccent: switchAccent,
    switchWhiteAccent: switchWhiteAccent,
};