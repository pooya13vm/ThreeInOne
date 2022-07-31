import React from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import SettingIcon from '../setting/SettingIcon';
import styled from 'styled-components';

const Container = styled.View`
  background-color: ${props => props.background};
`;
const Header = styled.View`
  border-top-color: ${props => props.color};
  height: 50px;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  border-top-width: 5px;
`;
const TitleContainer = styled.View`
  background-color: ${props => props.color};
  height: 100%;
  padding-horizontal: 20px;
  justify-content: center;
  border-bottom-end-radius: 8px;
  border-bottom-start-radius: 8px;
  position: relative;
`;
const Title = styled.Text`
  font-size: 20px;
  font-weight: bold;
  color: #ffffff;
`;
const Body = styled.View`
  padding-horizontal: 15px;
  flex-shrink: 1;
  height: 100%;
`;
const AddButton = styled.View`
  position: absolute;
  right: 20px;
  bottom: 30px;
  width: 50px;
  z-index: 100;
  opacity: 0.9;
  border-width: 2px;
  border-radius: 50px;
  border-color: ${props => props.color.textColor};
  background-color: ${props => props.color.main};
`;
const SettingBtnContainer = styled.View`
  position: absolute;
  right: 14px;
  top: 10px;
`;
const HomesLayout = ({children, title, footer, rightProps, color}) => {
  return (
    <SafeAreaView style={{flex: 1}}>
      <Container color={color.background}>
        <Header color={color.main}>
          <TitleContainer color={color.main}>
            <Title>{title}</Title>
          </TitleContainer>
          <SettingBtnContainer>
            <SettingIcon props={rightProps} />
          </SettingBtnContainer>
        </Header>
        <Body>
          {children}
          <AddButton color={color}>{footer}</AddButton>
        </Body>
      </Container>
    </SafeAreaView>
  );
};
export default HomesLayout;
