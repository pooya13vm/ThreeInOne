import React, {useEffect, useState, useContext} from 'react';
import {View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {differentCal} from '../../utility/timeDifferentCal';
import {CheckBox, Button, Icon} from '@rneui/themed';
import {TodoContext} from '../../contexts/todoContext';
import styled from 'styled-components';

const Container = styled.View`
  height: 100%;
  justify-content: space-between;
  padding: 20px;
  background-color: #ffffff;
  border-top-width: 5px;
  border-top-color: #75e1a4;
`;
const TitleContainer = styled.Text`
  font-size: 14px;
  color: gray;
  margin-vertical: 20px;
`;
const Title = styled.Text`
  color: #5c7065;
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
  color: #5c7065;
  font-size: 16px;
`;
const NoValue = styled.Text`
  color: #5c7065;
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

const InfoScreen = ({navigation, route}) => {
  const [remTimeS, setRemTimeS] = useState('');
  const [deadlineString, setDeadlineString] = useState(null);
  const [hasDone, setHasDone] = useState();
  const {getTodoList, setTodoList, setEditingTask, setSortList, saveToStorage} =
    useContext(TodoContext);

  const colors = {main: '#75e1a4', textColor: '#5C7065', background: '#ffffff'};

  let id = route.params.id;
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
    <SafeAreaView style={{backgroundColor: '#ffffff'}}>
      <Container>
        <View>
          <TitleContainer>
            Content: {'  '}
            <Title>{task.content}</Title>
          </TitleContainer>
          <TextContainer>
            <Topic>Importance: </Topic>
            <Value>{task.importance}</Value>
          </TextContainer>
          {task.info ? (
            <TextContainer>
              <Topic>Info: </Topic>
              <Value>{task.info}</Value>
            </TextContainer>
          ) : null}
          <TextContainer>
            <Topic>definition time: </Topic>
            <Value>{defTime}</Value>
          </TextContainer>

          {task.deadlineStr ? (
            <>
              <TextContainer>
                <Topic>deadline: </Topic>
                <Value>{deadlineString}</Value>
              </TextContainer>
              <TextContainer>
                <Topic>remaining time: </Topic>
                <Value>{remTimeS}</Value>
              </TextContainer>
            </>
          ) : (
            <NoValue>No deadline is defined</NoValue>
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
          />
        </CheckBoxContainer>

        <ButtonContainer>
          <Button
            type="outline"
            buttonStyle={{
              borderRadius: 50,
              padding: 10,
              borderColor: '#5c7065',
              borderWidth: 1,
            }}
            icon={<Icon name="arrow-left" color="#5c7065" type="entypo" />}
            onPress={navigation.goBack}></Button>
          <Button
            type="outline"
            buttonStyle={{
              borderRadius: 50,
              padding: 10,
              borderColor: '#5c7065',
              borderWidth: 1,
            }}
            icon={<Icon name="trash" color="#5c7065" type="entypo" />}
            onPress={deleteItem}></Button>
          <Button
            type="outline"
            buttonStyle={{
              borderRadius: 50,
              padding: 10,
              borderColor: '#5c7065',
              borderWidth: 1,
            }}
            icon={<Icon name="edit" color="#5c7065" type="entypo" />}
            onPress={() => {
              setEditingTask(task);
              navigation.navigate('EDIT', {task});
            }}></Button>
        </ButtonContainer>
      </Container>
    </SafeAreaView>
  );
};

export default InfoScreen;
