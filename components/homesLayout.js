import React from 'react';
import {Text, View, StyleSheet, StatusBar} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {Icon} from '@rneui/base';
import {TouchableOpacity} from 'react-native-gesture-handler';

const HomesLayout = ({children, left, right, title, footer}) => {
  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity style={styles.headerLeft}>
            <Icon name="moon" type="entypo" size={28} />
          </TouchableOpacity>
          <View style={styles.titleContainer}>
            <Text>{title}</Text>
          </View>
          <TouchableOpacity style={styles.headerRight}>
            <Icon name="cog" type="entypo" size={28} />
          </TouchableOpacity>
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
  },
  header: {
    height: 50,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerLeft: {
    marginLeft: '10%',
    // marginRight: '10%',
  },
  headerRight: {
    marginRight: '20%',
    alignItems: 'flex-end',
  },
  titleContainer: {
    marginLeft: '10%',
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
