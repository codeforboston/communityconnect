import React from 'react'
import {shallow} from 'enzyme/build'
import AdminPage from "./AdminPage";

it('renders without crashing', () => {
  const adminPage =  shallow(<AdminPage />);
  expect(adminPage).toMatchSnapshot();
});