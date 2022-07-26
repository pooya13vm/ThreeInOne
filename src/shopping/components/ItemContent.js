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
    if (check) {
      targetItem[0].itemBuy = true;
      const copyList = [...list];
      const newList = copyList.filter(item => item.id !== id);
      newList.push(targetItem[0]);
      const allListsCopy = [...listOfLists];
      allListsCopy[parentIndex].listArray = newList;
      setListOfLists(allListsCopy);
      saveToStorage(allListsCopy);
      console.log(listOfLists);
    } else {
      targetItem[0].itemBuy = false;
      const copyList = [...list];
      copyList[indexOfTarget] = targetItem[0];
      const allListsCopy = [...listOfLists];
      allListsCopy[parentIndex].listArray = copyList;
      setListOfLists(allListsCopy);
      saveToStorage(allListsCopy);
      console.log(listOfLists);
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

  return (
    <View
      style={{
        margin: 10,
        padding: 10,
        borderRadius: 5,
        borderWidth: 1,
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
