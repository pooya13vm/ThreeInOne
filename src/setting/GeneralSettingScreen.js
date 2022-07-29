import React, {useContext, useState} from 'react';
import {Text, StyleSheet, FlatList, View} from 'react-native';
import {Title, Button} from 'react-native-paper';
import {SafeAreaView} from 'react-native-safe-area-context';
import DropdownComponent from '../components/DropDown';
import {MainContext} from '../contexts/mainContext';

const GeneralSettingScreen = () => {
  const [typeText, setTypeText] = useState('');
  const {setTabType} = useContext(MainContext);

  const typeList = [
    {label: 'Note - To do list - Shopping list', value: 'NTS', id: 1},
    {label: 'Note - Shopping list - To do list', value: 'NST', id: 2},
    {label: 'Shopping list - To do list - Note', value: 'STN', id: 3},
    {label: 'Shopping list - Note - To do list', value: 'SNT', id: 4},
    {label: 'To do list - Shopping list - Note', value: 'TSN', id: 5},
    {label: 'To do list - Note - Shopping list', value: 'TNS', id: 6},
  ];

  const applyChange = () => {
    setTabType(typeText);
  };

  return (
    <SafeAreaView style={styles.container}>
      <Title style={{fontWeight: 'bold'}}>General Setting</Title>
      <Text style={styles.definition}>You can specify the order here</Text>
      <View style={{width: '100%'}}>
        <DropdownComponent
          placeholder="Select Type"
          categoryList={typeList}
          setDDvalue={setTypeText}
        />
      </View>

      <Button
        mode="contained"
        style={{marginTop: 20}}
        onPress={() => applyChange()}>
        Apply
      </Button>
    </SafeAreaView>
  );
};

export default GeneralSettingScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    margin: 15,
    padding: 20,
    backgroundColor: 'yellow',
  },
  definition: {
    marginHorizontal: 30,
    marginVertical: 40,
    textAlign: 'center',
    color: 'gray',
  },
});
