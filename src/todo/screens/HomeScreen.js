import React, {useEffect, useContext} from 'react';
import {View, TouchableOpacity, StyleSheet, FlatList} from 'react-native';
import HomesLayout from '../../components/HomesLayout';
import AddBtn from '../../components/AddBtn';
import DropdownComponent from '../../components/DropDown';
import {TodoContext} from '../../contexts/todoContext';
import NoContent from '../../components/NoContent';
import TodoContent from '../components/TodoContent';
import ColorsGuide from '../components/colorsGuide';

const TodoHomeScreen = props => {
  const {checkStorage, getTodoList, sortManager, sortList} =
    useContext(TodoContext);

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
      targetScreen="SETTING"
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <DropdownComponent
        placeholder="Sort and filter"
        categoryList={sortItems}
        setDDvalue={sortManager}
      />
      <ColorsGuide />
      {getTodoList.length == 0 ? (
        <NoContent />
      ) : (
        <FlatList
          data={sortList}
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
