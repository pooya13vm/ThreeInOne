import React, {useMemo} from 'react';
import {createContext, useState} from 'react';
import uuid from 'react-native-uuid';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const ShoppingContext = createContext({});

export const ShoppingProvider = ({children}) => {
  const [listOfLists, setListOfLists] = useState([]);
  const [storeName, setStoreName] = useState('');
  const [storeList, setStoreList] = useState([
    {label: 'Walmart', value: 'walmart', id: 1},
    {label: 'Costco', value: 'costco', id: 2},
    {label: 'Amazon', value: 'amazon', id: 3},
  ]);

  /// storage handler ///

  const checkStorage = async () => {
    try {
      const getST = await AsyncStorage.getItem('@myShopping');
      const parsST = JSON.parse(getST);
      if (parsST.length == 0) {
        setListOfLists([]);
      } else {
        setListOfLists(parsST);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const saveToStorage = async ShoppingList => {
    try {
      const stringifiedShopping = await JSON.stringify(ShoppingList);
      await AsyncStorage.setItem('@myShopping', stringifiedShopping);
    } catch (error) {
      console.log(error);
    }
  };
  const saveList = (name, place) => {
    let list = {
      _id: uuid.v4(),
      name: name,
      place: place,
      listArray: [],
    };
    let Lists = [list, ...listOfLists];
    setListOfLists(Lists);
    saveToStorage(Lists);
  };
  const deleteList = id => {
    const copyList = [...listOfLists];
    const newList = copyList.filter(item => item._id != id);
    setListOfLists(newList);
    saveToStorage(newList);
  };

  /// store names ///
  const checkStoreStorage = async () => {
    try {
      const getST = await AsyncStorage.getItem('@shoppingStores');
      const parsST = JSON.parse(getST);
      if (parsST.length !== 0) setStoreList(parsST);
    } catch (error) {
      console.log(error);
    }
  };
  const saveStoresToStorage = async List => {
    try {
      const stringified = await JSON.stringify(List);
      await AsyncStorage.setItem('@shoppingStores', stringified);
    } catch (error) {
      console.log(error);
    }
  };
  const addToList = () => {
    const newCategory = {label: storeName, value: storeName, id: uuid.v4()};
    const newList = [...storeList, newCategory];
    setStoreList(newList);
    saveStoresToStorage(newList);
    setStoreName('');
  };
  const deleteFromList = id => {
    const filteredList = storeList.filter(item => item.id != id);
    setStoreList(filteredList);
    saveStoresToStorage(filteredList);
  };

  const ctx = useMemo(
    () => ({
      listOfLists,
      saveList,
      setListOfLists,
      checkStorage,
      saveToStorage,
      deleteList,
      storeName,
      setStoreName,
      storeList,
      checkStoreStorage,
      deleteFromList,
      addToList,
    }),
    [listOfLists, storeName, storeList],
  );
  return (
    <ShoppingContext.Provider value={ctx}>{children}</ShoppingContext.Provider>
  );
};
