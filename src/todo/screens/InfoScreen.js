import React, {useEffect, useState, useContext} from 'react';
import {View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {differentCal} from '../../utility/timeDifferentCal';
import {CheckBox, Button, Icon} from '@rneui/themed';
import {TodoContext} from '../../contexts/todoContext';
import styled from 'styled-components';
import DeleteModal from '../../components/DeleteModal';

const Container = styled.View`
  height: 100%;
  justify-content: space-between;
  padding: 20px;
  background-color: ${props => props.BGColor};
  border-top-width: 5px;
  border-top-color: ${props => props.color};
`;
const TitleContainer = styled.Text`
  font-size: 14px;
  color: gray;
  margin-vertical: 20px;
`;
const Title = styled.Text`
  color: ${props => props.color};
  font-weight: bold;
  font-size: 18px;
`;
const TextContainer = styled.View`
  flex-direction: row;
  align-items: center;
`;
const Topic = styled.Text`
  font-size: 14px;
  color: gray;
  margin-vertical: 5px;
  width: 32%;
`;
const Value = styled.Text`
  color: ${props => props.color};
  font-size: 16px;
`;
const NoValue = styled.Text`
  color: ${props => props.color};
  font-size: 16px;
  margin-top: 20px;
  align-self: center;
`;
const CheckBoxContainer = styled.View`
  align-self: center;
  align-items: center;
  border-width: 2px;
  width: 150px;
  padding-vertical: 35px;
  border-radius: 100px;
  border-color: #75e1a4;
`;
const CheckBoxTitle = styled.Text`
  font-size: 16px;
  color: #75e1a4;
  font-weight: bold;
`;
const ButtonContainer = styled.View`
  flex-direction: row;
  justify-content: space-evenly;
`;

const InfoScreen = props => {
  const [visibility, setVisibility] = useState(false);
  const [remTimeS, setRemTimeS] = useState('');
  const [deadlineString, setDeadlineString] = useState(null);
  const [hasDone, setHasDone] = useState();
  const {getTodoList, setTodoList, setEditingTask, setSortList, saveToStorage} =
    useContext(TodoContext);

  // const colors = {main: '#75e1a4', textColor: '#5C7065', background: '#ffffff'};

  let id = props.route.params.id;
  let colors = props.route.params.colors;
  let task = getTodoList.filter(item => item._id == id)[0];
  let defTime = task.saveTimeStr;
  const itemIndex = getTodoList.findIndex(item => item._id == task._id);

  const saveToState = () => {
    let tick = hasDone === undefined ? true : !hasDone;
    let newList = [...getTodoList];
    newList[itemIndex].hasDoneStatus = tick;
    setTodoList(newList);
    setSortList(newList);
    saveToStorage(newList);
  };

  const deleteItem = () => {
    let copyList = [...getTodoList];
    const newList = copyList.filter(item => item._id !== task._id);
    setTodoList(newList);
    setSortList(newList);
    saveToStorage(newList);
    props.navigation.navigate('Home');
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
    <SafeAreaView style={{backgroundColor: colors.background}}>
      <Container color={colors.main} BGColor={colors.background}>
        <View>
          <TitleContainer>
            Content: {'  '}
            <Title color={colors.textColor}>{task.content}</Title>
          </TitleContainer>
          <TextContainer>
            <Topic>Importance: </Topic>
            <Value color={colors.textColor}>{task.importance}</Value>
          </TextContainer>
          {task.info ? (
            <TextContainer>
              <Topic>Info: </Topic>
              <Value color={colors.textColor}>{task.info}</Value>
            </TextContainer>
          ) : null}
          <TextContainer>
            <Topic>definition time: </Topic>
            <Value color={colors.textColor}>{defTime}</Value>
          </TextContainer>

          {task.deadlineStr ? (
            <>
              <TextContainer>
                <Topic>deadline: </Topic>
                <Value color={colors.textColor}>{deadlineString}</Value>
              </TextContainer>
              <TextContainer>
                <Topic>remaining time: </Topic>
                <Value color={colors.textColor}>{remTimeS}</Value>
              </TextContainer>
            </>
          ) : (
            <NoValue color={colors.textColor}>No deadline is defined</NoValue>
          )}
        </View>

        <CheckBoxContainer>
          <CheckBoxTitle>I have done it</CheckBoxTitle>
          <CheckBox
            checked={task.hasDoneStatus}
            onPress={() => {
              setHasDone(!hasDone);
              saveToState();
            }}
            checkedColor="#75e1a4"
            size={32}
            uncheckedColor="#75e1a4"
            containerStyle={{backgroundColor: 'transparent'}}
          />
        </CheckBoxContainer>

        <ButtonContainer>
          <Button
            type="outline"
            buttonStyle={{
              borderRadius: 50,
              padding: 10,
              borderColor: colors.textColor,
              borderWidth: 1,
            }}
            icon={
              <Icon name="arrow-left" color={colors.textColor} type="entypo" />
            }
            onPress={props.navigation.goBack}></Button>
          <Button
            type="outline"
            buttonStyle={{
              borderRadius: 50,
              padding: 10,
              borderColor: colors.textColor,
              borderWidth: 1,
            }}
            icon={<Icon name="trash" color={colors.textColor} type="entypo" />}
            onPress={() => setVisibility(true)}></Button>
          <Button
            type="outline"
            buttonStyle={{
              borderRadius: 50,
              padding: 10,
              borderColor: colors.textColor,
              borderWidth: 1,
            }}
            icon={<Icon name="edit" color={colors.textColor} type="entypo" />}
            onPress={() => {
              setEditingTask(task);
              props.navigation.navigate('EDIT', {task, colors});
            }}></Button>
        </ButtonContainer>
      </Container>
      <DeleteModal
        colors={colors}
        visibility={visibility}
        setVisibility={setVisibility}
        item={task.content}
        props={props}
        deleteHandler={deleteItem}
      />
    </SafeAreaView>
  );
};

export default InfoScreen;
