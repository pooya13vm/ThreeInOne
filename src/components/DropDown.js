import React, {useEffect, useState} from 'react';
import {StyleSheet} from 'react-native';
import {Dropdown} from 'react-native-element-dropdown';
import styled from 'styled-components';

const Container = styled.View`
  padding-vertical: 20px;
  padding-horizontal: 30px;
`;

const DropdownComponent = ({placeholder, categoryList, setDDvalue}) => {
  const [value, setValue] = useState(null);
  const [isFocus, setIsFocus] = useState(false);

  return (
    <Container>
      <Dropdown
        style={styles.dropdown}
        placeholderStyle={styles.placeholderStyle}
        selectedTextStyle={styles.selectedTextStyle}
        iconStyle={styles.iconStyle}
        showsVerticalScrollIndicator={true}
        containerStyle={{borderRadius: 8}}
        data={categoryList}
        maxHeight={300}
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

const styles = StyleSheet.create({
  dropdown: {
    height: 50,
    borderBottomWidth: 1,
    paddingHorizontal: 8,
    backgroundColor: 'transparent',
    borderBottomColor: 'gray',
  },
  placeholderStyle: {
    fontSize: 16,
    color: 'gray',
  },
  selectedTextStyle: {
    fontSize: 16,
    color: 'gray',
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
});
