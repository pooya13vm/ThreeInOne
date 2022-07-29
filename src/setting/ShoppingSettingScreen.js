import React, {useContext} from 'react';
import {Text, StyleSheet, FlatList, View} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {Title, TextInput, Button} from 'react-native-paper';
import {SafeAreaView} from 'react-native-safe-area-context';
import {ShoppingContext} from '../contexts/shoppingContext';

const ShoppingSettingScreen = () => {
  const {storeName, setStoreName, storeList, addToList, deleteFromList} =
    useContext(ShoppingContext);

  return (
    <SafeAreaView style={styles.container}>
      <Title style={{fontWeight: 'bold'}}>Category Setting</Title>
      <Text style={styles.definition}>
        Here you can define and manage the store places
      </Text>
      <TextInput
        style={{height: 50, width: '90%'}}
        mode="flat"
        label="New Store"
        selectionColor="gray"
        activeOutlineColor="gray"
        underlineColor="gary"
        onChangeText={val => setStoreName(val)}
        value={storeName}
      />
      <Button mode="contained" onPress={addToList} style={{marginTop: 20}}>
        Add to store list
      </Button>
      <View style={styles.listContainer}>
        <View
          style={{
            borderBottomColor: 'gray',
            borderBottomWidth: 1,
            width: '100%',
          }}>
          <Text style={{fontSize: 16}}>Store List</Text>
        </View>

        <FlatList
          data={storeList}
          keyExtractor={item => item.id}
          renderItem={cat => (
            <View style={styles.item}>
              <Text style={{fontSize: 16, color: 'gray'}}>
                {cat.item.label}
              </Text>
              <TouchableOpacity
                onPress={() => deleteFromList(cat.item.id)}
                style={{
                  backgroundColor: 'gray',
                  padding: 8,
                  borderRadius: 25,
                }}>
                <Text>X</Text>
              </TouchableOpacity>
            </View>
          )}
        />
      </View>
    </SafeAreaView>
  );
};

export default ShoppingSettingScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    margin: 15,
    padding: 20,
  },
  definition: {
    marginHorizontal: 30,
    marginVertical: 40,
    textAlign: 'center',
    color: 'gray',
  },
  listContainer: {
    marginTop: 30,
    width: '80%',
    borderWidth: 1,
    borderColor: 'gray',
    padding: 20,
    borderRadius: 3,
    minHeight: '40%',
  },
  item: {
    marginTop: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});
