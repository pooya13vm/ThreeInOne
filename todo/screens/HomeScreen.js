import React, {useEffect, useContext} from 'react';
import {View, Text, TouchableOpacity, StyleSheet, FlatList} from 'react-native';
import HomesLayout from '../../components/homesLayout';
import AddBtn from '../../components/AddBtn';
import DropdownComponent from '../../components/dropDown';
import {TodoContext} from '../../contexts/todoContext';
import NoContent from '../../components/NoContent';
import {Icon} from '@rneui/themed';
import TodoContent from '../../components/TodoContent';

const TodoHomeScreen = props => {
  const {checkStorage, getTodoList} = useContext(TodoContext);
  // useEffect(() => checkStorage(), []);

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
        // categoryList={categoryList}
        // setDDvalue={filteredCategory}
      />
      {getTodoList.length == 0 ? (
        <NoContent />
      ) : (
        <FlatList
          data={getTodoList}
          keyExtractor={task => task._id}
          renderItem={task => (
            <View>
              <TouchableOpacity style={styles.content}>
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
