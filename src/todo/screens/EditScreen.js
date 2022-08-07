import React, {useState, useContext, useEffect} from 'react';
import {Input, Button} from '@rneui/base';
import ScreensLayout from '../../components/ScreensLayout';
import DropdownComponent from '../../components/DropDown';
import DatePicker from 'react-native-date-picker';
import {TodoContext} from '../../contexts/todoContext';
import {differentCal} from '../../utility/timeDifferentCal';
import styled from 'styled-components';
import MySnackbar from '../../components/Snackbar';

const InputContainer = styled.View`
  margin-horizontal: 20px;
  margin-top: 20px;
`;
const TimeShowContainer = styled.View`
  justify-content: center;
  border-radius: 5px;
  align-self: center;
  margin-vertical: 10px;
  padding: 12px;
  border-width: 1px;
  border-color: ${props => props.color};
`;
const TimeContent = styled.Text`
  color: ${props => props.color};
`;
const TextInputContainer = styled.View`
  margin: 22px;
  height: 170px;
  padding: 10px;
  border-radius: 7px;
  position: relative;
  border-width: 1px;
  border-color: ${props => props.color};
`;
const TextInputLable = styled.Text`
  color: ${props => props.color};
  font-size: 16px;
`;
const TextInput = styled.TextInput`
  padding-bottom: 10px;
  color: ${props => props.color};
`;
const NoDeadlineContainer = styled.View`
  justify-content: center;
  padding: 20px;
  align-items: center;
`;
const NoDeadlineText = styled.Text`
  font-size: 16px;
  color: ${props => props.color};
`;

const EditScreen = props => {
  const [date, setDate] = useState(new Date());
  const [open, setOpen] = useState(false);
  const [selectedTime, setSelectedTime] = useState();
  const [remainingTime, setRemainingTime] = useState();

  const {
    editingTaskTitle,
    setEditingTaskTitle,
    editingImportance,
    setEditingImportance,
    editingInfo,
    setEditingInfo,
    setEditingDeadline,
    updateListAfterEdit,
    showSnackbar,
    setShowSnackbar,
  } = useContext(TodoContext);

  const task = props.route.params.task;
  const colors = props.route.params.colors;
  const deadlineStr = task.deadlineStr ? task.deadlineStr : null;
  console.log(task);

  const impressArray = [
    {label: 'Vital', value: 'vital', id: 1},
    {label: 'Obligatory', value: 'obligatory', id: 2},
    {label: 'Medium', value: 'medium', id: 3},
    {label: 'Inessential', value: 'inessential', id: 4},
  ];

  useEffect(() => {
    if (deadlineStr) {
      let now = new Date();
      let time = now.getTime();
      let taskTime = task.deadlineSec;
      let dif = differentCal(taskTime - time);
      console.log(dif);
      setRemainingTime(dif);
    }
  }, [selectedTime]);

  const TimeShow = () => {
    return (
      <TimeShowContainer color={colors.main}>
        <TimeContent
          color={colors.textColor}>{`Deadline : ${deadlineStr}`}</TimeContent>
        <TimeContent
          color={
            colors.textColor
          }>{`Remaining time : ${remainingTime}`}</TimeContent>
      </TimeShowContainer>
    );
  };

  return (
    <ScreensLayout
      title="Edit task"
      colors={colors}
      props={props}
      onPressFun={updateListAfterEdit}>
      <InputContainer>
        <Input
          label="Task Content"
          value={editingTaskTitle}
          onChangeText={val => {
            setShowSnackbar(false);
            setEditingTaskTitle(val);
          }}
          inputContainerStyle={{
            paddingHorizontal: 8,
          }}
          containerStyle={{
            height: 50,
          }}
          style={{fontSize: 16, color: colors.textColor}}
          placeholderTextColor={colors.textColor}
          inputStyle={{color: colors.textColor}}
        />
      </InputContainer>

      <DropdownComponent
        placeholder={editingImportance}
        categoryList={impressArray}
        setDDvalue={setEditingImportance}
        colors={colors}
      />

      <TextInputContainer color={colors.main}>
        <TextInputLable color={colors.textColor}>More info:</TextInputLable>
        <TextInput
          color={colors.textColor}
          multiline
          value={editingInfo}
          onChangeText={val => setEditingInfo(val)}
        />
      </TextInputContainer>
      <Button
        title="Choose Deadline"
        buttonStyle={{
          backgroundColor: 'transparent',
          borderWidth: 1,
          borderColor: colors.main,
        }}
        titleStyle={{color: colors.textColor, marginVertical: 5}}
        style={{
          marginTop: 30,
          width: '60%',
          alignSelf: 'center',
        }}
        onPress={() => setOpen(true)}
      />

      {deadlineStr ? (
        <TimeShow />
      ) : (
        <NoDeadlineContainer color={colors.textColor}>
          <NoDeadlineText color={colors.textColor}>
            No deadline has been defined{' '}
          </NoDeadlineText>
        </NoDeadlineContainer>
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
      <MySnackbar
        colors={colors}
        snackbarVisible={showSnackbar}
        setSnackbarVisible={setShowSnackbar}
        text="Task Content can not leave null"
      />
    </ScreensLayout>
  );
};

export default EditScreen;
