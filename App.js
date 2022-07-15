import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import NoteHomeScreen from './note/screens/HomeScreen';
import ShoppingHomeScreen from './shopping/screens/HomeScreen';
import TodoHomeScreen from './todo/screens/HomeScreen';
import AddScreen from './note/screens/AddScreen';
import EditScreen from './note/screens/EditScreen';
import {NoteProvider} from './contexts/noteContext';
import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';
import {Icon} from '@rneui/base';
import {SafeAreaProvider, SafeAreaView} from 'react-native-safe-area-context';

const Tab = createMaterialBottomTabNavigator();

function NoteNavigator() {
  return (
    <NoteProvider>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}>
        <Stack.Screen name="Home" component={NoteHomeScreen} />
        <Stack.Screen name="ADD" component={AddScreen} />
        <Stack.Screen name="EDIT" component={EditScreen} />
      </Stack.Navigator>
    </NoteProvider>
  );
}

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <NoteProvider>
      <SafeAreaProvider>
        <NavigationContainer>
          <Tab.Navigator
            shifting
            activeColor="#f0f0f0"
            barStyle={{backgroundColor: 'tomato'}}>
            <Tab.Screen
              name="Note"
              component={NoteNavigator}
              options={{
                tabBarColor: 'green',
                tabBarIcon: color => <Icon name="text" type="entypo" />,
              }}
            />
            <Tab.Screen
              name="Todo"
              component={TodoHomeScreen}
              options={{
                tabBarColor: 'blue',
                tabBarIcon: color => <Icon name="list" type="entypo" />,
              }}
            />
            <Tab.Screen
              name="Shopping"
              component={ShoppingHomeScreen}
              options={{
                tabBarColor: 'red',
                tabBarIcon: color => (
                  <Icon name="shopping-cart" type="entypo" />
                ),
              }}
            />
          </Tab.Navigator>
        </NavigationContainer>
      </SafeAreaProvider>
    </NoteProvider>
  );
};
export default App;
{
}
// initialRouteName="Feed" // activeColor="#e91e63" // barStyle=
{
  /* {{backgroundColor: 'tomato'}}> */
}
