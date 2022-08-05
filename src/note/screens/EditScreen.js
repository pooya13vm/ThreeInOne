import React, {useContext, useState} from 'react';
import {Icon, Input} from '@rneui/base';
import ScreensLayout from '../../components/ScreensLayout';
import {NoteContext} from '../../contexts/noteContext';
import DropdownComponent from '../../components/DropDown';
import styled from 'styled-components';
import {TouchableOpacity} from 'react-native';
import DeleteModal from '../../components/DeleteModal';
import {MainContext} from '../../contexts/mainContext';

const InputContainer = styled.View`
  margin-horizontal: 20px;
  margin-top: 20px;
  margin-bottom: 10px;
  height: 45px;
`;
const DropDownContainer = styled.View`
  height: 60px;
  margin-bottom: 20px;
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

const EditScreen = props => {
  const {
    deleteHandler,
    categoryList,
    updateListAfterEdit,
    EditingContentValue,
    setEditingContentValue,
    EditingTitleValue,
    setEditingTitleValue,
    EditingCategoryValue,
    setEditingCategoryValue,
  } = useContext(NoteContext);
  const {AllColors} = useContext(MainContext);
  let colors = AllColors.note;

  const [visibility, setVisibility] = useState(false);

  const category = [...categoryList];
  category.shift();
  // const colors = {main: '#4E97CE', textColor: '#2F5B7D', background: '#ffffff'};

  const DeleteIcon = () => {
    return (
      <TouchableOpacity
        onPress={() => {
          setVisibility(true);
        }}>
        <Icon name="trash" type="entypo" color={colors.textColor} />
      </TouchableOpacity>
    );
  };

  return (
    <ScreensLayout
      title="EDIT NOTE"
      props={props}
      onPressFun={updateListAfterEdit}
      right={<DeleteIcon />}
      colors={colors}>
      <InputContainer>
        <Input
          label="Title"
          value={EditingTitleValue}
          onChangeText={val => setEditingTitleValue(val)}
          inputContainerStyle={{borderBottomWidth: 0}}
          containerStyle={{height: 40}}
          style={{
            fontWeight: 'bold',
            height: 40,
            borderWidth: 1,
            paddingHorizontal: 10,
            borderRadius: 5,
            borderColor: '#4E97CE',
          }}></Input>
      </InputContainer>
      <DropDownContainer>
        <DropdownComponent
          categoryList={category}
          placeholder={EditingCategoryValue}
          setDDvalue={setEditingCategoryValue}
          colors={colors}
        />
      </DropDownContainer>
      <InputTitle placeholder="Write here">Note : </InputTitle>
      <TextInput
        multiline
        value={EditingContentValue}
        onChangeText={val => setEditingContentValue(val)}></TextInput>
      <DeleteModal
        colors={colors}
        visibility={visibility}
        setVisibility={setVisibility}
        item={EditingTitleValue}
        props={props}
        deleteHandler={deleteHandler}
      />
    </ScreensLayout>
  );
};
export default EditScreen;
