import React, {useContext, useState} from 'react';
import {FlatList, TouchableOpacity} from 'react-native';
import {Input, Button} from '@rneui/themed';
import {Icon} from '@rneui/themed';
import uuid from 'react-native-uuid';
import {ShoppingContext} from '../../contexts/shoppingContext';
import ScreensLayout from '../../components/ScreensLayout';
import AddBtn from '../components/AddBtn';
import Overlay from '../../components/Overlay';
import NoContent from '../../components/NoContent';
import ItemContent from '../components/ItemContent';
import DeleteModal from '../../components/DeleteModal';
import styled from 'styled-components';
import {MainContext} from '../../contexts/mainContext';

const ButtonContainer = styled.View`
  width: 45px;
  position: absolute;
  align-self: flex-end;
  bottom: 0;
  right: 25px;
  z-index: 100;
`;
const ModalBtnContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
  margin-top: 30px;
  margin-horizontal: 15px;
`;

const ShopList = props => {
  const {listOfLists, setListOfLists, saveToStorage, deleteList} =
    useContext(ShoppingContext);
  const {AllColors} = useContext(MainContext);
  let colors = AllColors.shopping;

  const [visible, setVisible] = useState(false);
  const [warningVisibility, setWarningVisibility] = useState(false);
  const id = props.route.params.id;
  const targetItem = listOfLists.filter(item => item._id == id);
  const indexOfTarget = listOfLists.findIndex(item => item._id === id);

  let name = '';
  const saveName = val => {
    name = val;
  };
  let info = '';
  const saveInfo = val => {
    info = val;
  };

  const MyModal = () => {
    console.log(colors);
    return (
      <Overlay visibility={visible} setVisibility={setVisible}>
        <Input
          label="Item:"
          placeholder="Example :Egg "
          onChangeText={val => saveName(val)}
        />
        <Input
          label="More info:"
          placeholder="Example :Brand of item"
          onChangeText={val => saveInfo(val)}
        />
        <ModalBtnContainer>
          <Button
            type="outline"
            buttonStyle={{
              width: '80%',
              backgroundColor: 'transparent',
              borderColor: '#FF84D6',
              borderWidth: 1,
            }}
            title="Cancel"
            titleStyle={{
              color: '#705C69',
              fontSize: 18,
              fontWeight: 'bold',
            }}
            onPress={() => setVisible(false)}
          />
          <Button
            type="outline"
            buttonStyle={{
              width: '80%',
              backgroundColor: 'transparent',
              borderColor: '#FF84D6',
              borderWidth: 1,
            }}
            title="Save"
            titleStyle={{color: '#705C69', fontSize: 18, fontWeight: 'bold'}}
            onPress={() => {
              saveItemToList();
              setVisible(false);
            }}
          />
        </ModalBtnContainer>
      </Overlay>
    );
  };
  const DeleteIcon = () => {
    return (
      <TouchableOpacity
        onPress={() => {
          setWarningVisibility(true);
        }}>
        <Icon name="trash" type="entypo" color={colors.textColor} />
      </TouchableOpacity>
    );
  };
  const BackIcon = () => {
    return (
      <TouchableOpacity onPress={() => props.navigation.goBack()}>
        <Icon name="arrow-left" type="entypo" color={colors.textColor} />
      </TouchableOpacity>
    );
  };

  const saveItemToList = () => {
    let item = {
      id: uuid.v4(),
      itemName: name,
      itemInfo: info,
      itemBuy: false,
    };
    let allLists = [...listOfLists];
    allLists[indexOfTarget].listArray.push(item);
    setListOfLists(allLists);
    saveToStorage(allLists);
  };

  return (
    <ScreensLayout
      title={targetItem[0] ? targetItem[0].name : 'Deleted'}
      colors={colors}
      shopping={true}
      right={<DeleteIcon />}
      left={<BackIcon />}>
      {targetItem[0].listArray.length == 0 ? (
        <NoContent />
      ) : (
        <FlatList
          style={{marginTop: 10}}
          data={targetItem[0].listArray}
          keyExtractor={list => list.id}
          renderItem={item => {
            return (
              <>
                <ItemContent
                  shopItem={item.item}
                  parentIndex={indexOfTarget}
                  colors={colors}
                />
              </>
            );
          }}
        />
      )}

      <ButtonContainer>
        <AddBtn setVisibility={setVisible} />
      </ButtonContainer>
      <MyModal />
      <DeleteModal
        colors={colors}
        props={props}
        visibility={warningVisibility}
        setVisibility={setWarningVisibility}
        item={`${targetItem[0].name} list`}
        deleteHandler={deleteList}
        listId={targetItem[0]._id}
      />
    </ScreensLayout>
  );
};

export default ShopList;
