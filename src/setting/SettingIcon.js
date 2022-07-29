import React, {useState} from 'react';
import {Icon} from '@rneui/themed';
import {
  TouchableOpacity,
  View,
  Text,
  StyleSheet,
  Modal,
  TouchableWithoutFeedback,
  ScrollView,
  Switch,
} from 'react-native';
import ColorsGuide from '../todo/components/colorsGuide';

const Setting = ({props}) => {
  const [visibility, setVisibility] = useState(false);
  const [isLightMode, setLightMode] = useState(true);

  const toggleSwitch = () => setLightMode(previousState => !previousState);

  const Overlay = () => {
    return (
      <Modal
        transparent={true}
        visible={visibility}
        onRequestClose={() => {
          Alert.alert('Modal has been closed.');
          setVisibility(!visibility);
        }}>
        <TouchableOpacity
          style={styles.centeredView}
          onPressOut={() => setVisibility(false)}
          activeOpacity={1}>
          <ScrollView directionalLockEnabled={true} style={styles.modal}>
            <TouchableWithoutFeedback>
              <View style={styles.modalView}>
                <TouchableOpacity
                  style={styles.items}
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
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.items}
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
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.items}
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
                </TouchableOpacity>
                <View style={styles.theme}>
                  <Text>Theme:</Text>
                  <View
                    style={{
                      flexDirection: 'row',
                      marginTop: 12,
                      justifyContent: 'space-around',
                      alignItems: 'center',
                    }}>
                    <Text>Dark</Text>
                    <Switch
                      trackColor={{false: '#767577', true: '#81b0ff'}}
                      thumbColor={isLightMode ? '#f5dd4b' : '#f4f3f4'}
                      ios_backgroundColor="#3e3e3e"
                      onValueChange={toggleSwitch}
                      value={isLightMode}
                    />
                    <Text>Light</Text>
                  </View>
                </View>
              </View>
            </TouchableWithoutFeedback>
          </ScrollView>
        </TouchableOpacity>
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

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    alignItems: 'flex-end',
    width: '100%',
  },
  modal: {width: '60%'},
  modalView: {
    width: '90%',
    right: 10,
    left: 10,
    marginTop: '40%',
    backgroundColor: 'white',
    borderRadius: 5,
    padding: 15,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.5,
    shadowRadius: 4,
  },
  items: {
    paddingRight: 20,
    paddingVertical: 15,
    borderBottomWidth: 1,
    width: '100%',
    borderBottomColor: 'gray',
  },
  theme: {
    paddingVertical: 15,
    width: '100%',
  },
});
