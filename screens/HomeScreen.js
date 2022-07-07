import React, {useCallback, useContext} from 'react';
import {Text, FlatList, TouchableOpacity} from 'react-native';
import {Button} from '@rneui/themed';
import {useFocusEffect} from '@react-navigation/native';
import Layout from '../components/layout';
import NoteContent from '../components/noteContent';
import {NoteContext} from '../contexts/noteContext';

const HomeScreen = props => {
  const {notes, setNotes} = useContext(NoteContext);

  // useFocusEffect(
  //   useCallback(() => {
  //     setNotes(notes);
  //   }, [notes]),
  // );
  return (
    <Layout
      title="MY NOTES"
      footer={
        <Button
          onPress={() => props.navigation.navigate('ADD')}
          title="Add new note"
          buttonStyle={{
            height: '100%',
            backgroundColor: 'rgba(127, 220, 103, 1)',
          }}
          titleStyle={{fontWeight: 'bold', fontSize: 32, color: 'white'}}
          containerStyle={{
            width: '100%',
          }}>
          <Text>Add new note</Text>
        </Button>
      }
      left="l"
      right="r">
      <FlatList
        data={notes}
        keyExtractor={note => note._id}
        renderItem={note => (
          <TouchableOpacity
            onPress={() => {
              props.navigation.navigate('Update', {id: note.id});
            }}>
            <NoteContent note={note} />
          </TouchableOpacity>
        )}
      />
    </Layout>
  );
};
export default HomeScreen;
