import { StatusBar } from 'expo-status-bar';
import React, {useState} from 'react';
import { StyleSheet, Text, View } from 'react-native';
import {enableScreens} from 'react-native-screens';

import { createStore, combineReducers } from 'redux';
import {Provider} from 'react-redux';

import * as Font from 'expo-font';
import { AppLoading } from 'expo'


import MainNav_Drawer from './navigation/MealsNavigator';
import mealsReducer from './store/reducers/meals';


enableScreens(); //useScreens(); is for lower versions of expo and react-native

//used to combine multiple reducers 
const rootReducer = combineReducers({
  mealsRed: mealsReducer
});

//creates the store with the rootReducer as arg
const reduxStore = createStore(rootReducer);



const fetchFonts = () => {
  return Font.loadAsync({
    'OpenSansRegular': require('./assets/fonts/OpenSans-Regular.ttf'),
    'OpenSansBold': require('./assets/fonts/OpenSans-Bold.ttf')
  })
};

export default function App() {
  const [fontIsLoaded, setFontIsLoaded] = useState(false);

  if (!fontIsLoaded) {
    return (
      <AppLoading
        startAsync={fetchFonts} 
        onFinish ={() => setFontIsLoaded(true)}

        />);

  }

  return (
    <Provider store={reduxStore}>
      <MainNav_Drawer /> 
    </Provider>
    
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#555',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
