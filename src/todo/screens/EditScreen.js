import React, {useState, useContext, useMemo} from 'react';
import {Input, Button} from '@rneui/base';
import {View, StyleSheet, Text, TextInput} from 'react-native';
import ScreensLayout from '../../components/ScreensLayout';
import DropdownComponent from '../../components/DropDown';
import DatePicker from 'react-native-date-picker';
import {TodoContext} from '../../contexts/todoContext';
import {dateStringMaker} from '../../utility/dateHandler';
import {differentCal} from '../../utility/timeDifferentCal';

const EditScreen = props => {
  const [date, setDate] = useState(new Date());
  const [open, setOpen] = useState(false);
  const [selectedTime, setSelectedTime] = useState();
  const [stringifyDate, setStringifyDate] = useState('');
  const [remainingTime, setRemainingTime] = useState({});

  const {
    editingTaskTitle,
    setEditingTaskTitle,
    editingImportance,
    setEditingImportance,
    editingInfo,
    setEditingInfo,
    setEditingDeadline,
    updateListAfterEdit,
  } = useContext(TodoContext);

  const task = props.route.params.task;
  const deadlineStr = task.deadlineStr ? task.deadlineStr : null;

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
      title="Edit task"
      left="l"
      right="r"
      props={props}
      onPressFun={updateListAfterEdit}>
      <View style={styles.formContainer}>
        <Input
          label="Task Content"
          value={editingTaskTitle}
          onChangeText={val => setEditingTaskTitle(val)}
        />
        <DropdownComponent
          placeholder={editingImportance}
          categoryList={impressArray}
          setDDvalue={setEditingImportance}
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
            value={editingInfo}
            onChangeText={val => setEditingInfo(val)}
            style={{
              paddingBottom: 10,
              color: 'gray',
            }}
          />
        </View>

        {deadlineStr ? (
          <View>
            <Text>{`Defined dead line: ${deadlineStr}`}</Text>
          </View>
        ) : (
          <View>
            <Text>No deadline has been defined </Text>
          </View>
        )}

        <DatePicker
          modal
          open={open}
          locale="en"
          date={date}
          onConfirm={date => {
            setOpen(false);
            setEditingDeadline(date);
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

export default EditScreen;

const styles = StyleSheet.create({
  formContainer: {
    marginTop: 30,
  },
});
