import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';

import Header from '../Header';

import Routes from '../../routes';
import GlobalStyles from '../../styles/global';
import defaultTheme from '../../styles/themes/default';

import { Container } from './styles';
import ToastContainer from '../Toast/ToastContainer';

const App = () => (
  <BrowserRouter>
    <ThemeProvider theme={defaultTheme}>
      <GlobalStyles />
      <ToastContainer />

      <Container>
        <Header />
        <Routes />
      </Container>
    </ThemeProvider>
  </BrowserRouter>
);

export default App;
