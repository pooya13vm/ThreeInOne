import React, {useContext} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {Icon} from '@rneui/base';
import {ShoppingContext} from '../../contexts/shoppingContext';

const ShoppingContent = ({list, props}) => {
  const {deleteList} = useContext(ShoppingContext);
  return (
    <TouchableOpacity
      onPress={() =>
        props.navigation.navigate('SHOPPLIST', {id: list.item._id})
      }>
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
        <Text>{`${list.item.listArray.length} item`}</Text>
        <TouchableOpacity
          onPress={() => deleteList(list.item._id)}
          style={{padding: 3}}>
          <Icon name="trash" type="entypo" color="red" size={20} />
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
};

export default ShoppingContent;
