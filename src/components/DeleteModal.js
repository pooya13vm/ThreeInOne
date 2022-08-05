import React from 'react';
import Overlay from './Overlay';
import {Icon} from '@rneui/base';
import {Button} from 'react-native-paper';
import styled from 'styled-components';

const Container = styled.View`
  padding: 40px;
  border-radius: 10px;
  justify-content: center;
  align-items: center;
  background-color: ${props => props.color};
`;
const Title = styled.Text`
  font-size: 20px;
  color: ${props => props.color};
  font-weight: bold;
  margin-vertical: 24px;
`;
const ItemText = styled.Text`
  font-size: 20px;
  color: ${props => props.color};
  font-weight: bold;
`;
const ButtonContainer = styled.View`
  flex-direction: row;
  margin-top: 50px;
  justify-content: center;
  align-items: center;
`;

const DeleteModal = ({
  colors,
  visibility,
  setVisibility,
  item,
  props,
  deleteHandler,
  listId,
}) => {
  let navigatePage = 'Home';
  if (props.route.name === 'EDIT') navigatePage = 'NoteHome';
  if (props.route.name === 'SHOPPLIST') navigatePage = 'ShoppingHome';
  let id = listId ? listId : props.route.params.id;
  return (
    <Overlay visibility={visibility} setVisibility={setVisibility}>
      <Container color={colors.background}>
        <Icon type="entypo" name="warning" size={36} color={colors.textColor} />
        <Title color={colors.textColor}>Are you sure to delete</Title>
        <ItemText color={colors.main}>{item}</ItemText>
        <ButtonContainer>
          <Button
            mode="outlined"
            labelStyle={{
              fontSize: 16,
              color: colors.textColor,
              fontWeight: 'bold',
            }}
            style={{
              marginHorizontal: 5,
              paddingHorizontal: 20,
              borderWidth: 1,
              borderColor: colors.main,
            }}
            onPress={() => setVisibility(false)}>
            No
          </Button>
          <Button
            mode="outlined"
            labelStyle={{
              fontSize: 16,
              color: colors.textColor,
              fontWeight: 'bold',
            }}
            style={{
              marginHorizontal: 5,
              paddingHorizontal: 20,
              borderWidth: 1,
              borderColor: colors.main,
            }}
            onPress={() => {
              deleteHandler(id);
              setVisibility(false);
              props.navigation.navigate(navigatePage);
            }}>
            Yes
          </Button>
        </ButtonContainer>
      </Container>
    </Overlay>
  );
};

export default DeleteModal;
