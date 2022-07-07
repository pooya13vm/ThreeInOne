import {View, Text} from 'react-native';
import {Card} from '@rneui/base';

const NoteContent = ({note}) => {
  console.log(note);
  return (
    <Card>
      <Card.Title>{note.item.title}</Card.Title>
      <Text>{note.item.content}</Text>
    </Card>
  );
};
export default NoteContent;
