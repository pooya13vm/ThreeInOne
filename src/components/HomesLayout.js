import React from 'react';
import {Text, View, StyleSheet} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {Icon} from '@rneui/base';
import {TouchableOpacity} from 'react-native-gesture-handler';
import SettingIcon from '../setting/SettingIcon';

const HomesLayout = ({children, title, footer, rightProps}) => {
  console.log(rightProps);
  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={styles.container}>
        <View style={styles.header}>
          <View style={styles.titleContainer}>
            <Text style={{fontSize: 20, fontWeight: 'bold', color: '#ffffff'}}>
              {title}
            </Text>
          </View>
          <SettingIcon props={rightProps} />
        </View>
        <View style={styles.body}>
          <View style={{height: '100%'}}>{children}</View>
          <View style={styles.footer}>{footer}</View>
        </View>
      </View>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  container: {
    justifyContent: 'space-between',
    backgroundColor: '#2F5B7D',
    // backgroundColor: '#1A212D',
  },
  header: {
    height: 50,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderTopWidth: 5,
    borderTopColor: '#4e97ce',
  },
  headerLeft: {
    marginLeft: '10%',
  },
  headerRight: {
    marginRight: '20%',
    alignItems: 'flex-end',
  },
  titleContainer: {
    marginLeft: '10%',
    backgroundColor: '#4e97ce',
    height: '100%',
    paddingHorizontal: 10,
    justifyContent: 'center',
    borderBottomEndRadius: 8,
    borderBottomStartRadius: 8,
  },
  body: {
    flexShrink: 2,
    paddingHorizontal: 15,
    flexGrow: 0,
    flexShrink: 1,
    flexBasis: 'auto',
  },
  footer: {
    position: 'absolute',
    right: 20,
    bottom: 30,
    width: 50,
    zIndex: 100,
    opacity: 0.9,
    borderWidth: 2,
    borderRadius: 50,
  },
});
export default HomesLayout;
