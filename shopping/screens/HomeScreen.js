import React, {useState, useContext, useEffect} from 'react';
import {View, StyleSheet, FlatList} from 'react-native';
import HomesLayout from '../../components/homesLayout';
import {Input, Button} from '@rneui/themed';
import DropdownComponent from '../../components/dropDown';
import {ShoppingContext} from '../../contexts/shoppingContext';
import NoContent from '../../components/NoContent';
import ShoppingContent from '../../components/ShoppingContent';
import Overlay from '../../components/Overlay';
import AddBtn from '../components/AddBtn';

const ShoppingHomeScreen = props => {
  const [visible, setVisible] = useState(false);
  const {saveList, listOfLists, checkStorage, storeList, checkStoreStorage} =
    useContext(ShoppingContext);

  useEffect(() => {
    checkStorage();
    checkStoreStorage();
  }, []);

  let name = '';
  const saveName = val => {
    name = val;
  };
  let place = '';
  const savePlace = val => {
    place = val;
  };

  const MyModal = () => {
    return (
      <Overlay visibility={visible} setVisibility={setVisible}>
        <Input
          label="List name:"
          placeholder="Example :For Office "
          onChangeText={val => saveName(val)}
        />
        <DropdownComponent
          placeholder="From ..."
          categoryList={storeList}
          setDDvalue={savePlace}
        />
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginTop: 30,
            marginHorizontal: 30,
          }}>
          <Button
            buttonStyle={{backgroundColor: 'red', width: '80%'}}
            onPress={() => setVisible(false)}>
            Cancel
          </Button>
          <Button
            buttonStyle={{backgroundColor: 'green', width: '80%'}}
            onPress={() => {
              saveList(name, place);
              setVisible(false);
            }}>
            Save
          </Button>
        </View>
      </Overlay>
    );
  };
  return (
    <HomesLayout
      title="MY SHOPPING LISTS"
      footer={<AddBtn setVisibility={setVisible} />}
      rightProps={props}
      targetScreen="SETTING">
      {listOfLists.length == 0 ? (
        <NoContent />
      ) : (
        <FlatList
          data={listOfLists}
          keyExtractor={list => list._id}
          //in renderItem the note param return an object that the ".item" include the param
          renderItem={list => {
            return <ShoppingContent list={list} props={props} />;
          }}
        />
      )}
      <MyModal />
    </HomesLayout>
  );
};

export default ShoppingHomeScreen;

const styles = StyleSheet.create({});
