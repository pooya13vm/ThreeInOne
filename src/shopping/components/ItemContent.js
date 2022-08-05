import React, {useContext} from 'react';
import {TouchableOpacity} from 'react-native';
import {CheckBox, Icon} from '@rneui/themed';
import {ShoppingContext} from '../../contexts/shoppingContext';
import styled from 'styled-components';

const Container = styled.View`
  margin: 8px;
  padding: 8px;
  border-radius: 8px;
  flex-direction: row;
  align-items: center;
  border-left-width: 5px;
  border-left-color: ${props => props.color};
`;
const DeleteIcon = styled.View`
  width: 30%;
  align-items: flex-start;
`;
const TextContainer = styled.View`
  width: 62%;
`;
const Title = styled.Text`
  font-size: 16px;
  font-weight: bold;
  color: ${props => props.color};
`;
const Info = styled.Text`
  color: #ff84d6;
  font-size: 14px;
`;

const ItemContent = ({shopItem, parentIndex, colors}) => {
  const {setListOfLists, listOfLists, saveToStorage} =
    useContext(ShoppingContext);
  const list = listOfLists[parentIndex].listArray;
  const id = shopItem.id;
  const targetItem = list.filter(item => item.id == id);
  const indexOfTarget = list.findIndex(item => item.id == id);

  const tickEvent = () => {
    let check = !targetItem[0].itemBuy;
    const copyList = [...list];
    const allListsCopy = [...listOfLists];
    if (check) {
      targetItem[0].itemBuy = true;
      const newList = copyList.filter(item => item.id !== id);
      newList.push(targetItem[0]);
      allListsCopy[parentIndex].listArray = newList;
      setListOfLists(allListsCopy);
      saveToStorage(allListsCopy);
    } else {
      targetItem[0].itemBuy = false;
      copyList[indexOfTarget] = targetItem[0];
      allListsCopy[parentIndex].listArray = copyList;
      setListOfLists(allListsCopy);
      saveToStorage(allListsCopy);
    }
  };

  const deleteItem = () => {
    const copyList = [...list];
    const newList = copyList.filter(item => item.id !== id);
    const allListsCopy = [...listOfLists];
    allListsCopy[parentIndex].listArray = newList;
    setListOfLists(allListsCopy);
    saveToStorage(allListsCopy);
  };
  let title = shopItem.itemName;
  if (title.length > 17) {
    title = `${title.slice(0, 17)}...`;
  }

  return (
    <Container color={colors.main}>
      <DeleteIcon>
        <TouchableOpacity onPress={() => deleteItem()}>
          <Icon name="trash" type="entypo" color={colors.textColor} size={22} />
        </TouchableOpacity>
      </DeleteIcon>

      <TextContainer>
        <Title color={colors.textColor}>{title}</Title>
        <Info>{shopItem.itemInfo}</Info>
      </TextContainer>
      <CheckBox
        checked={targetItem[0].itemBuy}
        checkedColor="#FF84D6"
        uncheckedColor="#FF84D6"
        onPress={() => {
          tickEvent();
        }}
        containerStyle={{
          padding: 0,
          backgroundColor: 'transparent',
        }}
      />
    </Container>
  );
};

export default ItemContent;
