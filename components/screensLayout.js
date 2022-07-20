import React from 'react';
import {Text, View, StyleSheet, StatusBar, Platform} from 'react-native';
import {Button} from '@rneui/base';
import {SafeAreaView} from 'react-native-safe-area-context';
import {Icon} from '@rneui/base';

const ScreensLayout = ({children, left, right, title, props, onPressFun}) => {
  return (
    <View>
      <View style={styles.container}>
        <View style={styles.header}>
          <View style={styles.headerLeft}>
            <Text>{left}</Text>
          </View>
          <View>
            <Text>{title}</Text>
          </View>
          <View style={styles.headerRight}>
            <Text>{right}</Text>
          </View>
        </View>
        <View style={styles.body}>
          <View style={{height: '100%'}}>{children}</View>
        </View>
        <View style={styles.footer}>
          <View style={styles.Buttons}>
            <Button
              onPress={() => props.navigation.navigate('Home')}
              buttonStyle={{
                height: '100%',
                backgroundColor: 'rgba(214, 61, 57, 1)',
              }}
              containerStyle={{width: '50%'}}>
              <Text>Cancel</Text>
            </Button>
            <Button
              onPress={() => onPressFun(props)}
              title="Save note"
              buttonStyle={{
                height: '100%',
                backgroundColor: 'rgba(127, 220, 103, 1)',
              }}
              containerStyle={{
                width: '50%',
              }}
              titleStyle={{fontWeight: 'bold', fontSize: 32, color: 'white'}}>
              <Text>Save</Text>
            </Button>
          </View>
        </View>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    marginTop: Platform.OS == 'android' ? StatusBar.currentHeight : 40,
    justifyContent: 'space-between',
    // flexDirection: 'column',
    alignItems: 'center',
    height: '95%',
  },
  header: {
    flex: 1,
    maxHeight: 50,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'blue',
    width: '100%',
  },
  headerLeft: {
    marginLeft: '10%',
  },
  headerRight: {
    marginRight: '10%',
    alignItems: 'flex-end',
  },
  body: {
    flex: 1,
    paddingHorizontal: 15,
    width: '100%',
  },
  footer: {
    flex: 1,
    maxHeight: 50,
    width: '100%',
  },
  Buttons: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    width: '100%',
    height: '100%',
  },
});
export default ScreensLayout;
