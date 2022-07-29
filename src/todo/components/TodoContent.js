import React, {useContext, useEffect} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {Icon} from '@rneui/themed';
import {TodoContext} from '../../contexts/todoContext';

const TodoContent = ({task}) => {
  const {reloader, setReloader} = useContext(TodoContext);
  const deadlineStr = task.item.deadlineStr;
  const deadlineSec = task.item.deadlineSec;
  const now = new Date();
  const colorMaker = () => {
    if (task.item.hasDoneStatus) {
      return 'green';
    }
    if (!deadlineStr) {
      return 'gray';
    }
    if (deadlineSec < now.getTime()) {
      return 'red';
    } else {
      return 'blue';
    }
  };
  useEffect(() => {
    if (
      deadlineSec &&
      !task.item.hasDoneStatus &&
      deadlineSec < now.getTime()
    ) {
      const myInterval = setInterval(() => {
        const nowInter = new Date();
        let IMtime = deadlineSec - nowInter.getTime();
        console.log(IMtime);
        if (IMtime < 0) {
          setReloader(!reloader);
          clearInterval(myInterval);
          console.log('clear interval');
        }
      }, 1000);
    }
  }, []);
  console.log('all component refreshed');
  return (
    <View style={styles.container}>
      <Text style={styles.taskTitle}>{task.item.content}</Text>
      <Text style={styles.importanceTxt}>{task.item.importance}</Text>
      <View style={{flexDirection: 'row'}}>
        <View
          style={{
            width: 20,
            height: 20,
            backgroundColor: colorMaker(),
            borderRadius: 15,
            alignSelf: 'center',
          }}></View>
        <Icon name="chevron-small-right" type="entypo" color="gray" />
      </View>
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
