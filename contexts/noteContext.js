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

  /// storage handler ///

  const checkStorage = async () => {
    const getST = await AsyncStorage.getItem('@myNote');
    const parsST = JSON.parse(getST);
    if (parsST.length == 0) {
      setNotes([]);
    } else {
      setNotes(parsST);
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
    };
    let noteList = [note, ...notes];
    setNotes(noteList);
    saveToStorage(noteList);
    setTitle('');
    setContent('');
    navigation.navigate('Home');
  };

  //  Editing note  //

  const findEditNote = id => {
    targetNote = notes.filter(item => item._id == id);
    setEditingTitleValue(targetNote[0].title);
    setEditingContentValue(targetNote[0].content);
  };

  const updateListAfterEdit = props => {
    let id = props.route.params.id;
    const note = {
      _id: id,
      title: EditingTitleValue,
      content: EditingContentValue,
    };
    const index = notes.findIndex(item => item._id == id);
    const noteList = [...notes];
    noteList[index] = note;
    setNotes(noteList);
    saveToStorage(noteList);
    props.navigation.navigate('Home');
  };

  const deleteHandler = id => {
    const filteredList = notes.filter(item => item._id != id);
    setNotes(filteredList);
    saveToStorage(filteredList);
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
        deleteHandler,
      }}>
      {children}
    </NoteContext.Provider>
  );
};
