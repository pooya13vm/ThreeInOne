import React from 'react';
import {createContext, useState} from 'react';
import uuid from 'react-native-uuid';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {dateStringMaker} from '../utility/dateHandler';

export const TodoContext = createContext({});

export const TodoProvider = ({children}) => {
  const {getTodoList, setTodoList} = useState([]);
  const {getTodo, setTodo} = useState('');
  return (
    <TodoContext.Provider value={{getTodoList, getTodo}}>
      {children}
    </TodoContext.Provider>
  );
};
