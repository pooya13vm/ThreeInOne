import React from 'react';
import styled from 'styled-components';

const Container = styled.View`
  border-width: 1px;
  width: 100%;
  border-color: #4e97ce;
  border-radius: 8px;
  padding: 12px;
`;
const Title = styled.Text`
  font-size: 18px;
  color: #2f5b7d;
  font-weight: bold;
  margin-bottom: 12px;
`;
const CategoryText = styled.Text`
  font-size: 15px;
  color: #4e97ce;
  margin-bottom: 12px;
`;
const DateText = styled.Text`
  font-size: 12px;
  color: #4e97ce;
`;
const NoteContent = ({note}) => {
  return (
    <Container>
      <Title>{note.item.title}</Title>
      <CategoryText>{note.item.category}</CategoryText>
      <DateText style={{}}>{note.item.date}</DateText>
    </Container>
  );
};
export default NoteContent;
