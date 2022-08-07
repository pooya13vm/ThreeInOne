import React, {useContext, useState} from 'react';
import {FlatList} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {Button} from '@rneui/themed';
import {SafeAreaView} from 'react-native-safe-area-context';
import {NoteContext} from '../contexts/noteContext';
import {Icon} from '@rneui/base';
import styled from 'styled-components';
import {MainContext} from '../contexts/mainContext';
import MySnackbar from '../components/Snackbar';

const Container = styled.View`
  justify-content: flex-start;
  align-items: center;
  margin: 15px;
  padding: 20px;
`;
const Title = styled.Text`
  font-weight: bold;
  font-size: 22px;
  color: ${props => props.color};
  margin-top: 20px;
`;
const Definition = styled.Text`
  margin-horizontal: 30px;
  margin-vertical: 40px;
  text-align: center;
  color: ${props => props.color};
`;
const TextInput = styled.TextInput`
  height: 50px;
  width: 80%;
  border-width: 1px;
  border-radius: 5px;
  padding-horizontal: 10px;
  border-color: ${props => props.color};
`;
const ListContainer = styled.View`
  margin-top: 30px;
  width: 80%;
  border-width: 1px;
  border-color: ${props => props.color};
  padding: 20px;
  border-radius: 3px;
  min-height: 40%;
`;
const TitleContainer = styled.View`
  border-bottom-color: gray;
  border-bottom-width: 1px;
  width: 100%;
`;
const ListTitleText = styled.Text`
  font-size: 16px;
  margin-bottom: 5px;
  color: ${props => props.color};
`;
const ListItemContainer = styled.View`
  margin-top: 8px;
  flex-direction: row;
  justify-content: space-between;
`;
const ListItemText = styled.Text`
  font-size: 16px;
  color: ${props => props.color};
`;
const ListIconContainer = styled.TouchableOpacity`
  background-color: ${props => props.color};
  padding-horizontal: 8px;
  padding-vertical: 5px;
  border-radius: 25px;
`;
const ListIcon = styled.Text`
  color: ${props => props.color};
`;
const BackBtnContainer = styled.View`
  border-width: 1px;
  margin-top: 20px;
  border-radius: 30px;
  padding: 10px;
  border-color: ${props => props.color};
`;

const NoteSettingScreen = ({navigation}) => {
  const {
    categoryList,
    getCategory,
    setCategory,
    addToCategory,
    deleteCategory,
  } = useContext(NoteContext);
  let category = [...categoryList];
  category.shift();
  const {AllColors} = useContext(MainContext);
  const colors = AllColors.note;
  const [snackbarVisibility, setSnackbarVisibility] = useState(false);

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: colors.background}}>
      <Container>
        <Title color={colors.textColor}>Category Setting</Title>
        <Definition color={colors.main}>
          Here you can define and manage the notes category
        </Definition>
        <TextInput
          color={colors.textColor}
          placeholder="New Category"
          selectionColor={colors.textColor}
          placeholderTextColor={colors.textColor}
          onChangeText={val => {
            setSnackbarVisibility(false);
            setCategory(val);
          }}
          value={getCategory}
          autoFocus
        />
        <Button
          type="outline"
          onPress={() => {
            if (getCategory === '') {
              setSnackbarVisibility(true);
            } else {
              addToCategory();
              setSnackbarVisibility(false);
            }
          }}
          style={{marginTop: 20}}
          titleStyle={{fontSize: 18, fontWeight: 'bold', color: colors.main}}
          buttonStyle={{borderWidth: 1, borderColor: colors.main}}>
          Add to category list
        </Button>
        <ListContainer color={colors.main}>
          <TitleContainer>
            <ListTitleText color={colors.textColor}>
              Category List
            </ListTitleText>
          </TitleContainer>

          <FlatList
            data={category}
            keyExtractor={item => item.id}
            renderItem={cat => (
              <ListItemContainer>
                <ListItemText color={colors.textColor}>
                  {cat.item.label}
                </ListItemText>
                <ListIconContainer
                  onPress={() => deleteCategory(cat.item.id)}
                  color={colors.textColor}>
                  <ListIcon color={colors.background}>X</ListIcon>
                </ListIconContainer>
              </ListItemContainer>
            )}
          />
        </ListContainer>
        <BackBtnContainer color={colors.textColor}>
          <TouchableOpacity
            onPress={() => {
              setSnackbarVisibility(false);
              navigation.goBack();
            }}>
            <Icon
              name="arrow-left"
              type="entypo"
              size={26}
              color={colors.textColor}
            />
          </TouchableOpacity>
        </BackBtnContainer>
      </Container>
      <MySnackbar
        snackbarVisible={snackbarVisibility}
        setSnackbarVisible={setSnackbarVisibility}
        colors={colors}
        text="The name input can not be null"
      />
    </SafeAreaView>
  );
};

export default NoteSettingScreen;
