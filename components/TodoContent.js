import React, {useState} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {dateStringMaker} from '../utility/dateHandler';
import {Icon} from '@rneui/themed';

const TodoContent = ({task}) => {
  const [remTimeS, setRemTimeS] = useState('');

  let defTime = dateStringMaker(task.item.saveTime, true);
  let deadlineTime = null;

  if (task.item.deadline) {
    let myInterval;
    deadlineTime = dateStringMaker(task.item.deadline, true);
    let now = new Date();
    let nowSec = now.getTime();
    let deadlineSec = task.item.deadline.getTime();
    if (nowSec < deadlineSec) {
      //   let remainingTime = differentCal(deadlineSec - nowSec);
      //   setRemTimeS(
      //     `${remainingTime.month} month ${remainingTime.dayRes} day ${remainingTime.hourRes} hours ${remainingTime.minRes} minutes`,
      //   );
      //   myInterval = setInterval(() => {
      //     let remainingTime = differentCal(deadlineSec - nowSec);
      //     setRemTimeS(
      //       `${remainingTime.month} month ${remainingTime.dayRes} day ${remainingTime.hourRes} hours ${remainingTime.minRes} minutes`,
      //     );
      //   }, 60000);
    } else {
      setRemTimeS('The deadline is passed');
      clearInterval(myInterval);
    }
  }

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
