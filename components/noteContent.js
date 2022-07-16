import React, {useContext} from 'react';
import {Text} from 'react-native';
import {Card} from '@rneui/themed';

const NoteContent = ({note}) => {
  return (
    <Card>
      <Card.Title>{note.item.title}</Card.Title>
      <Text>{note.item.content}</Text>
      <Text>{note.item.category}</Text>
    </Card>
  );
};
export default NoteContent;
