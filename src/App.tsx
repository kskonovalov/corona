import React from 'react';
import styled from 'styled-components';
import { BrowserRouter, Route } from 'react-router-dom';

import Header from './components/Header/Header';
import CovidGLobal from './Pages/CovidGlobal/CovidGlobal';
import CovidRussianAreas from './Pages/CovidRussianAreas/CovidRussianAreas';

const StyledIndex = styled.section`
  width: 1000px;
  max-width: 100%;
  margin: 0 auto;
`;

function App() {
  return (
    <StyledIndex>
      <BrowserRouter>
        <Header />
        <Route path="/" exact component={CovidGLobal} />
        <Route path="/russia" component={CovidRussianAreas} />
      </BrowserRouter>
    </StyledIndex>
  );
}

export default App;
