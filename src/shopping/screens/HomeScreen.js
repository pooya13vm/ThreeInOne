import React, {useState, useContext, useEffect} from 'react';
import {View, StyleSheet, FlatList} from 'react-native';
import HomesLayout from '../../components/HomesLayout';
import {Input, Button} from '@rneui/themed';
import DropdownComponent from '../../components/DropDown';
import ShoppingContent from '../components/ShoppingContent';
import NoContent from '../../components/NoContent';
import {ShoppingContext} from '../../contexts/shoppingContext';
import Overlay from '../../components/Overlay';
import AddBtn from '../components/AddBtn';
import {MainContext} from '../../contexts/mainContext';
import styled from 'styled-components';
import MySnackbar from '../../components/Snackbar';

const ButtonContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
  margin-top: 30px;
  margin-horizontal: 30px;
`;
const InputContainer = styled.View`
  margin-horizontal: 20px;
`;

const ShoppingHomeScreen = props => {
  const [visible, setVisible] = useState(false);
  const [snackbarVisible, setSnackbarVisible] = useState(false);
  const {saveList, listOfLists, checkStorage, storeList, checkStoreStorage} =
    useContext(ShoppingContext);
  const {AllColors} = useContext(MainContext);
  let colors = AllColors.shopping;

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
      <Overlay visibility={visible} setVisibility={setVisible} colors={colors}>
        <View style={{padding: 20}}>
          <InputContainer>
            <Input
              labelStyle={{color: colors.textColor}}
              style={{color: colors.textColor}}
              label="List name:  *"
              placeholder="Example :For Office "
              placeholderTextColor={colors.main}
              inputStyle={{color: colors.main}}
              onChangeText={val => saveName(val)}
            />
          </InputContainer>

          <DropdownComponent
            placeholder="From ..."
            categoryList={storeList}
            setDDvalue={savePlace}
            colors={colors}
          />
          <ButtonContainer>
            <Button
              type="outline"
              buttonStyle={{
                width: '80%',
                backgroundColor: 'transparent',
                borderColor: '#FF84D6',
                borderWidth: 1,
              }}
              title="Cancel"
              titleStyle={{color: colors.textColor}}
              onPress={() => {
                setVisible(false);
                setSnackbarVisible(false);
              }}></Button>
            <Button
              type="outline"
              buttonStyle={{
                width: '80%',
                backgroundColor: 'transparent',
                borderColor: '#FF84D6',
                borderWidth: 1,
              }}
              title="Save"
              titleStyle={{color: colors.textColor}}
              onPress={() => {
                if (name === '') {
                  setSnackbarVisible(true);
                } else {
                  saveList(name, place);
                  setVisible(false);
                  setSnackbarVisible(false);
                }
              }}></Button>
          </ButtonContainer>
        </View>
      </Overlay>
    );
  };

  return (
    <HomesLayout
      title="MY SHOPPING LISTS"
      footer={<AddBtn setVisibility={setVisible} />}
      rightProps={props}
      color={colors}>
      <View style={{marginTop: 20}}>
        {listOfLists.length == 0 ? (
          <NoContent />
        ) : (
          <FlatList
            data={listOfLists}
            keyExtractor={list => list._id}
            renderItem={list => {
              return (
                <ShoppingContent list={list} props={props} colors={colors} />
              );
            }}
          />
        )}
      </View>

      <MyModal />
      <MySnackbar
        snackbarVisible={snackbarVisible}
        setSnackbarVisible={setSnackbarVisible}
        colors={colors}
        text="List name can not leave null"
      />
    </HomesLayout>
  );
};

export default ShoppingHomeScreen;

const styles = StyleSheet.create({});
