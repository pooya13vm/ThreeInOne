import React, {useContext, useState} from 'react';
import {Button} from '@rneui/base';
import {SafeAreaView} from 'react-native-safe-area-context';
import DropdownComponent from '../components/DropDown';
import {MainContext} from '../contexts/mainContext';
import styled from 'styled-components';

const Container = styled.View`
  justify-content: flex-start;
  align-items: center;
  margin: 15px;
  padding: 20px;
`;
const Title = styled.Text`
  font-weight: bold;
  color: ${props => props.color};
  font-size: 22px;
  margin-top: 20px;
`;
const Definition = styled.Text`
  margin-horizontal: 30px;
  margin-vertical: 40px;
  text-align: center;
  color: ${props => props.color};
`;
const DropdownContainer = styled.View`
  width: 100%;
`;

const GeneralSettingScreen = props => {
  const [typeText, setTypeText] = useState('');
  const {setTabType} = useContext(MainContext);
  const colors = {main: '#4E97CE', textColor: '#2F5B7D', background: '#ffffff'};

  const typeList = [
    {label: 'Note - To do - Shopping', value: 'NTS', id: 1},
    {label: 'Note - Shopping - To do', value: 'NST', id: 2},
    {label: 'Shopping - To do - Note', value: 'STN', id: 3},
    {label: 'Shopping - Note - To do', value: 'SNT', id: 4},
    {label: 'To do - Shopping - Note', value: 'TSN', id: 5},
    {label: 'To do - Note - Shopping', value: 'TNS', id: 6},
  ];

  const applyChange = () => {
    setTabType(typeText);
  };

  return (
    <SafeAreaView style={{flex: 1}}>
      <Container>
        <Title color={colors.textColor}>General Setting</Title>
        <Definition color={colors.main}>
          You can specify the layout here
        </Definition>
        <DropdownContainer>
          <DropdownComponent
            placeholder="Select Type"
            categoryList={typeList}
            setDDvalue={setTypeText}
          />
        </DropdownContainer>

        <Button
          title="Apply"
          titleStyle={{color: colors.textColor}}
          type="outline"
          buttonStyle={{
            borderWidth: 1,
            borderColor: colors.textColor,
            paddingHorizontal: 60,
          }}
          style={{marginTop: 20}}
          onPress={() => applyChange()}
        />
        <Button
          title="Back"
          titleStyle={{color: colors.textColor}}
          type="outline"
          buttonStyle={{
            borderWidth: 1,
            borderColor: colors.textColor,
            paddingHorizontal: 60,
          }}
          style={{marginTop: 20}}
          onPress={() => props.navigation.goBack()}
        />
      </Container>
    </SafeAreaView>
  );
};

export default GeneralSettingScreen;
