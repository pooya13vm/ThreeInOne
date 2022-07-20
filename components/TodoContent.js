import React, {useState} from 'react';
import {View, Text} from 'react-native';
import {dateStringMaker} from '../utility/dateHandler';
import {differentCal} from '../utility/timeDifferentCal';

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
    <View>
      <View>
        <Text>{task.item.content}</Text>
        <Text>{`The importance is : ${task.item.importance}`}</Text>
        <Text>{`Time of definition : ${defTime}`}</Text>
        {task.item.deadline && (
          <>
            <Text>{`Deadline : ${deadlineTime}`}</Text>
            <Text>{`Remaining time : ${remTimeS}`}</Text>
          </>
        )}
      </View>
      <View>
        <Text>r</Text>
      </View>
    </View>
  );
};

export default TodoContent;
{
  /* <Icon style={styles.delete} name="trash" type="entypo" /> */
}
