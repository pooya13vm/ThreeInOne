import React from 'react';
import styled from 'styled-components';

const Container = styled.View`
  ${'' /* flex: 1; */}
  align-items: center;
  margin-top: 50px;
`;
const Text = styled.Text`
  color: gray;
  font-weight: bold;
`;

const NoContent = () => {
  return (
    <Container>
      <Text>There is no item in the list.</Text>
    </Container>
  );
};

export default NoContent;
