import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {Title} from 'react-native-paper';
import {SafeAreaView} from 'react-native-safe-area-context';
import {dateStringMaker} from '../../utility/dateHandler';
import {differentCal} from '../../utility/timeDifferentCal';
import {CheckBox, Icon} from '@rneui/themed';

const InfoScreen = ({navigation, route}) => {
  const [remTimeS, setRemTimeS] = useState('');
  const [deadlineString, setDeadlineString] = useState(null);

  let task = route.params.task.item;
  let defTime = dateStringMaker(task.saveTime, true);

  useEffect(() => {
    if (task.deadline) {
      const DLS = dateStringMaker(task.deadline, true);
      setDeadlineString(DLS);
      const now = new Date();
      const nowSec = now.getTime();
      const deadlineSec = task.deadline.getTime();
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
      {task.deadline ? (
        <>
          <Text>deadline : {deadlineString}</Text>
          <Text>remaining time:{remTimeS}</Text>
        </>
      ) : (
        <Text>no deadline has defined</Text>
      )}
      {/* <CheckBox title="I have done it" /> */}
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
