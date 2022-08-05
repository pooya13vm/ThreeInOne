import React, {useContext} from 'react';
import {TouchableOpacity} from 'react-native';
import {Icon} from '@rneui/base';
import styled from 'styled-components';

const Container = styled.View`
  background-color: ${props => props.bg};
  padding: 8px;
  margin: 8px;
  border-width: 1px;
  border-radius: 5px;
  border-color: ${props => props.color};
  flex-direction: row;
  justify-content: space-between;
  height: 70px;
  align-items: center;
`;
const Title = styled.Text`
  color: ${props => props.color};
  font-size: 18px;
  font-weight: bold;
  width: 25%;
`;
const Text = styled.Text`
  color: #bd629f;
  font-size: 14px;
  font-weight: bold;
`;
const IconContainer = styled.View`
  border-color: ${props => props.color};
  padding: 10px;
  border-radius: 20px;
  border-width: 1px;
`;

const ShoppingContent = ({list, props, colors}) => {
  return (
    <TouchableOpacity
      onPress={() =>
        props.navigation.navigate('SHOPPLIST', {id: list.item._id})
      }>
      <Container color={colors.main} bg={colors.background}>
        <Title color={colors.textColor}>{list.item.name}</Title>
        <Text>{list.item.place}</Text>
        <Text>{`${list.item.listArray.length} item`}</Text>
        <IconContainer color={colors.main}>
          <Icon
            name="chevron-right"
            type="entypo"
            color={colors.textColor}
            size={16}
          />
        </IconContainer>
      </Container>
    </TouchableOpacity>
  );
};

export default ShoppingContent;
