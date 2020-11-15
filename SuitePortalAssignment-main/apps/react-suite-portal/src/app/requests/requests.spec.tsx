import React from 'react';
import { render } from '@testing-library/react';

import { createMemoryHistory, createLocation } from 'history';
import { match } from 'react-router';

import Requests from './requests';


const history = createMemoryHistory();
const path = "admin/requests";

const m: match = {
    isExact: false,
    path,
    params: { state: {
      detail: { loggedIn: true, username: 'j' }
    } }
};

const location = createLocation(m.url, { detail: { loggedIn: true, username: 'j' }});


describe('Requests', () => {
  it('should render successfully', () => {
    const { baseElement } = render(
      <Requests history={ history } location={ location } match={ m }/>
    );
    expect(baseElement).toBeTruthy();
  });
});
