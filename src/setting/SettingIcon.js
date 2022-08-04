import React, {useState, useContext} from 'react';
import {MainContext} from '../contexts/mainContext';
import {Icon} from '@rneui/themed';
import {
  TouchableOpacity,
  Text,
  Modal,
  TouchableWithoutFeedback,
  Switch,
} from 'react-native';
import styled from 'styled-components';

const ModalCenter = styled.TouchableOpacity`
  flex: 1;
  align-items: flex-end;
  width: 100%;
`;

const ModalContainer = styled.ScrollView`
  width: 60%;
`;
const ModalView = styled.View`
  width: 90%;
  right: 10px;
  left: 10px;
  margin-top: 40%;
  background-color: white;
  border-radius: 5px;
  padding: 15px;
  background-color: #e6e6e6;
  shadow-color: #000;
  box-shadow: 5px 5px 2px;
  shadow-opacity: 0.5;
  shadow-radius: 4px;
`;
const MenuItem = styled.TouchableOpacity`
  padding-right: 20px;
  padding-vertical: 15px;
  margin-vertical: 2px;
  border-radius: 10px;
  width: 100%;
  color: #454545;
  background-color: #ffffff;
  padding-horizontal: 10px;
`;
const ThemeContainer = styled.View`
  padding-vertical: 15px;
`;
const SwitchPartContainer = styled.View`
  flex-direction: row;
  margin-top: 12px;
  justify-content: space-around;
  align-items: center;
`;

const Setting = ({props}) => {
  const [visibility, setVisibility] = useState(false);
  // const [isLightMode, setLightMode] = useState(true);

  const {setLightMode, lightMode} = useContext(MainContext);

  const toggleSwitch = () => setLightMode(!lightMode);

  const Overlay = () => {
    return (
      <Modal
        transparent={true}
        visible={visibility}
        onRequestClose={() => {
          Alert.alert('Modal has been closed.');
          setVisibility(!visibility);
        }}>
        <ModalCenter onPressOut={() => setVisibility(false)} activeOpacity={1}>
          <ModalContainer directionalLockEnabled={true}>
            <TouchableWithoutFeedback>
              <ModalView>
                <MenuItem
                  onPress={() => {
                    setVisibility(false);
                    if (props.route.name == 'NoteHome') {
                      props.navigation.navigate('GeneralSettingScreen');
                    } else {
                      props.navigation.jumpTo('Note');
                      props.navigation.navigate('GeneralSettingScreen');
                    }
                  }}>
                  <Text>General Setting</Text>
                </MenuItem>
                <MenuItem
                  onPress={() => {
                    setVisibility(false);
                    if (props.route.name == 'NoteHome') {
                      props.navigation.navigate('NoteSettingScreen');
                    } else {
                      props.navigation.jumpTo('Note');
                      props.navigation.navigate('NoteSettingScreen');
                    }
                  }}>
                  <Text>Note List Setting</Text>
                </MenuItem>
                <MenuItem
                  onPress={() => {
                    setVisibility(false);
                    if (props.route.name == 'ShoppingHome') {
                      console.log(props.route.name);
                      props.navigation.navigate('ShoppingSettingScreen');
                    } else {
                      console.log(props.route.name);
                      props.navigation.jumpTo('Shopping');
                      props.navigation.navigate('ShoppingSettingScreen');
                    }
                  }}>
                  <Text>Shopping List Setting</Text>
                </MenuItem>
                <ThemeContainer>
                  <Text>Theme:</Text>
                  <SwitchPartContainer>
                    <Text>Dark</Text>
                    <Switch
                      trackColor={{false: '#767577', true: '#81b0ff'}}
                      thumbColor={lightMode ? '#f5dd4b' : '#f4f3f4'}
                      ios_backgroundColor="#3e3e3e"
                      onValueChange={toggleSwitch}
                      value={lightMode}
                    />
                    <Text>Light</Text>
                  </SwitchPartContainer>
                </ThemeContainer>
              </ModalView>
            </TouchableWithoutFeedback>
          </ModalContainer>
        </ModalCenter>
      </Modal>
    );
  };

  return (
    <>
      <TouchableOpacity onPress={() => setVisibility(!visibility)}>
        <Icon name="cog" type="entypo" size={28} color="#172D3D" />
      </TouchableOpacity>
      <Overlay />
    </>
  );
};

export default Setting;
