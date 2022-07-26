import React from 'react';
import {Modal, Alert, StyleSheet, View} from 'react-native';

const Overlay = ({children, visibility, setVisibility}) => {
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visibility}
      onRequestClose={() => {
        Alert.alert('Modal has been closed.');
        setVisibility(!visibility);
      }}>
      <View style={styles.centeredView}>
        <View style={styles.modalView}>{children}</View>
      </View>
    </Modal>
  );
};

export default Overlay;
const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalView: {
    width: '75%',
    height: '35%',
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 15,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.5,
    shadowRadius: 4,
    elevation: 5,
  },
});
