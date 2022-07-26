import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';
import ShoppingHomeScreen from './shopping/screens/HomeScreen';
import NoteNavigator from './note/noteNavigation';
import TodoNavigator from './todo/TodoNavigation';
import ShoppingNavigator from './shopping/shoppingNavigation';
// import Icon from 'react-native-vector-icons';
// import Entypo from 'react-native-vector-icons/Entypo';
import {Icon} from '@rneui/themed';
import {SafeAreaProvider} from 'react-native-safe-area-context';

const Tab = createMaterialBottomTabNavigator();

const App = () => {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <Tab.Navigator
          shifting
          activeColor="#f0f0f0"
          barStyle={{backgroundColor: 'tomato'}}>
          <Tab.Screen
            name="Shopping"
            component={ShoppingNavigator}
            options={{
              tabBarColor: 'red',
              tabBarIcon: color => (
                <Icon name="shopping-cart" type={'entypo'} />
              ),
            }}
          />
          <Tab.Screen
            name="To do"
            component={TodoNavigator}
            options={{
              tabBarColor: 'blue',
              tabBarIcon: color => <Icon name="list" type={'entypo'} />,
            }}
          />
          <Tab.Screen
            name="Note"
            component={NoteNavigator}
            options={{
              tabBarColor: 'green',
              tabBarIcon: color => <Icon name="text" type={'entypo'} />,
            }}
          />
        </Tab.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
};
export default App;
