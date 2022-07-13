import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import HomeScreen from './screens/HomeScreen';
import AddScreen from './screens/AddScreen';
import EditScreen from './screens/EditScreen';
import {NoteProvider} from './contexts/noteContext';

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <NoteProvider>
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerShown: false,
          }}>
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="ADD" component={AddScreen} />
          <Stack.Screen name="EDIT" component={EditScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </NoteProvider>
  );
};
export default App;
