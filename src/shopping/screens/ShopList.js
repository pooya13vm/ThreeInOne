import React, {useContext, useState} from 'react';
import {FlatList, TouchableOpacity, View} from 'react-native';
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
import MySnackbar from '../../components/Snackbar';

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
  const [snackbarVisible, setSnackbarVisible] = useState(false);
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
    return (
      <Overlay visibility={visible} setVisibility={setVisible}>
        <View
          style={{
            padding: 20,
            backgroundColor: colors.background,
            height: '100%',
            borderRadius: 5,
          }}>
          <Input
            label="Item:  *"
            labelStyle={{color: colors.textColor}}
            placeholderTextColor={colors.main}
            style={{color: colors.textColor}}
            placeholder="Example :Egg "
            onChangeText={val => {
              saveName(val);
            }}
            autoFocus
          />
          <Input
            label="More info:"
            labelStyle={{color: colors.textColor}}
            placeholder="Example :Brand of item"
            placeholderTextColor={colors.main}
            style={{color: colors.textColor}}
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
                color: colors.textColor,
                fontSize: 18,
                fontWeight: 'bold',
              }}
              onPress={() => {
                setSnackbarVisible(false);
                setVisible(false);
              }}
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
              titleStyle={{
                color: colors.textColor,
                fontSize: 18,
                fontWeight: 'bold',
              }}
              onPress={() => {
                if (name === '') {
                  setSnackbarVisible(true);
                } else {
                  saveItemToList();
                  setVisible(false);
                  setSnackbarVisible(false);
                }
              }}
            />
          </ModalBtnContainer>
        </View>
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
      <MySnackbar
        snackbarVisible={snackbarVisible}
        setSnackbarVisible={setSnackbarVisible}
        colors={colors}
        text="Item input can not leave null"
        position={-430}
      />
    </ScreensLayout>
  );
};

export default ShopList;
