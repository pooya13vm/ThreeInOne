import React, {useContext, useEffect} from 'react';
import {Text, FlatList, TouchableOpacity, View, StyleSheet} from 'react-native';
import {Button} from '@rneui/themed';
import Layout from '../../components/layout';
import {SafeAreaView} from 'react-native-safe-area-context';
import NoteContent from '../../components/noteContent';
import {NoteContext} from '../../contexts/noteContext';
import {Icon} from '@rneui/base';

const NoteHomeScreen = props => {
  const {notes, checkStorage, findEditNote, deleteHandler} =
    useContext(NoteContext);

  useEffect(() => {
    checkStorage();
  }, []);

  return (
    // <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
    //   <Text>note HomeScreen</Text>
    // </View>

    <Layout
      title="MY NOTES"
      footer={
        <Button
          onPress={() => props.navigation.navigate('ADD')}
          icon={{name: 'plus', type: 'entypo', size: 30}}
          iconContainerStyle={{
            margin: 0,
            padding: 0,
            width: 60,
          }}
          buttonStyle={{
            backgroundColor: 'rgba(127, 220, 103, 1)',
            borderRadius: 50,
            justifyContent: 'center',
            alignItems: 'center',
          }}></Button>
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
              <Icon style={styles.delete} name="delete" type="antdesign" />
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
export default NoteHomeScreen;
