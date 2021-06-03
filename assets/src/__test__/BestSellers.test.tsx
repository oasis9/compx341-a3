// Oasis Sharp | 1502106
import React from 'react';
import ReactDOM from 'react-dom';
import BestSellers from "../modules/bestSellers/BestSellers";
import { render, cleanup } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import renderer from 'react-test-renderer';

afterEach(cleanup);

it('renders without crashing', () => {
  window.alert = jest.fn();
  const { getByTestId } = render(<BestSellers />);
  expect(getByTestId('title').innerHTML).toEqual('Top 20 best sellers');
  window.alert.mockClear();
});
