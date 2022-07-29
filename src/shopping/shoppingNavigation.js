import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import ShoppingHomeScreen from './screens/HomeScreen';
import ShopList from './screens/ShopList';
import {ShoppingProvider} from '../contexts/shoppingContext';
import ShoppingSettingScreen from '../setting/ShoppingSettingScreen';

const Stack = createNativeStackNavigator();

function ShoppingNavigator() {
  return (
    <ShoppingProvider>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}>
        <Stack.Screen name="ShoppingHome" component={ShoppingHomeScreen} />
        <Stack.Screen name="SHOPPLIST" component={ShopList} />
        <Stack.Screen
          name="ShoppingSettingScreen"
          component={ShoppingSettingScreen}
        />
      </Stack.Navigator>
    </ShoppingProvider>
  );
}
export default ShoppingNavigator;
