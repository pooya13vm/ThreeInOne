// import React, {useCallback, useContext} from 'react';
import {Text, FlatList, TouchableOpacity, View} from 'react-native';
// import {Button} from '@rneui/themed';
// import {useFocusEffect} from '@react-navigation/native';
// import Layout from '../app/components/layout';
// import NoteContent from '../app/components/noteContent';
// import {NoteContext} from '../app/contexts/noteContext';

const HomeScreen = () => {
  return (
    <View>
      <Text>hiiiiii</Text>
    </View>
  );
};
export default HomeScreen;

// const {notes, setNotes} = useContext(NoteContext);

// useFocusEffect(
//   useCallback(() => {
//     setNotes(notes);
//   }, [notes]),
// );

// <Layout
//   title="MY NOTES"
//   footer={
//     <Button
//       onPress={() => props.navigation.navigate('ADD')}
//       title="Add new note"
//       buttonStyle={{
//         height: '100%',
//         backgroundColor: 'rgba(127, 220, 103, 1)',
//       }}
//       titleStyle={{fontWeight: 'bold', fontSize: 32, color: 'white'}}
//       containerStyle={{
//         width: '100%',
//       }}>
//       <Text>Add new note</Text>
//     </Button>
//   }
//   left="l"
//   right="r">
//   <FlatList
//     data={notes}
//     keyExtractor={note => note.id}
//     renderItem={note => (
//       <TouchableOpacity
//         onPress={() => {
//           props.navigation.navigate('Update', {id: note.id});
//         }}>
//         <NoteContent note={note} />
//       </TouchableOpacity>
//     )}
//   />
// </Layout>
