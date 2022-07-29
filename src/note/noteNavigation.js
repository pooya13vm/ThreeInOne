import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import NoteHomeScreen from './screens/HomeScreen';
import AddScreen from './screens/AddScreen';
import EditScreen from './screens/EditScreen';
import NoteSettingScreen from '../setting/NoteSettingScreen';
import GeneralSettingScreen from '../setting/GeneralSettingScreen';
import {NoteProvider} from '../contexts/noteContext';

const Stack = createNativeStackNavigator();

function NoteNavigator(props) {
  return (
    <NoteProvider>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}>
        <Stack.Screen name="NoteHome" component={NoteHomeScreen} />
        <Stack.Screen name="ADD" component={AddScreen} />
        <Stack.Screen
          name="EDIT"
          component={EditScreen}
          options={{animation: 'slide_from_bottom', orientation: 'portrait_up'}}
        />
        <Stack.Screen
          name="NoteSettingScreen"
          component={NoteSettingScreen}
          initialParams={props}
        />
        <Stack.Screen
          name="GeneralSettingScreen"
          component={GeneralSettingScreen}
        />
      </Stack.Navigator>
    </NoteProvider>
  );
}
export default NoteNavigator;
