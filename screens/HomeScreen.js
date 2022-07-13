import React, {useContext, useEffect} from 'react';
import {Text, FlatList, TouchableOpacity, View, StyleSheet} from 'react-native';
import {Button} from '@rneui/themed';
import Layout from '../components/layout';
import NoteContent from '../components/noteContent';
import {NoteContext} from '../contexts/noteContext';

const HomeScreen = props => {
  const {notes, checkStorage, findEditNote, deleteHandler} =
    useContext(NoteContext);

  useEffect(() => {
    checkStorage();
  }, []);

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
        //in renderItem the note param return an object that the ".item" include the param
        renderItem={note => (
          <View style={styles.listItemContainer}>
            <TouchableOpacity
              onPress={() => {
                findEditNote(note.item._id);
                props.navigation.navigate('EDIT', {id: note.item._id});
              }}
              style={styles.content}>
              <NoteContent note={note} />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.delete}
              onPress={() => {
                deleteHandler(note.item._id);
              }}>
              <Text>Delete</Text>
            </TouchableOpacity>
          </View>
        )}
      />
    </Layout>
  );
};
const styles = StyleSheet.create({
  listItemContainer: {
    flexDirection: 'row',
    width: '100%',

    margin: 2,
    justifyContent: 'space-between',
    alignContent: 'flex-end',
  },
  content: {
    flex: 2,
  },
  delete: {
    justifyContent: 'center',
    padding: 4,
    backgroundColor: 'red',
    borderRadius: 50,
    height: 80,
    marginTop: 10,
  },
});
export default HomeScreen;
