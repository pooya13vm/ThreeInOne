import React from 'react';
import {useContext} from 'react';
import {Input} from '@rneui/base';
import {View, Text, StyleSheet, TextInput} from 'react-native';
import ScreensLayout from '../../components/ScreensLayout';
import {NoteContext} from '../../contexts/noteContext';
import DropdownComponent from '../../components/DropDown';

const EditScreen = props => {
  const {
    categoryList,
    updateListAfterEdit,
    EditingContentValue,
    setEditingContentValue,
    EditingTitleValue,
    setEditingTitleValue,
    EditingCategoryValue,
    setEditingCategoryValue,
  } = useContext(NoteContext);

  const category = [...categoryList];
  category.shift();

  return (
    <ScreensLayout
      title="EDIT NOTE"
      props={props}
      onPressFun={updateListAfterEdit}
      left="l"
      right="r">
      <View>
        <DropdownComponent
          categoryList={category}
          placeholder={EditingCategoryValue}
          setDDvalue={setEditingCategoryValue}
        />
        <View>
          <Input
            label="Title"
            value={EditingTitleValue}
            onChangeText={val => setEditingTitleValue(val)}
            style={{fontWeight: 'bold'}}></Input>
        </View>
        <View>
          <Text style={{fontSize: 22, fontWeight: 'bold'}}>Note : </Text>
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
            value={EditingContentValue}
            onChangeText={val => setEditingContentValue(val)}></TextInput>
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
export default EditScreen;
