import React from 'react'
import {shallow} from 'enzyme/build'
import AdminPage from "./AdminPage";

it('render Admin Page ', () => {
  const adminPage =  shallow(<AdminPage />);
  expect(adminPage).toMatchSnapshot();
});