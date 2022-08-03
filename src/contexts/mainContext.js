import React, {createContext, useState} from 'react';

export const MainContext = createContext({});

export const MainProvider = ({children}) => {
  const [lightMode, setLightMode] = useState(true);
  const [tabType, setTabType] = useState('SNT');

  return (
    <MainContext.Provider
      value={{lightMode, setLightMode, tabType, setTabType}}>
      {children}
    </MainContext.Provider>
  );
};
