import React from 'react';
import {Modal, Alert} from 'react-native';
import styled from 'styled-components';

const CenterView = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;
const ModalView = styled.View`
  width: 75%;
  height: 35%;
  background-color: ${props => props.color};
  border-radius: 10px;
  padding: 15px;
  shadow-color: #000;
  shadow-opacity: 0.5;
  shadow-radius: 4px;
  box-shadow: 0px 0px 4px;
`;

const Overlay = ({
  children,
  visibility,
  setVisibility,
  BGColor = '#ffffff',
}) => {
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visibility}
      onRequestClose={() => {
        Alert.alert('Modal has been closed.');
        setVisibility(!visibility);
      }}>
      <CenterView>
        <ModalView color={BGColor}>{children}</ModalView>
      </CenterView>
    </Modal>
  );
};

export default Overlay;