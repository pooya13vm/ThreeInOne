import React from 'react';
import {View, Text} from 'react-native';

const ColorsGuide = () => {
  return (
    <View
      style={{
        borderWidth: 1,
        marginHorizontal: 12,
        padding: 12,
        borderColor: 'gray',
        borderRadius: 4,
      }}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          marginBottom: 5,
        }}>
        <View style={{flexDirection: 'row'}}>
          <View
            style={{
              width: 10,
              height: 10,
              backgroundColor: 'red',
              borderRadius: 15,
              alignSelf: 'center',
              marginRight: 5,
            }}></View>
          <Text>Deadline passed</Text>
        </View>
        <View style={{flexDirection: 'row'}}>
          <View
            style={{
              width: 10,
              height: 10,
              backgroundColor: 'blue',
              borderRadius: 15,
              alignSelf: 'center',
              marginRight: 5,
            }}></View>
          <Text>There is time left</Text>
        </View>
      </View>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          // marginBottom: 10,
        }}>
        <View style={{flexDirection: 'row'}}>
          <View
            style={{
              width: 10,
              height: 10,
              backgroundColor: 'green',
              borderRadius: 15,
              alignSelf: 'center',
              marginRight: 5,
            }}></View>
          <Text>Task has done</Text>
        </View>
        <View style={{flexDirection: 'row'}}>
          <View
            style={{
              width: 10,
              height: 10,
              backgroundColor: 'gray',
              borderRadius: 15,
              alignSelf: 'center',
              marginRight: 5,
            }}></View>
          <Text>No deadline has defined</Text>
        </View>
      </View>
    </View>
  );
};
export default ColorsGuide;
