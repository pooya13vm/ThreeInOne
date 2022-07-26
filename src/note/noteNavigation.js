import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import NoteHomeScreen from './screens/HomeScreen';
import AddScreen from './screens/AddScreen';
import EditScreen from './screens/EditScreen';
import SettingScreen from './screens/SettingScreen';
import {NoteProvider} from '../contexts/noteContext';

const Stack = createNativeStackNavigator();

function NoteNavigator() {
  return (
    <NoteProvider>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}>
        <Stack.Screen name="Home" component={NoteHomeScreen} />
        <Stack.Screen name="ADD" component={AddScreen} />
        <Stack.Screen
          name="EDIT"
          component={EditScreen}
          options={{animation: 'slide_from_bottom', orientation: 'portrait_up'}}
        />
        <Stack.Screen
          name="SETTING"
          component={SettingScreen}
          screenOptions={{}}
        />
      </Stack.Navigator>
    </NoteProvider>
  );
}
export default NoteNavigator;
