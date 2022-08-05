import React, {createContext, useState} from 'react';
import uuid from 'react-native-uuid';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {dateStringMaker} from '../utility/dateHandler';

export const NoteContext = createContext({});

export const NoteProvider = ({children}) => {
  const [notes, setNotes] = useState([]);
  const [getTitle, setTitle] = useState('');
  const [getContent, setContent] = useState('');
  const [EditingTitleValue, setEditingTitleValue] = useState('');
  const [EditingContentValue, setEditingContentValue] = useState('');
  const [EditingCategoryValue, setEditingCategoryValue] = useState('');
  const [getCategory, setCategory] = useState('');
  const [filteredList, setFilteredList] = useState([]);
  const [categoryList, setCategoryList] = useState([
    {label: 'All notes', value: 'all', id: 1},
    {label: 'Poem', value: 'poem', id: 2},
    {label: 'Article', value: 'article', id: 3},
  ]);

  /// storage handler ///

  const checkStorage = async () => {
    try {
      const getST = await AsyncStorage.getItem('@myNote');
      const parsST = JSON.parse(getST);
      if (parsST.length == 0) {
        setNotes([]);
        setFilteredList([]);
      } else {
        setNotes(parsST);
        setFilteredList(parsST);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const saveToStorage = async noteList => {
    try {
      const stringifiedNote = await JSON.stringify(noteList);
      await AsyncStorage.setItem('@myNote', stringifiedNote);
    } catch (error) {
      console.log(error);
    }
  };

  // Add Note //

  const saveNote = async ({navigation}) => {
    let date = new Date();
    let title = getTitle ? getTitle : 'No Title';
    let now = dateStringMaker(date);
    const note = {
      _id: uuid.v4(),
      title: title,
      content: getContent,
      category: getCategory,
      date: now,
    };
    let noteList = [note, ...notes];
    setNotes(noteList);
    setFilteredList(noteList);
    saveToStorage(noteList);
    setTitle('');
    setContent('');
    setCategory('');
    navigation.navigate('NoteHome');
  };

  //  Editing note  //

  const findEditNote = id => {
    targetNote = notes.filter(item => item._id == id);
    setEditingTitleValue(targetNote[0].title);
    setEditingContentValue(targetNote[0].content);
    setEditingCategoryValue(targetNote[0].category);
  };

  const updateListAfterEdit = props => {
    let date = new Date();
    let now = dateStringMaker(date);
    let id = props.route.params.id;
    const note = {
      _id: id,
      title: EditingTitleValue,
      content: EditingContentValue,
      category: EditingCategoryValue,
      date: now,
    };
    const index = notes.findIndex(item => item._id == id);
    const noteList = [...notes];
    noteList[index] = note;
    setNotes(noteList);
    setFilteredList(noteList);
    saveToStorage(noteList);
    props.navigation.navigate('NoteHome');
  };

  /// deleting note

  const deleteHandler = id => {
    const filteredList = notes.filter(item => item._id != id);
    setNotes(filteredList);
    setFilteredList(filteredList);
    saveToStorage(filteredList);
  };

  // filtering categories

  const filteredCategory = cat => {
    if (cat == 'all' || !cat) {
      setFilteredList(notes);
    } else {
      const notesCopy = [...notes];
      const filteredList = notesCopy.filter(item => item.category == cat);
      setFilteredList(filteredList);
    }
  };

  // / / / / / / / / / / / / / /category setting part // / / / / / / / / / /
  // / / / / / // / / // / / /  // / / / / / // / /  / / //  / // / / /  ///

  const checkStorageCategory = async () => {
    try {
      const getST = await AsyncStorage.getItem('@noteCategory');
      const parsST = JSON.parse(getST);
      if (parsST.length !== 0) setCategoryList(parsST);
    } catch (error) {
      console.log(error);
    }
  };
  const saveToStorageCategory = async List => {
    try {
      const stringifiedCat = await JSON.stringify(List);
      await AsyncStorage.setItem('@noteCategory', stringifiedCat);
    } catch (error) {
      console.log(error);
    }
  };
  const addToCategory = () => {
    const newCategory = {label: getCategory, value: getCategory, id: uuid.v4()};
    const newList = [...categoryList, newCategory];
    setCategoryList(newList);
    saveToStorageCategory(newList);
    setCategory('');
  };
  const deleteCategory = id => {
    const filteredList = categoryList.filter(item => item.id != id);
    setCategoryList(filteredList);
    saveToStorageCategory(filteredList);
  };

  const ctx = React.useMemo(
    () => ({
      getTitle,
      setTitle,
      getContent,
      setContent,
      saveNote,
      checkStorage,
      findEditNote,
      updateListAfterEdit,
      EditingTitleValue,
      setEditingTitleValue,
      EditingContentValue,
      setEditingContentValue,
      EditingCategoryValue,
      setEditingCategoryValue,
      deleteHandler,
      categoryList,
      getCategory,
      setCategory,
      filteredCategory,
      filteredList,
      checkStorageCategory,
      addToCategory,
      deleteCategory,
    }),
    [
      getTitle,
      getContent,
      EditingTitleValue,
      EditingContentValue,
      EditingCategoryValue,
      categoryList,
      getCategory,
      filteredList,
    ],
  );

  return <NoteContext.Provider value={ctx}>{children}</NoteContext.Provider>;
};
