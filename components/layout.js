import React from 'react';
import {Text, View, StyleSheet, StatusBar, SafeAreaView} from 'react-native';

const Layout = ({children, left, right, title, footer}) => {
  return (
    <SafeAreaView style={styles.container}>
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
      <View style={styles.footer}>{footer}</View>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  container: {
    marginTop: StatusBar.currentHeight,
    flex: 1,
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
  },
  headerRight: {
    marginRight: '10%',
    alignItems: 'flex-end',
  },
  body: {
    flex: 1,
    padding: 15,
  },
  footer: {
    backgroundColor: 'green',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
export default Layout;
