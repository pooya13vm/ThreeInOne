import React from 'react';
import {useContext} from 'react';
import {Input} from '@rneui/base';
import {View, Text, StyleSheet, TextInput} from 'react-native';
import ScreensLayout from '../../components/ScreensLayout';
import {NoteContext} from '../../contexts/noteContext';
import DropdownComponent from '../../components/DropDown';

const AddScreen = props => {
  const {
    getTitle,
    setTitle,
    getContent,
    setContent,
    saveNote,
    categoryList,
    setCategory,
  } = useContext(NoteContext);

  const category = [...categoryList];
  category.shift();

  return (
    <ScreensLayout
      title="ADD NOTE"
      props={props}
      onPressFun={saveNote}
      left="l"
      right="r">
      <View>
        <View>
          <DropdownComponent
            placeholder="Select Category"
            categoryList={category}
            setDDvalue={setCategory}
          />
          <Input
            label="Title"
            value={getTitle}
            onChangeText={val => setTitle(val)}
            style={{fontWeight: 'bold', height: 40}}></Input>
        </View>
        <View>
          <Text style={{fontSize: 18, fontWeight: 'bold'}}>Note : </Text>
          <TextInput
            multiline
            style={{
              backgroundColor: '#FCFAED',
              height: '85%',
              textAlignVertical: 'top',
              padding: 20,
              fontSize: 18,
              marginTop: 5,
              borderRadius: 3,
            }}
            value={getContent}
            onChangeText={val => setContent(val)}></TextInput>
        </View>
      </View>
    </ScreensLayout>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
export default AddScreen;
