import React from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {Button} from '@rneui/base';
import styled from 'styled-components';
import {KeyboardAvoidingView} from 'react-native';

const Container = styled.View`
  background-color: ${props => props.color};
  position: relative;
  height: 100%;
`;
const Header = styled.View`
  border-top-color: ${props => props.color};
  height: 50px;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  border-top-width: 10px;
  padding: 0;
`;
const TitleContainer = styled.View`
  background-color: ${props => props.color};
  height: 100%;
  padding-horizontal: 20px;
  margin: 0;
  width: 60%;
  justify-content: center;
  border-bottom-end-radius: 8px;
  border-bottom-start-radius: 8px;
  position: relative;
`;
const Title = styled.Text`
  font-size: 20px;
  font-weight: bold;
  color: #ffffff;
  align-self: center;
`;
const Body = styled.View`
  padding-horizontal: 15px;
  flex-shrink: 1;
  height: ${props => props.height};
`;
const ButtonsContainer = styled.View`
  height: 50px;
  margin-top: 30px;
  ${'' /* margin-bottom: 20px; */}
  flex-direction: row;
  justify-content: center;
  align-items: center;
  align-self: center;
  align-content: center;
`;

const ButtonText = styled.Text`
  font-size: 16px;
  font-weight: bold;
  color: ${props => props.color};
`;
const RightBtnContainer = styled.View`
  position: absolute;
  right: 20px;
  top: 10px;
`;
const LeftBtnContainer = styled.View`
  position: absolute;
  left: 20px;
  top: 10px;
`;

const ScreensLayout = ({
  children,
  left,
  right,
  title,
  props,
  onPressFun,
  colors,
  shopping = false,
}) => {
  return (
    <SafeAreaView style={{backgroundColor: colors.background}}>
      <KeyboardAvoidingView>
        <Container color={colors.backgroundColor}>
          <Header color={colors.main}>
            <LeftBtnContainer>{left}</LeftBtnContainer>
            <TitleContainer color={colors.main}>
              <Title>{title}</Title>
            </TitleContainer>
            <RightBtnContainer>{right}</RightBtnContainer>
          </Header>
          <Body height={shopping ? '100%' : '80%'}>{children}</Body>
          {!shopping && (
            <ButtonsContainer>
              <Button
                onPress={() => props.navigation.goBack()}
                buttonStyle={{
                  height: '100%',
                  width: '77%',
                  alignSelf: 'center',
                  backgroundColor: 'transparent',
                  borderWidth: 1,
                  borderRadius: 5,
                  borderColor: colors.main,
                }}>
                <ButtonText color={colors.textColor}>Cancel</ButtonText>
              </Button>
              <Button
                onPress={() => onPressFun(props)}
                buttonStyle={{
                  height: '100%',
                  alignSelf: 'center',
                  width: '80%',
                  backgroundColor: 'transparent',
                  borderWidth: 1,
                  borderRadius: 5,
                  borderColor: colors.main,
                }}>
                <ButtonText color={colors.textColor}>Save</ButtonText>
              </Button>
            </ButtonsContainer>
          )}
        </Container>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};
export default ScreensLayout;
