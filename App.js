import { StatusBar } from 'expo-status-bar';
import React, {useState} from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Timer from './components/Timer';
// import BonsaiTree from './components/BonsaiTree';
import Bonsai from './components/Bonsai';
import { NavigationContainer } from '@react-navigation/native';

import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

const Tab = createMaterialTopTabNavigator();

export default function App() {
  const [counter,setCounter] = useState(0);

  const incrementCounter = () => {
      setCounter(counter + 1)
  };

  return (
    <NavigationContainer>
      <Tab.Navigator
        tabBarPosition = 'bottom' >
        <Tab.Screen name="Timer"
       children={()=><Timer counterProp={counter} setCounterProp={setCounter}/>}
    />
        <Tab.Screen name="Bonsai" children={()=><Bonsai counterProp={counter} setCounterProp={setCounter}/>} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
