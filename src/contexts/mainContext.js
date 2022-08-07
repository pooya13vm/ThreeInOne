import React, {createContext, useState} from 'react';
import {colorThemeHandler} from '../utility/colors';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const MainContext = createContext({});
export const MainProvider = ({children}) => {
  const [lightMode, setLightMode] = useState(true);
  const [tabType, setTabType] = useState('SNT');
  const AllColors = colorThemeHandler(lightMode);

  let AppTheme = {lightMode, tabType};

  const checkStorage = async () => {
    try {
      const getST = await AsyncStorage.getItem('@myTheme');
      const parsST = JSON.parse(getST);
      console.log(parsST);
      if (parsST.tabType) {
        console.log('async is working ...');
        setLightMode(parsST.lightMode);
        setTabType(parsST.tabType);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const saveToStorage = async input => {
    try {
      if (typeof input == 'boolean') {
        AppTheme = {lightMode: input, tabType: tabType};
      } else {
        AppTheme = {lightMode, tabType: input};
      }
      console.log(AppTheme);
      const stringified = await JSON.stringify(AppTheme);
      await AsyncStorage.setItem('@myTheme', stringified);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <MainContext.Provider
      value={{
        lightMode,
        setLightMode,
        tabType,
        setTabType,
        AllColors,
        checkStorage,
        saveToStorage,
      }}>
      {children}
    </MainContext.Provider>
  );
};
