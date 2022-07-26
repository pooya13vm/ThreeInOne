import React from 'react';
import {View, Text} from 'react-native';

const NoContent = () => {
  return (
    <View style={{flex: 1, alignItems: 'center', marginTop: 50}}>
      <Text style={{color: 'gray', fontWeight: 'bold'}}>
        There is no item in the list.
      </Text>
    </View>
  );
};

export default NoContent;
