import React, {useEffect, useContext} from 'react';
import {View, TouchableOpacity, FlatList} from 'react-native';
import HomesLayout from '../../components/HomesLayout';
import AddBtn from '../../components/AddBtn';
import DropdownComponent from '../../components/DropDown';
import {TodoContext} from '../../contexts/todoContext';
import NoContent from '../../components/NoContent';
import TodoContent from '../components/TodoContent';
import styled from 'styled-components';
import {MainContext} from '../../contexts/mainContext';

const TitleContainer = styled.View`
  flex-direction: row;
  margin-horizontal: 14px;
  margin-top: 10px;
  padding-left: 5px;
  border-bottom-width: 2px;
  border-bottom-color: ${props => props.color};
  padding-vertical: 5px;
`;
const TitleText1 = styled.Text`
  margin-right: 60px;
  color: ${props => props.color};
  font-size: 16px;
  font-weight: bold;
`;
const TitleText2 = styled.Text`
  margin-right: 50px;
  color: ${props => props.color};
  font-size: 16px;
  font-weight: bold;
`;
const TitleText3 = styled.Text`
  color: ${props => props.color};
  font-size: 16px;
  font-weight: bold;
`;

const TodoHomeScreen = props => {
  const {checkStorage, getTodoList, sortManager, sortList} =
    useContext(TodoContext);
  const {AllColors} = useContext(MainContext);
  let colors = AllColors.todo;

  useEffect(() => {
    checkStorage();
  }, []);

  const sortItems = [
    {label: 'Defined earlier (default)', value: 'defEarlier', id: 6},
    {label: 'Defined later', value: 'defLater', id: 7},
    {label: 'Importance', value: 'importance', id: 1},
    {label: 'Less time to deadline', value: 'less', id: 2},
    {label: 'Most time to deadline', value: 'most', id: 3},
    {label: 'No deadLine tasks', value: 'no', id: 4},
    {label: 'Not Done tasks', value: 'notDone', id: 5},
  ];

  return (
    <HomesLayout
      title="MY TO DO LIST"
      footer={<AddBtn navigation={props.navigation} color="blue" />}
      rightProps={props}
      color={colors}>
      <DropdownComponent
        placeholder="Sort and filter"
        categoryList={sortItems}
        setDDvalue={sortManager}
        colors={colors}
      />
      <TitleContainer color={colors.main}>
        <TitleText1 color={colors.textColor}>Title</TitleText1>
        <TitleText2 color={colors.textColor}>Importance</TitleText2>
        <TitleText3 color={colors.textColor}>Status</TitleText3>
      </TitleContainer>
      {getTodoList.length == 0 ? (
        <NoContent />
      ) : (
        <FlatList
          data={sortList}
          keyExtractor={task => task._id}
          renderItem={task => (
            <View>
              <TouchableOpacity
                onPress={() => {
                  props.navigation.navigate('INFO', {
                    id: task.item._id,
                    colors,
                  });
                }}>
                <TodoContent task={task} colors={colors} />
              </TouchableOpacity>
            </View>
          )}
        />
      )}
    </HomesLayout>
  );
};

export default TodoHomeScreen;
