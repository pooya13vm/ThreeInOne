import React, {useEffect, useState, useContext} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {Title} from 'react-native-paper';
import {SafeAreaView} from 'react-native-safe-area-context';
import {dateStringMaker} from '../../utility/dateHandler';
import {differentCal} from '../../utility/timeDifferentCal';
import {CheckBox, Button, Icon} from '@rneui/themed';
import {TodoContext} from '../../contexts/todoContext';

const InfoScreen = ({navigation, route}) => {
  const [remTimeS, setRemTimeS] = useState('');
  const [deadlineString, setDeadlineString] = useState(null);
  const [hasDone, setHasDone] = useState();
  const {getTodoList, setTodoList, setEditingTask} = useContext(TodoContext);

  let task = route.params.task.item;
  let defTime = task.saveTimeStr;
  const itemIndex = getTodoList.findIndex(item => item._id == task._id);

  const saveToState = () => {
    let tick = hasDone === undefined ? true : !hasDone;
    let newList = [...getTodoList];
    newList[itemIndex].hasDoneStatus = tick;
    setTodoList(newList);
  };

  const deleteItem = () => {
    let copyList = [...getTodoList];
    const newList = copyList.filter(item => item._id !== task._id);
    setTodoList(newList);
    navigation.navigate('Home');
  };

  useEffect(() => {
    if (task.deadlineStr) {
      const DLS = task.deadlineStr;
      setDeadlineString(DLS);
      const now = new Date();
      const nowSec = now.getTime();
      const deadlineSec = task.deadlineSec;
      if (nowSec < deadlineSec) {
        let remainingTime = differentCal(deadlineSec - nowSec);
        setRemTimeS(remainingTime);
      } else {
        setRemTimeS('deadline is passed');
      }
    }
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <Title>task :{task.content}</Title>
      <Text>task importance :{task.importance}</Text>
      <Text>task info :{task.info}</Text>
      <Text>definition time : {defTime}</Text>
      {task.deadlineStr ? (
        <>
          <Text>deadline : {deadlineString}</Text>
          <Text>remaining time:{remTimeS}</Text>
        </>
      ) : (
        <Text>no deadline has defined</Text>
      )}
      <CheckBox
        title="I have done it"
        checked={task.hasDoneStatus}
        onPress={() => {
          setHasDone(!hasDone);
          saveToState();
        }}
        checkedColor="green"
        iconRight
      />
      <Button type="solid" onPress={deleteItem}>
        Delete the task
        <Icon name="trash" color="white" type="entypo" />
      </Button>
      <Button
        style={{margin: 10}}
        onPress={() => {
          setEditingTask(task);
          navigation.navigate('EDIT', {task});
        }}>
        Edit the task
        <Icon name="edit" color="white" type="entypo" />
      </Button>
    </SafeAreaView>
  );
};

export default InfoScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    margin: 15,
    padding: 20,
    backgroundColor: 'yellow',
  },
});
