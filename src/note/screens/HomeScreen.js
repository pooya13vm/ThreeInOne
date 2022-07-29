import React, {useContext, useEffect} from 'react';
import {FlatList, TouchableOpacity, View, StyleSheet, Text} from 'react-native';
import {Icon} from '@rneui/base';
import HomesLayout from '../../components/HomesLayout';
import NoteContent from '../components/NoteContent';
import {NoteContext} from '../../contexts/noteContext';
import AddBtn from '../../components/AddBtn';
import DropdownComponent from '../../components/DropDown';
import NoContent from '../../components/NoContent';

const NoteHomeScreen = props => {
  const {
    checkStorage,
    findEditNote,
    deleteHandler,
    categoryList,
    filteredCategory,
    filteredList,
    checkStorageCategory,
  } = useContext(NoteContext);

  useEffect(() => {
    checkStorage();
    checkStorageCategory();
  }, []);

  return (
    <HomesLayout
      title="MY NOTES"
      footer={<AddBtn navigation={props.navigation} color="green" />}
      rightProps={props}>
      <DropdownComponent
        placeholder="Select Category"
        categoryList={categoryList}
        setDDvalue={filteredCategory}
      />
      {filteredList.length == 0 ? (
        <NoContent />
      ) : (
        <FlatList
          data={filteredList}
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
                <Icon style={styles.delete} name="trash" type="entypo" />
              </TouchableOpacity>
            </View>
          )}
        />
      )}
    </HomesLayout>
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
