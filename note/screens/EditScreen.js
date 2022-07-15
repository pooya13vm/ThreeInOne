import React from 'react';
import {useContext} from 'react';
import {Button, Input} from '@rneui/base';
import {View, Text, StyleSheet, TextInput} from 'react-native';
import Layout from '../../components/layout';
import {NoteContext} from '../../contexts/noteContext';

const EditScreen = props => {
  const {
    updateListAfterEdit,
    EditingContentValue,
    setEditingContentValue,
    EditingTitleValue,
    setEditingTitleValue,
  } = useContext(NoteContext);

  return (
    <Layout
      title="ADD NOTE new"
      footer={
        <View style={styles.Buttons}>
          <Button
            onPress={() => props.navigation.navigate('Home')}
            buttonStyle={{
              height: '100%',
              backgroundColor: 'rgba(214, 61, 57, 1)',
            }}
            containerStyle={{width: '50%'}}>
            <Text>Cancel</Text>
          </Button>
          <Button
            onPress={() => updateListAfterEdit(props)}
            title="Save note"
            buttonStyle={{
              height: '100%',
              backgroundColor: 'rgba(127, 220, 103, 1)',
            }}
            containerStyle={{
              width: '50%',
            }}
            titleStyle={{fontWeight: 'bold', fontSize: 32, color: 'white'}}>
            <Text>Save Note</Text>
          </Button>
        </View>
      }
      left="l"
      right="r">
      <View>
        <View>
          <Text style={{fontSize: 24, fontWeight: 'bold'}}>Title : </Text>
          <Input
            value={EditingTitleValue}
            onChangeText={val => setEditingTitleValue(val)}
            style={{fontWeight: 'bold'}}></Input>
        </View>
        <View>
          <Text style={{fontSize: 22, fontWeight: 'bold'}}>Note : </Text>
          <TextInput
            multiline
            style={{
              backgroundColor: '#FCFAED',
              height: '85%',
              textAlignVertical: 'top',
              padding: 20,
              fontSize: 18,
              marginTop: 5,
              borderRadius: 3,
            }}
            value={EditingContentValue}
            onChangeText={val => setEditingContentValue(val)}></TextInput>
        </View>
      </View>
    </Layout>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  Buttons: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    width: '100%',
    height: '100%',
  },
});
export default EditScreen;
