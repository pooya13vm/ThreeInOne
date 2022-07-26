import React from 'react';
import {View, Text} from 'react-native';

const ShoppingContent = ({list}) => {
  return (
    <View
      style={{
        backgroundColor: 'white',
        padding: 8,
        margin: 8,
        borderWidth: 1,
        borderRadius: 8,
        flexDirection: 'row',
        justifyContent: 'space-between',
      }}>
      <Text>{list.item.name}</Text>
      <Text>{list.item.place}</Text>
      <Text>{`${list.item.listArray.length} item in th list`}</Text>
    </View>
  );
};

export default ShoppingContent;
