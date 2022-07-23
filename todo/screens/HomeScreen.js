import React, {useEffect, useContext} from 'react';
import {View, Text, TouchableOpacity, StyleSheet, FlatList} from 'react-native';
import HomesLayout from '../../components/homesLayout';
import AddBtn from '../../components/AddBtn';
import DropdownComponent from '../../components/dropDown';
import {TodoContext} from '../../contexts/todoContext';
import NoContent from '../../components/NoContent';
import {Icon} from '@rneui/themed';
import TodoContent from '../../components/TodoContent';
import ColorsGuide from '../components/colorsGuide';

const TodoHomeScreen = props => {
  const {checkStorage, getTodoList, sortManager} = useContext(TodoContext);

  useEffect(() => {
    checkStorage();
  }, []);

  const sortItems = [
    {label: 'Importance', value: 'importance', id: 1},
    {label: 'Less time to deadline', value: 'less', id: 2},
    {label: 'Most time to deadline', value: 'most', id: 3},
    {label: 'No deadLine first', value: 'no', id: 4},
    {label: 'Done tasks first', value: 'done', id: 5},
    {label: 'Definition (earlier)', value: 'defEarlier', id: 6},
    {label: 'Definition (later)', value: 'defLater', id: 7},
  ];

  return (
    <HomesLayout
      title="MY TO DO LIST"
      footer={<AddBtn navigation={props.navigation} color="blue" />}
      rightProps={props}
      targetScreen="SETTING"
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <DropdownComponent
        placeholder="Sort by ..."
        categoryList={sortItems}
        setDDvalue={sortManager}
      />
      <ColorsGuide />
      {getTodoList.length == 0 ? (
        <NoContent />
      ) : (
        <FlatList
          data={getTodoList}
          keyExtractor={task => task._id}
          renderItem={task => (
            <View>
              <TouchableOpacity
                style={styles.content}
                onPress={() => {
                  props.navigation.navigate('INFO', {id: task.item._id});
                }}>
                <TodoContent task={task} />
              </TouchableOpacity>
            </View>
          )}
        />
      )}
    </HomesLayout>
  );
};

export default TodoHomeScreen;

const styles = StyleSheet.create({
  content: {
    flex: 2,
  },
  delete: {
    justifyContent: 'center',
    padding: 4,
    backgroundColor: 'red',
    borderRadius: 50,
    height: 80,
    marginTop: 10,
  },
});
{
}
