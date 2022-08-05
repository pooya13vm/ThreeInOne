import React, {useContext} from 'react';
import {Input} from '@rneui/base';
import ScreensLayout from '../../components/ScreensLayout';
import {NoteContext} from '../../contexts/noteContext';
import DropdownComponent from '../../components/DropDown';
import styled from 'styled-components';
import {MainContext} from '../../contexts/mainContext';

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
  color: ${props => props.color};
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
  color: ${props => props.color};
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
  const {AllColors} = useContext(MainContext);
  let colors = AllColors.note;
  console.log(colors);

  const category = [...categoryList];
  category.shift();

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
            color: colors.textColor,
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

      <InputTitle color={colors.textColor}>Note : </InputTitle>
      <TextInput
        multiline
        value={getContent}
        placeholder="Write here"
        onChangeText={val => setContent(val)}
        color={colors.textColor}
        placeholderTextColor="gray"
      />
    </ScreensLayout>
  );
};

export default AddScreen;
