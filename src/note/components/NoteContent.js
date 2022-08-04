import React from 'react';
import styled from 'styled-components';

const Container = styled.View`
  border-width: 1px;
  width: 100%;
  border-color: ${props => props.color};
  border-radius: 8px;
  padding: 12px;
`;
const Title = styled.Text`
  font-size: 18px;
  color: ${props => props.color};
  font-weight: bold;
  margin-bottom: 12px;
`;
const CategoryText = styled.Text`
  font-size: 15px;
  color: ${props => props.color};
  margin-bottom: 12px;
`;
const DateText = styled.Text`
  font-size: 12px;
  color: ${props => props.color};
`;
const NoteContent = ({note, colors}) => {
  return (
    <Container color={colors.main}>
      <Title color={colors.textColor}>{note.item.title}</Title>
      <CategoryText color={colors.main}>{note.item.category}</CategoryText>
      <DateText color={colors.main}>{note.item.date}</DateText>
    </Container>
  );
};
export default NoteContent;
