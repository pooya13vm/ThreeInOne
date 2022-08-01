import React, {useContext, useEffect} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {Icon} from '@rneui/themed';
import {TodoContext} from '../../contexts/todoContext';

const TodoContent = ({task}) => {
  const {reloader, setReloader} = useContext(TodoContext);
  const deadlineStr = task.item.deadlineStr;
  const deadlineSec = task.item.deadlineSec;
  const now = new Date();
  const colors = {main: '#75e1a4', textColor: '#5C7065', background: '#ffffff'};
  const statusText = () => {
    if (task.item.hasDoneStatus) {
      return 'Has done';
    }
    if (!deadlineStr) {
      return 'No deadline';
    }
    if (deadlineSec < now.getTime()) {
      return 'Deadline passed';
    } else {
      return 'Have time';
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

  return (
    <View style={styles.container}>
      <Text style={styles.taskTitle}>{task.item.content}</Text>
      <Text style={styles.importanceTxt}>{task.item.importance}</Text>
      <Text style={{width: '30%', fontSize: 12, color: '#62BD89'}}>
        {statusText()}
      </Text>
      <View style={{flexDirection: 'row'}}>
        <Icon name="chevron-small-right" type="entypo" color="#5C7065" />
      </View>
    </View>
  );
};

export default TodoContent;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#75e1a4',
    margin: 10,
    padding: 10,
    borderRadius: 5,
    borderColor: 'tomato',
    alignItems: 'center',
  },
  taskTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    width: '30%',
    color: '#62BD89',
  },
  importanceTxt: {
    color: 'gray',
    margin: 5,
    width: '30%',
    color: '#62BD89',
    fontSize: 12,
  },
});
