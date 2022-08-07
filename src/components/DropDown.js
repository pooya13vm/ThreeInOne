import React, {useState} from 'react';
import {Dropdown} from 'react-native-element-dropdown';
import styled from 'styled-components';
import {View, Text} from 'react-native';

const Container = styled.View`
  padding-vertical: 20px;
  padding-horizontal: 30px;
`;
const DropdownComponent = ({placeholder, categoryList, setDDvalue, colors}) => {
  const [value, setValue] = useState(null);
  const [isFocus, setIsFocus] = useState(false);

  const renderItem = item => {
    return (
      <View style={{marginVertical: 10}}>
        <Text style={{color: colors.textColor, fontSize: 18}}>
          {item.label}
        </Text>
      </View>
    );
  };

  return (
    <Container>
      <Dropdown
        style={{
          height: 50,
          borderBottomWidth: 2,
          paddingHorizontal: 8,
          backgroundColor: 'transparent',
          borderBottomColor: colors.textColor,
        }}
        placeholderStyle={{fontSize: 16, color: colors.textColor}}
        selectedTextStyle={{fontSize: 18, color: colors.textColor}}
        iconStyle={{width: 20, height: 20}}
        iconColor={colors.textColor}
        showsVerticalScrollIndicator={true}
        containerStyle={{
          borderRadius: 8,
          backgroundColor: colors.background,
          padding: 20,
        }}
        activeColor={colors.background}
        data={categoryList}
        maxHeight={300}
        renderItem={renderItem}
        labelField="label"
        valueField="value"
        placeholder={!isFocus ? placeholder : '...'}
        value={value}
        onFocus={() => setIsFocus(true)}
        onBlur={() => setIsFocus(false)}
        onChange={item => {
          setDDvalue(item.value);
          setValue(item.value);
          setIsFocus(false);
        }}
      />
    </Container>
  );
};

export default DropdownComponent;
