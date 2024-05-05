// AstronomyDay.test.js
import React from 'react';
import { render, waitFor } from '@testing-library/react';
import AstronomyDay from './AstronomyDay';

describe('AstronomyDay component', () => {
  // Mock fetch API responses
  beforeAll(() => {
    global.fetch = jest.fn();
    global.fetch.mockResolvedValue({
      json: () => Promise.resolve({ 
        url: 'mock-url',
        title: 'mock-title',
        date: 'mock-date',
        explanation: 'mock-explanation'
      }),
    });
  });

  // Reset fetch mock after each test
  afterEach(() => {
    global.fetch.mockClear();
  });

  it('should render loading spinner initially', () => {
    const { getByLabelText } = render(<AstronomyDay />);
    expect(getByLabelText('Center-aligned spinner example')).toBeInTheDocument();
  });

  it('should fetch data and render correctly', async () => {
    const { getByText } = render(<AstronomyDay />);
    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalledTimes(1);
      expect(getByText('mock-title')).toBeInTheDocument();
      expect(getByText('mock-date')).toBeInTheDocument();
      expect(getByText('mock-explanation')).toBeInTheDocument();
    });
  });

  // Add more test cases to cover other scenarios, such as error handling
});
