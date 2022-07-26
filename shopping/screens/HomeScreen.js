import React, {useState, useContext} from 'react';
import {View, StyleSheet, FlatList, TouchableOpacity} from 'react-native';
import HomesLayout from '../../components/homesLayout';
import {Button, Icon} from '@rneui/base';
import {Input} from '@rneui/themed';
import DropdownComponent from '../../components/dropDown';
import {ShoppingContext} from '../../contexts/shoppingContext';
import NoContent from '../../components/NoContent';
import ShoppingContent from '../../components/ShoppingContent';
import Overlay from '../../components/Overlay';
import AddBtn from '../components/AddBtn';

const ShoppingHomeScreen = props => {
  const [visible, setVisible] = useState(false);

  let name = '';
  const saveName = val => {
    name = val;
  };
  let place = '';
  const savePlace = val => {
    place = val;
  };

  const {saveList, listOfLists} = useContext(ShoppingContext);

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
          categoryList={[
            {label: 'Walmart', value: 'walmart', id: 7},
            {label: 'Costco', value: 'costco', id: 7},
            {label: 'Amazon', value: 'amazon', id: 7},
          ]}
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
      // targetScreen="SETTING"
    >
      {listOfLists.length == 0 ? (
        <NoContent />
      ) : (
        <FlatList
          data={listOfLists}
          keyExtractor={list => list._id}
          //in renderItem the note param return an object that the ".item" include the param
          renderItem={list => {
            return (
              <TouchableOpacity
                onPress={() =>
                  props.navigation.navigate('SHOPPLIST', {id: list.item._id})
                }>
                <ShoppingContent list={list} />
              </TouchableOpacity>
            );
          }}
        />
      )}
      <MyModal />
    </HomesLayout>
  );
};

export default ShoppingHomeScreen;

const styles = StyleSheet.create({});
