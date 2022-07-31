import React, {useContext} from 'react';
import {Input} from '@rneui/base';
import ScreensLayout from '../../components/ScreensLayout';
import {NoteContext} from '../../contexts/noteContext';
import DropdownComponent from '../../components/DropDown';
import styled from 'styled-components';

const InputContainer = styled.View`
  margin-horizontal: 20px;
  margin-top: 20px;
  height: 45px;
`;
const DropDownContainer = styled.View`
  height: 60px;
  margin-bottom: 30px;
  justify-content: center;
`;
const InputTitle = styled.Text`
  font-size: 18px;
  font-weight: bold;
  color: #2f5b7d;
  margin-left: 20px;
`;
const TextInput = styled.TextInput`
  height: 70%;
  text-align-vertical: top;
  padding: 20px;
  font-size: 18px;
  margin-top: 5px;
  border-radius: 3px;
  margin-horizontal: 20px;
  padding-top: 15px;
  border-width: 1px;
  border-color: #4e97ce;
`;

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
  const colors = {main: '#4E97CE', textColor: '#2F5B7D', background: '#ffffff'};

  return (
    <ScreensLayout
      title="ADD NOTE"
      props={props}
      onPressFun={saveNote}
      colors={colors}>
      <InputContainer>
        <Input
          placeholder="Title"
          value={getTitle}
          onChangeText={val => setTitle(val)}
          inputContainerStyle={{borderBottomWidth: 0}}
          containerStyle={{height: 40}}
          style={{
            fontWeight: 'bold',
            height: 40,
            borderWidth: 1,
            paddingHorizontal: 10,
            borderRadius: 5,
            borderColor: '#4E97CE',
          }}
        />
      </InputContainer>
      <DropDownContainer>
        <DropdownComponent
          placeholder="Select Category"
          categoryList={category}
          setDDvalue={setCategory}
          colors={colors}
        />
      </DropDownContainer>

      <InputTitle>Note : </InputTitle>
      <TextInput
        multiline
        value={getContent}
        placeholder="Write here"
        onChangeText={val => setContent(val)}
      />
    </ScreensLayout>
  );
};

export default AddScreen;
