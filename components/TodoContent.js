import React, {useMemo, useContext} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {dateStringMaker} from '../utility/dateHandler';
import {Icon} from '@rneui/themed';
import {TodoContext} from '../contexts/todoContext';

const TodoContent = ({task}) => {
  const {reloader, setReloader} = useContext(TodoContext);
  const now = new Date();
  const deadline = task.item.deadline;

  const colorMaker = () => {
    if (task.item.hasDoneStatus) {
      return 'green';
    }
    if (!deadline) {
      return 'gray';
    }
    if (deadline.getTime() < now.getTime()) {
      return 'red';
    } else {
      return 'blue';
    }
  };
  useMemo(() => {
    if (
      deadline &&
      !task.item.hasDoneStatus &&
      deadline.getTime() > now.getTime()
    ) {
      const myInterval = setInterval(() => {
        const nowInter = new Date();
        let IMtime = deadline.getTime() - nowInter.getTime();
        console.log(IMtime);
        if (IMtime < 0) {
          setReloader(!reloader);
          clearInterval(myInterval);
          console.log('clear interval');
        }
      }, 30000);
    }
  }, [reloader]);

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
