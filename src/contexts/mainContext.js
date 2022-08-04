import React, {createContext, useState} from 'react';
import {colorThemeHandler} from '../utility/colors';

export const MainContext = createContext({});

export const MainProvider = ({children}) => {
  const [lightMode, setLightMode] = useState(true);
  const [tabType, setTabType] = useState('SNT');

  const AllColors = colorThemeHandler(lightMode);

  return (
    <MainContext.Provider
      value={{lightMode, setLightMode, tabType, setTabType, AllColors}}>
      {children}
    </MainContext.Provider>
  );
};
