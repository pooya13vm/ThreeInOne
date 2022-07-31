import React, {useContext, useEffect} from 'react';
import {FlatList, TouchableOpacity} from 'react-native';
import HomesLayout from '../../components/HomesLayout';
import NoteContent from '../components/NoteContent';
import {NoteContext} from '../../contexts/noteContext';
import AddBtn from '../../components/AddBtn';
import DropdownComponent from '../../components/DropDown';
import NoContent from '../../components/NoContent';
import styled from 'styled-components';

const NoteHomeScreen = props => {
  const {
    checkStorage,
    findEditNote,
    categoryList,
    filteredCategory,
    filteredList,
    checkStorageCategory,
  } = useContext(NoteContext);

  useEffect(() => {
    checkStorage();
    checkStorageCategory();
  }, []);
  const colors = {main: '#4E97CE', textColor: '#2F5B7D', background: '#ffffff'};

  const ItemContainer = styled.View`
    flex: 1;
    margin-horizontal: 2px;
    margin-vertical: 12px;
    padding-horizontal: 10px;
  `;

  return (
    <HomesLayout
      title="MY NOTES"
      footer={<AddBtn navigation={props.navigation} color="green" />}
      rightProps={props}
      color={colors}>
      <DropdownComponent
        placeholder="Select Category"
        categoryList={categoryList}
        setDDvalue={filteredCategory}
        colors={colors}
      />
      {filteredList.length == 0 ? (
        <NoContent />
      ) : (
        <FlatList
          data={filteredList}
          style={{flexDirection: 'column'}}
          numColumns={2}
          keyExtractor={note => note._id}
          renderItem={note => (
            <ItemContainer>
              <TouchableOpacity
                onPress={() => {
                  findEditNote(note.item._id);
                  props.navigation.navigate('EDIT', {id: note.item._id});
                }}>
                <NoteContent note={note} />
              </TouchableOpacity>
            </ItemContainer>
          )}
        />
      )}
    </HomesLayout>
  );
};

export default NoteHomeScreen;
