import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import ShoppingHomeScreen from './screens/HomeScreen';
import ShopList from './screens/ShopList';
import {ShoppingProvider} from '../contexts/shoppingContext';

const Stack = createNativeStackNavigator();

function ShoppingNavigator() {
  return (
    <ShoppingProvider>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}>
        <Stack.Screen name="Home" component={ShoppingHomeScreen} />
        <Stack.Screen name="SHOPPLIST" component={ShopList} />
      </Stack.Navigator>
    </ShoppingProvider>
  );
}
export default ShoppingNavigator;