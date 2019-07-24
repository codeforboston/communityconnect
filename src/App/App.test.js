import React from 'react';
import AppContainer from './AppContainer';
import {
  render,
  fireEvent,
  cleanup,
  waitForElement,
} from 'react-testing-library';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { createStore } from 'redux';
import { MemoryRouter } from 'react-router';
import Enzyme, { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

Enzyme.configure({ adapter: new Adapter() });

const store = createStore(
  () => ({ isFetchingResource: false, savedResource: [], resource: [] }),
  ['Use Redux'],
);

test('renders without crashing', () => {
  const wrapper = mount(
    <Provider store={store}>
      <MemoryRouter initialEntries={['/']}>
        <AppContainer />
      </MemoryRouter>
    </Provider>,
  );
});
