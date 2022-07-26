import React, {useEffect, useContext, useState} from 'react';
import {View, Text, FlatList, TouchableOpacity} from 'react-native';
import {ShoppingContext} from '../../contexts/shoppingContext';
import ScreensLayout from '../../components/screensLayout';
import AddBtn from '../components/AddBtn';
import Overlay from '../../components/Overlay';
import {Input, Button} from '@rneui/themed';
import uuid from 'react-native-uuid';
import NoContent from '../../components/NoContent';
import ItemContent from '../components/ItemContent';

const ShopList = ({navigation, route}) => {
  const {listOfLists, setListOfLists} = useContext(ShoppingContext);

  const [visible, setVisible] = useState(false);

  const id = route.params.id;
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
        <View>
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
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginTop: 30,
              marginHorizontal: 30,
            }}>
            <Button
              buttonStyle={{backgroundColor: 'red', width: '80%'}}
              onPress={() => setVisible(false)}>
              Cancel
            </Button>
            <Button
              buttonStyle={{backgroundColor: 'green', width: '80%'}}
              onPress={() => {
                saveItemToList();
                setVisible(false);
              }}>
              Save
            </Button>
          </View>
        </View>
      </Overlay>
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
  };

  return (
    <ScreensLayout
      title={targetItem[0].name}
      left="l"
      right="r"
      shopping={true}>
      <View style={{position: 'relative', flex: 1}}>
        {targetItem.listArray == 0 ? (
          <NoContent />
        ) : (
          <FlatList
            data={targetItem[0].listArray}
            keyExtractor={list => list.id}
            //in renderItem the note param return an object that the ".item" include the param
            renderItem={item => {
              return (
                <>
                  <ItemContent
                    shopItem={item.item}
                    parentIndex={indexOfTarget}
                  />
                </>

                // <View style={{flex: 1}}>
                //   <Text>{item.item.itemName}</Text>
                // </View>
              );
            }}
          />
        )}

        <View
          style={{
            width: 45,
            position: 'absolute',
            alignSelf: 'flex-end',
            bottom: 30,
            right: 10,
            zIndex: 100,
          }}>
          <AddBtn setVisibility={setVisible} />
        </View>
      </View>
      <MyModal />
    </ScreensLayout>
  );
};

export default ShopList;
