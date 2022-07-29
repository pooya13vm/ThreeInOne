import React from 'react';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {MainProvider} from './src/contexts/mainContext';
import AppNavigation from './AppNavigation';

const App = () => {
  return (
    <SafeAreaProvider>
      <MainProvider>
        <AppNavigation />
      </MainProvider>
    </SafeAreaProvider>
  );
};
export default App;
