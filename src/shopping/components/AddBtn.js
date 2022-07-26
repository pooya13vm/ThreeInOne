import React from 'react';
import {Button} from '@rneui/base';

const AddBtn = ({setVisibility}) => {
  return (
    <Button
      onPress={() => setVisibility(true)}
      icon={{name: 'plus', type: 'entypo', size: 30}}
      iconContainerStyle={{
        margin: 0,
        padding: 0,
        width: 60,
      }}
      buttonStyle={{
        backgroundColor: 'red',
        borderRadius: 50,
        justifyContent: 'center',
        alignItems: 'center',
      }}></Button>
  );
};

export default AddBtn;
