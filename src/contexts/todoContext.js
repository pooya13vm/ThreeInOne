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
  const [showSnackbar, setShowSnackbar] = useState(false);

  // storage handler ///

  const checkStorage = async () => {
    try {
      const getST = await AsyncStorage.getItem('@myTodo');
      const parsST = JSON.parse(getST);
      if (parsST.length == 0) {
        setTodoList([]);
      } else {
        setTodoList(parsST);
        setSortList(parsST);
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

  /// add new item to list ///

  const saveTask = (selectedTime, props) => {
    let now = new Date();
    if (getTask === '') {
      setShowSnackbar(true);
      return;
    }
    let task = {
      _id: uuid.v4(),
      content: getTask,
      importance: getImportance,
      saveTimeStr: dateStringMaker(now, true),
      saveTimeSec: now.getTime(),
      deadlineStr: selectedTime ? dateStringMaker(selectedTime, true) : null,
      deadlineSec: selectedTime ? selectedTime.getTime() : null,
      info: getInfo,
      hasDoneStatus: false,
    };
    let todoList = [task, ...getTodoList];
    setTodoList(todoList);
    setSortList(todoList);
    saveToStorage(todoList);
    setTask('');
    setImportance('');
    props.navigation.navigate('Home');
  };

  /// edit Item ///

  const setEditingTask = task => {
    setEditingTaskTitle(task.content);
    setEditingImportance(task.importance);
    setEditingInfo(task.info);
    setEditingDeadline(task.deadline);
  };
  const updateListAfterEdit = props => {
    if (editingTaskTitle === '') {
      setShowSnackbar(true);
      return;
    }
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
    setSortList(todoList);
    saveToStorage(todoList);
    props.navigation.navigate('Home');
  };

  /// sort Handler ///

  const sortImportance = () => {
    const copy = [...getTodoList];
    const sortArray = ['vital', 'obligatory', 'medium', 'inessential', ''];
    const newList = [];
    for (let i = 0; i < copy.length; i++) {
      copy.map(item => {
        if (item.importance == sortArray[i]) {
          newList.push(item);
        }
      });
    }
    setSortList(newList);
  };
  const sortLess = () => {
    const copy = [...getTodoList];
    const filtered = copy.filter(item => item.deadlineSec != null);
    const newList = filtered.sort(function (x, y) {
      return x.deadlineSec - y.deadlineSec;
    });
    setSortList(newList);
  };
  const sortMost = () => {
    const copy = [...getTodoList];
    const filtered = copy.filter(item => item.deadlineSec != null);
    const newList = filtered.sort(function (x, y) {
      return x.deadlineSec + y.deadlineSec;
    });
    setSortList(newList);
  };
  const sortNoDeadline = () => {
    const copy = [...getTodoList];
    const newList = copy.filter(item => item.deadlineSec == null);
    setSortList(newList);
  };
  const sortNotDone = () => {
    const copy = [...getTodoList];
    const newList = copy.filter(item => item.hasDoneStatus != true);
    setSortList(newList);
  };
  const sortDefLater = () => {
    const copy = [...getTodoList];
    const newList = copy.reverse();
    setSortList(newList);
  };

  const sortManager = sort => {
    switch (sort) {
      case 'importance':
        sortImportance();
        break;
      case 'less':
        sortLess();
        break;
      case 'most':
        sortMost();
        break;
      case 'no':
        sortNoDeadline();
        break;
      case 'notDone':
        sortNotDone();
        break;
      case 'defEarlier':
        setSortList(getTodoList);
        break;
      case 'defLater':
        sortDefLater();
        break;
      default:
        setSortList(getTodoList);
        break;
    }
  };

  const ctx = React.useMemo(
    () => ({
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
      sortList,
      saveToStorage,
      setSortList,
      setShowSnackbar,
      showSnackbar,
    }),
    [
      getTodoList,
      getTask,
      getDeadline,
      getInfo,
      getImportance,
      editingTaskTitle,
      editingImportance,
      editingInfo,
      editingDeadline,
      reloader,
      sortList,
      showSnackbar,
    ],
  );
  return <TodoContext.Provider value={ctx}>{children}</TodoContext.Provider>;
};
