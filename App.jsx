import React from 'react';
import {View} from 'react-native';
import {Text} from '@rneui/base';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
// import HomeScreen from './screens/HomeScreen';

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Text>hi my name is ... poo</Text>
    </View>
    // <NoteProvider>
    //   <NavigationContainer>
    //     <Stack.Navigator
    //       screenOptions={{
    //         headerShown: false,
    //       }}>
    //       {/* <Stack.Screen name="Home" component={HomeScreen} /> */}
    //       {/* <Stack.Screen name="ADD" component={AddScreen} /> */}
    //     </Stack.Navigator>
    //   </NavigationContainer>
    // </NoteProvider>
  );
};
export default App;

// import {NavigationContainer} from '@react-navigation/native';
// import {createStackNavigator} from '@react-navigation/stack';
// import AddScreen from './screens/AddScreen';
// import HomeScreen from './screens/HomeScreen';
// import {NoteProvider} from './App/contexts/noteContext';

// const Stack = createStackNavigator();
