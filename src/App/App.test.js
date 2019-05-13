import React from 'react';
import App from './App';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import { MemoryRouter } from 'react-router';
import { mount } from 'enzyme';

const store = createStore(() => (
    { isFetchingResource : false,
        savedResource: [],
      resource: []}), ['Use Redux']);

test('renders without crashing', () => {
    const wrapper = mount(
      <Provider store={store}>
        <MemoryRouter initialEntries={['/']}>
            <App />
        </MemoryRouter>
      </Provider>
    )
});
