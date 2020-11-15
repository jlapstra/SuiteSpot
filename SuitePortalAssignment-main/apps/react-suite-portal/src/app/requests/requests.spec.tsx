import React from 'react';
import { render } from '@testing-library/react';

import Requests from './requests';

describe('Requests', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<Requests />);
    expect(baseElement).toBeTruthy();
  });
});
