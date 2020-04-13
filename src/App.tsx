import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import Container from '@material-ui/core/Container';

import Header from './components/Header/Header';
import CovidGLobal from './Pages/CovidGlobal/CovidGlobal';
import CovidRussianAreas from './Pages/CovidRussianAreas/CovidRussianAreas';

function App() {
  return (
    <Container>
      <BrowserRouter>
        <Header />
        <Route path="/" exact component={CovidGLobal} />
        <Route path="/russia" component={CovidRussianAreas} />
      </BrowserRouter>
    </Container>
  );
}

export default App;
