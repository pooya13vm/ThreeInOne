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
  const [getInfo, setInfo] = useState('');
  const [editingTaskTitle, setEditingTaskTitle] = useState('');
  const [editingImportance, setEditingImportance] = useState('');
  const [editingInfo, setEditingInfo] = useState('');
  const [editingDeadline, setEditingDeadline] = useState('');
  const [reloader, setReloader] = useState(false);
  const [sortList, setSortList] = useState([]);

  // storage handler ///

  const checkStorage = async () => {
    try {
      const getST = await AsyncStorage.getItem('@myTodo');
      const parsST = JSON.parse(getST);
      if (parsST.length == 0) {
        setTodoList([]);
      } else {
        setTodoList(parsST);
        console.log(parsST);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const saveToStorage = async TodoList => {
    try {
      const stringifiedTodo = await JSON.stringify(TodoList);
      await AsyncStorage.setItem('@myTodo', stringifiedTodo);
    } catch (error) {
      console.log(error);
    }
  };

  const saveTask = (selectedTime, props) => {
    let now = new Date();
    console.log(selectedTime);

    let task = {
      _id: uuid.v4(),
      content: getTask,
      importance: getImportance,
      saveTimeStr: dateStringMaker(now, true),
      saveTimeSec: now.getTime(),
      deadlineStr: dateStringMaker(selectedTime, true),
      deadlineSec: selectedTime.getTime(),
      info: getInfo,
      hasDoneStatus: false,
    };
    console.log(task);
    let todoList = [task, ...getTodoList];
    setTodoList(todoList);
    saveToStorage(todoList);
    setTask('');
    setImportance('');
    props.navigation.navigate('Home');
  };

  const setEditingTask = task => {
    setEditingTaskTitle(task.content);
    setEditingImportance(task.importance);
    setEditingInfo(task.info);
    setEditingDeadline(task.deadline);
  };
  const updateListAfterEdit = props => {
    let item = props.route.params.task;
    let id = item._id;
    let doneStatus = item.hasDoneStatus;
    let STStr = item.saveTimeStr;
    let STSec = item.saveTimeSec;
    let DLStr = editingDeadline
      ? dateStringMaker(editingDeadline, true)
      : item.deadlineStr;
    let DLSec = editingDeadline ? editingDeadline.getTime() : item.deadlineSec;
    const task = {
      _id: id,
      content: editingTaskTitle,
      importance: editingImportance,
      saveTimeStr: STStr,
      saveTimeSec: STSec,
      deadlineStr: DLStr,
      deadlineSec: DLSec,
      info: editingInfo,
      hasDoneStatus: doneStatus,
    };
    const index = getTodoList.findIndex(item => item._id == id);
    const todoList = [...getTodoList];
    todoList[index] = task;
    setTodoList(todoList);
    saveToStorage(todoList);
    saveToStorage(todoList);
    props.navigation.navigate('Home');
  };

  const sortManager = sort => {
    switch (sort) {
      case value:
        break;

      default:
        break;
    }
    console.log(sort);
  };
  return (
    <TodoContext.Provider
      value={{
        getTodoList,
        getTask,
        setTask,
        checkStorage,
        setImportance,
        setDeadline,
        getDeadline,
        saveTask,
        setInfo,
        setTodoList,
        setEditingTask,
        editingTaskTitle,
        setEditingTaskTitle,
        editingImportance,
        setEditingImportance,
        editingInfo,
        setEditingInfo,
        editingDeadline,
        setEditingDeadline,
        updateListAfterEdit,
        reloader,
        setReloader,
        sortManager,
      }}>
      {children}
    </TodoContext.Provider>
  );
};
