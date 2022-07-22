import React, {useState} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {dateStringMaker} from '../utility/dateHandler';
import {Icon} from '@rneui/themed';

const TodoContent = ({task}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.taskTitle}>{task.item.content}</Text>
      <Text style={styles.importanceTxt}>{task.item.importance}</Text>
      <View
        style={{
          width: 20,
          height: 20,
          backgroundColor: 'red',
          borderRadius: 15,
          alignSelf: 'center',
        }}></View>
      <Icon name="chevron-small-right" type="entypo" color="gray" />
    </View>
  );
};

export default TodoContent;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: 'white',
    margin: 10,
    padding: 10,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: 'tomato',
    justifyContent: 'space-between',
  },
  taskTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  importanceTxt: {
    color: 'gray',
    margin: 5,
  },
});
{
  /* <Icon style={styles.delete} name="trash" type="entypo" /> */
}
