import React, {useState, useContext, useMemo} from 'react';
import {Input, Button} from '@rneui/base';
import {View, StyleSheet, Text, TextInput} from 'react-native';
import ScreensLayout from '../../components/screensLayout';
import DropdownComponent from '../../components/dropDown';
import DatePicker from 'react-native-date-picker';
import {TodoContext} from '../../contexts/todoContext';
import {dateStringMaker} from '../../utility/dateHandler';
import {differentCal} from '../../utility/timeDifferentCal';

const AddScreen = props => {
  const [date, setDate] = useState(new Date());
  const [open, setOpen] = useState(false);
  const [selectedTime, setSelectedTime] = useState();
  const [stringifyDate, setStringifyDate] = useState('');
  const [remainingTime, setRemainingTime] = useState({});

  const {setTask, getTask, setImportance, saveTask, setInfo} =
    useContext(TodoContext);

  const impressArray = [
    {label: 'Vital', value: 'vital', id: 1},
    {label: 'Obligatory', value: 'obligatory', id: 2},
    {label: 'Medium', value: 'medium', id: 3},
    {label: 'Inessential', value: 'inessential', id: 4},
  ];

  useMemo(() => {
    if (selectedTime) {
      let now = new Date();
      let time = now.getTime();
      let taskTime = selectedTime.getTime();
      if (time >= taskTime) {
        setStringifyDate('please select a future time');
      } else {
        let dif = differentCal(taskTime - time);
        setStringifyDate(dateStringMaker(selectedTime, true));
        setRemainingTime(dif);
      }
    }
  }, [selectedTime]);

  const TimeShow = () => {
    return (
      <>
        <Text>{stringifyDate}</Text>
        <Text>{remainingTime}</Text>
      </>
    );
  };

  return (
    <ScreensLayout
      title="Add a task"
      left="l"
      right="r"
      props={props}
      onPressFun={() => saveTask(selectedTime, props)}>
      <View style={styles.formContainer}>
        <Input
          label="Task Content"
          value={getTask}
          onChangeText={val => setTask(val)}
        />
        <DropdownComponent
          placeholder="How Importance ..."
          categoryList={impressArray}
          setDDvalue={setImportance}
        />
        <Button
          title="Choose Deadline"
          style={{
            marginTop: 10,
            width: '70%',
            alignSelf: 'center',
          }}
          onPress={() => setOpen(true)}
        />
        <View
          style={{
            margin: 20,
            height: 170,
            padding: 10,
            borderRadius: 7,
            position: 'relative',
            borderWidth: 1,
          }}>
          <Text
            style={{
              color: 'gray',
              fontSize: 16,
              justifyContent: 'center',
              margin: 0,
              padding: 0,
            }}>
            More info:
          </Text>
          <TextInput
            multiline
            onChangeText={val => setInfo(val)}
            style={{
              paddingBottom: 10,
              color: 'gray',
            }}
          />
        </View>

        <DatePicker
          modal
          open={open}
          locale="en"
          date={date}
          onConfirm={date => {
            setOpen(false);
            setSelectedTime(date);
          }}
          onCancel={() => {
            setOpen(false);
          }}
        />
        {selectedTime !== undefined ? <TimeShow /> : null}
      </View>
    </ScreensLayout>
  );
};

export default AddScreen;

const styles = StyleSheet.create({
  formContainer: {
    marginTop: 30,
  },
});
