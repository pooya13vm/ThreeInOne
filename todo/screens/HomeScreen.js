import React from 'react';
import {View, Text} from 'react-native';
import HomesLayout from '../../components/homesLayout';
import AddBtn from '../../components/AddBtn';
import DropdownComponent from '../../components/dropDown';

const TodoHomeScreen = props => {
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
      <Text>todo HomeScreen</Text>
    </HomesLayout>
  );
};

export default TodoHomeScreen;
