import { Routes as RoutesContainer, Route } from 'react-router-dom';

import Home from './pages/Home';
import NewContact from './pages/NewContact';
import EditContact from './pages/EditContact';

const Routes = () => (
  <RoutesContainer>
    <Route path="/" element={<Home />} />
    <Route path="/new" element={<NewContact />} />
    <Route path="/edit/:id" element={<EditContact />} />
  </RoutesContainer>
);

export default Routes;
