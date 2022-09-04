import React, {useContext, useState} from 'react';
import {Input} from '@rneui/base';
import ScreensLayout from '../../components/ScreensLayout';
import {NoteContext} from '../../contexts/noteContext';
import DropdownComponent from '../../components/DropDown';
import styled from 'styled-components';
import {MainContext} from '../../contexts/mainContext';
import {KeyboardAvoidingView, Platform} from 'react-native';
import MySnackbar from '../../components/Snackbar';

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
  height: 83%;
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
  z-index: 10;
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
  const [snackbarVisible, setSnackbarVisible] = useState(false);
  let colors = AllColors.note;

  const category = [...categoryList];
  category.shift();

  const snackbarMaker = () => {
    setSnackbarVisible(true);
  };

  return (
    <ScreensLayout
      title="ADD NOTE"
      props={props}
      onPressFun={getContent.length > 0 ? saveNote : snackbarMaker}
      colors={colors}>
      <InputContainer>
        <Input
          autoFocus
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
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={64}
        style={Platform.OS !== 'ios' && {}}>
        <TextInput
          multiline
          value={getContent}
          placeholder="Write here"
          onChangeText={val => {
            setSnackbarVisible(false);
            setContent(val);
          }}
          color={colors.textColor}
          placeholderTextColor="gray"
        />
      </KeyboardAvoidingView>
      <MySnackbar
        snackbarVisible={snackbarVisible}
        setSnackbarVisible={setSnackbarVisible}
        colors={colors}
        text="Note without content cannot be saved"
        position={-80}
      />
    </ScreensLayout>
  );
};

export default AddScreen;
