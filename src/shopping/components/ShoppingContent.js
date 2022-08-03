import React, {useContext} from 'react';
import {TouchableOpacity} from 'react-native';
import {Icon} from '@rneui/base';
import {ShoppingContext} from '../../contexts/shoppingContext';
import styled from 'styled-components';

const Container = styled.View`
  background-color: white;
  padding: 8px;
  margin: 8px;
  border-width: 1px;
  border-radius: 5px;
  border-color: #ff84d6;
  flex-direction: row;
  justify-content: space-between;
  height: 70px;
  align-items: center;
`;
const Title = styled.Text`
  color: #705c69;
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
  border-color: #ff84d6;
  padding: 10px;
  border-radius: 20px;
  border-width: 1px;
`;

const ShoppingContent = ({list, props}) => {
  const {deleteList} = useContext(ShoppingContext);
  return (
    <TouchableOpacity
      onPress={() =>
        props.navigation.navigate('SHOPPLIST', {id: list.item._id})
      }>
      <Container>
        <Title>{list.item.name}</Title>
        <Text>{list.item.place}</Text>
        <Text>{`${list.item.listArray.length} item`}</Text>
        <IconContainer>
          <Icon
            name="chevron-right"
            type="entypo"
            color={'#705C69'}
            size={16}
          />
        </IconContainer>

        {/* <TouchableOpacity
          onPress={() => deleteList(list.item._id)}
          style={{padding: 3}}>
          <Icon name="trash" type="entypo" color="red" size={20} />
        </TouchableOpacity> */}
      </Container>
    </TouchableOpacity>
  );
};

export default ShoppingContent;
