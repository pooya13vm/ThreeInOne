import {Input} from '@rneui/base';
import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import ScreensLayout from '../../components/screensLayout';
import DropdownComponent from '../../components/dropDown';

const AddScreen = props => {
  return (
    <ScreensLayout title="Add a task" left="l" right="r" props={props}>
      <View style={styles.formContainer}>
        <Input label="Task Content" />
        <DropdownComponent
          placeholder="Importance"
          // categoryList={categoryList}
          // setDDvalue={filteredCategory}
        />
      </View>
    </ScreensLayout>
  );
};

export default AddScreen;

const styles = StyleSheet.create({
  formContainer: {
    backgroundColor: 'yellow',
    marginTop: 30,
  },
});
