import React from 'react';
import {createContext, useState} from 'react';
import uuid from 'react-native-uuid';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {dateStringMaker} from '../utility/dateHandler';

export const ShoppingContext = createContext({});

export const ShoppingProvider = ({children}) => {
  const [listOfLists, setListOfLists] = useState([]);

  const saveList = (name, place) => {
    let list = {
      _id: uuid.v4(),
      name: name,
      place: place,
      listArray: [],
    };
    let Lists = [list, ...listOfLists];
    setListOfLists(Lists);
  };
  return (
    <ShoppingContext.Provider value={{listOfLists, saveList, setListOfLists}}>
      {children}
    </ShoppingContext.Provider>
  );
};
