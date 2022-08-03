import React from 'react';
import {Button} from '@rneui/base';

const AddBtn = ({setVisibility}) => {
  return (
    <Button
      onPress={() => setVisibility(true)}
      icon={{name: 'plus', type: 'entypo', size: 30, color: '#ffffff'}}
      iconContainerStyle={{
        margin: 0,
        padding: 0,
        width: 60,
      }}
      buttonStyle={{
        backgroundColor: '#FF84D6',
        borderRadius: 50,
        justifyContent: 'center',
        alignItems: 'center',
        borderColor: '#705C69',
      }}></Button>
  );
};

export default AddBtn;
