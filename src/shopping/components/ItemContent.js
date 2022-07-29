import React, {useContext} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {CheckBox, Icon} from '@rneui/themed';
import {ShoppingContext} from '../../contexts/shoppingContext';

const ItemContent = ({shopItem, parentIndex}) => {
  const {setListOfLists, listOfLists, saveToStorage} =
    useContext(ShoppingContext);
  const list = listOfLists[parentIndex].listArray;
  const id = shopItem.id;
  const targetItem = list.filter(item => item.id == id);
  const indexOfTarget = list.findIndex(item => item.id == id);

  const tickEvent = () => {
    let check = !targetItem[0].itemBuy;
    const copyList = [...list];
    const allListsCopy = [...listOfLists];
    if (check) {
      targetItem[0].itemBuy = true;
      const newList = copyList.filter(item => item.id !== id);
      newList.push(targetItem[0]);
      allListsCopy[parentIndex].listArray = newList;
      setListOfLists(allListsCopy);
      saveToStorage(allListsCopy);
    } else {
      targetItem[0].itemBuy = false;
      copyList[indexOfTarget] = targetItem[0];
      allListsCopy[parentIndex].listArray = copyList;
      setListOfLists(allListsCopy);
      saveToStorage(allListsCopy);
    }
  };

  const deleteItem = () => {
    const copyList = [...list];
    const newList = copyList.filter(item => item.id !== id);
    const allListsCopy = [...listOfLists];
    allListsCopy[parentIndex].listArray = newList;
    setListOfLists(allListsCopy);
    saveToStorage(allListsCopy);
  };

  //#75e1a4
  //#ff84d6
  return (
    <View
      style={{
        margin: 10,
        padding: 10,
        borderRadius: 5,
        // borderWidth: 1,
        borderBottomWidth: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
      }}>
      <View>
        <Text>{shopItem.itemName}</Text>
        <Text>{shopItem.itemInfo}</Text>
      </View>
      <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
        <TouchableOpacity onPress={() => deleteItem()}>
          <Icon name="trash" type="entypo" color="red" />
        </TouchableOpacity>

        <CheckBox
          checked={targetItem[0].itemBuy}
          onPress={() => {
            tickEvent();
          }}
          containerStyle={{
            backgroundColor: 'transparent',
            margin: 0,
            marginTop: 5,
            marginLeft: 40,
            padding: 0,
          }}
        />
      </View>
    </View>
  );
};

export default ItemContent;
