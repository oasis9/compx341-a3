// Oasis Sharp | 1502106
import React from 'react';
import ReactDOM from 'react-dom';
import PastPurchases from "../modules/pastPurchases/PastPurchases.tsx";
import { render, cleanup } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import renderer from 'react-test-renderer';
import "../auth";

afterEach(cleanup);

it('renders without crashing', () => {
  window.alert = jest.fn();
  render(<PastPurchases />);
  window.alert.mockClear();
});

it('renders the correct title', () => {
  window.alert = jest.fn();
  const { getByTestId } = render(<PastPurchases />);
  expect(getByTestId('title').innerHTML).toEqual('Past purchases');
  window.alert.mockClear();
});
