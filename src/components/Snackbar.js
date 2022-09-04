import React from 'react';
import {View} from 'react-native';
import {Snackbar} from 'react-native-paper';
import styled from 'styled-components';

const SnackbarContainer = styled.View`
  top: ${props => props.top}px;
`;

const MySnackbar = ({
  snackbarVisible,
  setSnackbarVisible,
  text,
  colors,
  position,
}) => {
  return (
    <View top={position}>
      <Snackbar
        wrapperStyle={{bottom: 60}}
        visible={snackbarVisible}
        style={{
          backgroundColor: colors.main,
        }}
        onDismiss={() => null}
        action={{
          onPress: () => setSnackbarVisible(false),
        }}>
        {text}
      </Snackbar>
    </View>
  );
};

export default MySnackbar;
