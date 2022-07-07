import React from 'react';
import {Text} from 'react-native';
import {Card} from '@rneui/base';

const NoteContent = ({note}) => {
  return (
    <Card>
      <Card.Title>{note.item.title}</Card.Title>
      <Text>{note.item.content}</Text>
    </Card>
  );
};
export default NoteContent;
