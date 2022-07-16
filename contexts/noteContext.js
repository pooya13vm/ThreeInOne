import React from 'react';
import {createContext, useState} from 'react';
import uuid from 'react-native-uuid';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const NoteContext = createContext({});

export const NoteProvider = ({navigation, children}) => {
  const [notes, setNotes] = useState([]);
  const [getTitle, setTitle] = useState('');
  const [getContent, setContent] = useState('');
  const [EditingTitleValue, setEditingTitleValue] = useState('');
  const [EditingContentValue, setEditingContentValue] = useState('');
  const [EditingCategoryValue, setEditingCategoryValue] = useState('');
  const [getCategory, setCategory] = useState('');
  const [filteredList, setFilteredList] = useState([]);
  const [categoryList, setCategoryList] = useState([
    {label: 'All notes', value: 'all'},
    {label: 'Poem', value: 'poem'},
    {label: 'Article', value: 'article'},
  ]);

  /// storage handler ///

  const checkStorage = async () => {
    const getST = await AsyncStorage.getItem('@myNote');
    const parsST = JSON.parse(getST);
    if (parsST.length == 0) {
      setNotes([]);
      setFilteredList([]);
    } else {
      setNotes(parsST);
      setFilteredList(parsST);
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
    const note = {
      _id: uuid.v4(),
      title: getTitle,
      content: getContent,
      category: getCategory,
    };

    let noteList = [note, ...notes];
    setNotes(noteList);
    setFilteredList(noteList);
    saveToStorage(noteList);
    setTitle('');
    setContent('');
    navigation.navigate('Home');
    console.log(notes);
  };

  //  Editing note  //

  const findEditNote = id => {
    targetNote = notes.filter(item => item._id == id);
    setEditingTitleValue(targetNote[0].title);
    setEditingContentValue(targetNote[0].content);
    setEditingCategoryValue(targetNote[0].category);
  };

  const updateListAfterEdit = props => {
    let id = props.route.params.id;
    const note = {
      _id: id,
      title: EditingTitleValue,
      content: EditingContentValue,
      category: EditingCategoryValue,
    };
    const index = notes.findIndex(item => item._id == id);
    const noteList = [...notes];
    noteList[index] = note;
    setNotes(noteList);
    setFilteredList(noteList);
    saveToStorage(noteList);
    props.navigation.navigate('Home');
  };

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

  return (
    <NoteContext.Provider
      value={{
        notes,
        setNotes,
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
      }}>
      {children}
    </NoteContext.Provider>
  );
};
