import React from 'react';
import {View} from 'react-native';
import {Snackbar} from 'react-native-paper';

const MySnackbar = ({snackbarVisible, setSnackbarVisible, text, colors}) => {
  return (
    <View>
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
