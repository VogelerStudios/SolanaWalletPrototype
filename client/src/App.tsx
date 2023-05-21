import React from 'react';
import Home from './screens/Home';
import styled from '@emotion/styled';

const Container = styled.div`
    background-color: #36454F;
    height: 100vh;
    width: 100%;
    overflow: hidden;
    margin: 0;
    display: flex;
    justify-content: center;
    align-items: center;
`;

const App: React.FC = () => {
  return (
    <Container>
      <Home />
    </Container>
  );
}

export default App;
