import React from 'react';
import {createContext, useEffect, useState} from 'react';
import {Alert} from 'react-native';
import uuid from 'react-native-uuid';
import {NoteRealmDb} from '../App/db/db';

export const NoteContext = createContext({});

export const NoteProvider = props => {
  const [notes, setNotes] = useState([]);
  const [getTitle, setTitle] = useState('');
  const [getContent, setContent] = useState('');

  // useEffect(() => {
  //   const getData = async () => {
  //     try {
  //       await dataAction('Sync');
  //     } catch (error) {
  //       Alert.alert('There is some problem in dataBase');
  //     }
  //   };
  //   getData();
  // }, []);

  const saveNote = async props => {
    const note = {
      _id: uuid.v4(),
      title: getTitle,
      content: getContent,
    };
    setNotes([note, ...notes]);
    console.log(note);
    setTitle('');
    setContent('');
    addNote(note);
    props.navigation.navigate('Home');
  };

  const addNote = async note => {
    await dataAction('Add', note);
    await dataAction('Sync');
  };
  const updateNote = async (note, id) => {
    await dataAction('Update', note, id);
    await dataAction('Sync');
  };
  const deleteNote = async id => {
    await dataAction('Delete', null, id);
    await dataAction('Sync');
  };

  const dataAction = async (action, note, id) => {
    try {
      const realm = await NoteRealmDb();
      switch (action) {
        case 'Sync':
          const storedNotes = realm.objects('Note');
          setNotes(storedNotes);
          break;
        case 'Add':
          return realm.write(() => {
            realm.create('Note', note);
          });
        case 'Update':
          return realm.write(() => {
            const item = realm.objectForPrimaryKey('note', id);
            item.title = note.title;
            item.content = note.content;
          });
        case 'Delete':
          return realm.write(() => {
            realm.delete(realm.objectForPrimaryKey('Note', id));
          });
      }
      realm.close();
    } catch (error) {
      Alert.alert(error);
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
        addNote,
        updateNote,
        deleteNote,
      }}>
      {props.children}
    </NoteContext.Provider>
  );
};
