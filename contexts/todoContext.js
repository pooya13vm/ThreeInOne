import React from 'react';
import {createContext, useState} from 'react';
import uuid from 'react-native-uuid';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {dateStringMaker} from '../utility/dateHandler';

export const TodoContext = createContext({});

export const TodoProvider = ({children}) => {
  const [getTodoList, setTodoList] = useState([]);
  const [getTask, setTask] = useState('');
  const [getImportance, setImportance] = useState('');
  const [getDeadline, setDeadline] = useState('');

  /// storage handler ///

  // const checkStorage = async () => {
  //   try {
  //     const getST = await AsyncStorage.getItem('@myTodo');
  //     const parsST = JSON.parse(getST);
  //     if (parsST.length == 0) {
  //       setTodoList([]);
  //     } else {
  //       setTodoList(parsST);
  //     }
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  const saveToStorage = async TodoList => {
    try {
      const stringifiedTodo = await JSON.stringify(TodoList);
      await AsyncStorage.setItem('@myTodo', stringifiedTodo);
    } catch (error) {
      console.log(error);
    }
  };

  const saveTask = (selectedTime, props) => {
    let task = {
      _id: uuid.v4(),
      content: getTask,
      importance: getImportance,
      saveTime: new Date(),
      deadline: selectedTime,
    };
    console.log(task);
    let todoList = [task, ...getTodoList];
    setTodoList(todoList);
    setTask('');
    setImportance('');
    props.navigation.navigate('Home');
  };
  return (
    <TodoContext.Provider
      value={{
        getTodoList,
        getTask,
        setTask,
        // checkStorage,
        setImportance,
        setDeadline,
        getDeadline,
        saveTask,
      }}>
      {children}
    </TodoContext.Provider>
  );
};
